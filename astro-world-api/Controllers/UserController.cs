using System;
using System.Linq;
using System.Threading.Tasks;
using astro_world_api.Dtos;
using astro_world_api.Persistance;
using astro_world_api.Persistance.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace astro_world_api.Controllers
{
  [Authorize]
  [ApiController]
  [Route("[controller]")]
  public class UserController : ControllerBase
  {
    private readonly ILogger<UserController> _logger;
    private readonly AstroWorldDbContext _context;
    private readonly IConfiguration _config;
    private readonly IMapper _mapper;

    public UserController(ILogger<UserController> logger, AstroWorldDbContext context, IConfiguration config, IMapper mapper)
    {
      _config = config;
      _context = context;
      _logger = logger;
      _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(UserDto userDto)
    {
      try
      {
        var user = _mapper.Map<User>(userDto);
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return Created(nameof(UserController), user);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error has occurred creating user");
        throw;
      }
    }

    [HttpGet]
    [Route("admin/all")]
    public async Task<IActionResult> GetAllUsersWithTheirImages() 
    {
      var users = await _context.Users.Include(i => i.Images)
        .Select(s => new 
        {
          s.UserId,
          DisplayName = $"{s.FirstName} {s.LastName}",
          Images = s.Images.Select(s => new 
          {
            s.ImageId,
            s.PathStored
          }).ToList()
        })
        .OrderByDescending(o => o.Images.Count)
        .ToListAsync();

      return Ok(users);
    }
  }
}