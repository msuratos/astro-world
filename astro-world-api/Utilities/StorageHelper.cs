using System;
using System.IO;
using System.Threading.Tasks;
using astro_world_api.Configs;
using Azure.Storage;
using Azure.Storage.Files.Shares;

namespace astro_world_api.Utilities
{
  public static class StorageHelper
  {
    public static async Task<bool> UploadFileToStorage(Stream fileStream, string fileName, AzureStorageConfig _storageConfig)
    {
      // Create a URI to the blob
      var fileShareUri = new Uri(_storageConfig.FileShareUri);

      // Create StorageSharedKeyCredentials object by reading
      // the values from the configuration (appsettings.json)
      var storageCredentials = new StorageSharedKeyCredential(_storageConfig.AccountName, _storageConfig.AccountKey);

      // Create file share client
      var share = new ShareClient(fileShareUri, storageCredentials);

      if (await share.ExistsAsync())
      {
        // Get a reference to the sample directory
        var directory = share.GetDirectoryClient("images");

        // Create the directory if it doesn't already exist
        await directory.CreateIfNotExistsAsync();

        // Ensure that the directory exists
        if (await directory.ExistsAsync())
        {
          // Get file client to upload to
          var fileClient = directory.GetFileClient(fileName);

          // Create a temporary file if it does not exist
          if (!await fileClient.ExistsAsync()) await fileClient.CreateAsync(fileStream.Length);

          // Upload file
          await fileClient.UploadAsync(fileStream);
        }
      }
      else
        throw new Exception("File share does not exist");

      return await Task.FromResult(true);
    }
  }
}