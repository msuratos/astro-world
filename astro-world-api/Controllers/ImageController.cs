using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using astro_world_api.Filters;
using astro_world_api.Utilities;
using astro_world_api.Persistance;
using astro_world_api.Persistance.Entities;

namespace astro_world_api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ImageController : ControllerBase
  {
    private readonly AstroWorldDbContext _context;
    private readonly long _fileSizeLimit;
    private readonly ILogger<ImageController> _logger;
    private readonly string[] _permittedExtensions = { ".jpg", ".jpeg", ".png" };
    private readonly string _targetFilePath;

    // Get the default form options so that we can use them to set the default 
    // limits for request body data.
    private static readonly FormOptions _defaultFormOptions = new FormOptions();

    public ImageController(ILogger<ImageController> logger, AstroWorldDbContext context, IConfiguration config)
    {
      _context = context;
      _logger = logger;
      _fileSizeLimit = config.GetValue<long>("FileSizeLimit");

      // To save physical files to a path provided by configuration:
      // _targetFilePath = config.GetValue<string>("StoredFilesPath");

      // To save physical files to the temporary files folder, use:
      _targetFilePath = Path.GetTempPath();
    }

    [HttpGet]
    [Route("admin/{userid:int}")]
    public async Task<IList<Image>> GetAllImages(int userid)
    {
      _logger.LogDebug($"Admin is getting all the images for user {userid}");
      return await _context.Images.Where(w => w.FkUserId == userid).ToListAsync();
    }

    // Refer to https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-5.0#upload-large-files-with-streaming
    [HttpPost]
    [Route("user/{userid:int}")]
    public async Task<IActionResult> UploadPhysical(int userid)
    {
      if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
      {
        ModelState.AddModelError("File",
            $"The request couldn't be processed (Error 1).");
        // Log error

        return BadRequest(ModelState);
      }

      var boundary = MultipartRequestHelper.GetBoundary(MediaTypeHeaderValue.Parse(Request.ContentType),
                                                          _defaultFormOptions.MultipartBoundaryLengthLimit);
      var reader = new MultipartReader(boundary, HttpContext.Request.Body);
      var section = await reader.ReadNextSectionAsync();

      while (section != null)
      {
        var hasContentDispositionHeader =
            ContentDispositionHeaderValue.TryParse(
                section.ContentDisposition, out var contentDisposition);

        if (hasContentDispositionHeader)
        {
          // This check assumes that there's a file
          // present without form data. If form data
          // is present, this method immediately fails
          // and returns the model error.
          if (!MultipartRequestHelper
              .HasFileContentDisposition(contentDisposition))
          {
            ModelState.AddModelError("File",
                $"The request couldn't be processed (Error 2).");
            // Log error

            return BadRequest(ModelState);
          }
          else
          {
            // Don't trust the file name sent by the client. To display
            // the file name, HTML-encode the value.
            var trustedFileNameForDisplay = WebUtility.HtmlEncode(
                    contentDisposition.FileName.Value);
            var trustedFileNameForFileStorage = Path.GetRandomFileName();

            // **WARNING!**
            // In the following example, the file is saved without
            // scanning the file's contents. In most production
            // scenarios, an anti-virus/anti-malware scanner API
            // is used on the file before making the file available
            // for download or for use by other systems. 
            // For more information, see the topic that accompanies 
            // this sample.

            var streamedFileContent = await FileHelpers.ProcessStreamedFile(
                section, contentDisposition, ModelState,
                _permittedExtensions, _fileSizeLimit);

            if (!ModelState.IsValid)
            {
              return BadRequest(ModelState);
            }

            using (var targetStream = System.IO.File.Create(
                Path.Combine(_targetFilePath, trustedFileNameForFileStorage)))
            {
              await targetStream.WriteAsync(streamedFileContent);

              _logger.LogInformation(
                  "Uploaded file '{TrustedFileNameForDisplay}' saved to " +
                  "'{TargetFilePath}' as {TrustedFileNameForFileStorage}",
                  trustedFileNameForDisplay, _targetFilePath,
                  trustedFileNameForFileStorage);
            }
          }
        }

        // Drain any remaining section body that hasn't been consumed and
        // read the headers for the next section.
        section = await reader.ReadNextSectionAsync();
      }

      return Created(nameof(ImageController), null);
    }

    private static Encoding GetEncoding(MultipartSection section)
    {
      var hasMediaTypeHeader =
          MediaTypeHeaderValue.TryParse(section.ContentType, out var mediaType);

      // UTF-7 is insecure and shouldn't be honored. UTF-8 succeeds in 
      // most cases.
      if (!hasMediaTypeHeader || Encoding.UTF8.Equals(mediaType.Encoding))
      {
        return Encoding.UTF8;
      }

      return mediaType.Encoding;
    }
  }
}
