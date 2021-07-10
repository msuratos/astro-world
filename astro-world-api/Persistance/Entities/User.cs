using System.Collections.Generic;

namespace astro_world_api.Persistance.Entities
{
  public class User
  {
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public List<Image> Images { get; } = new List<Image>();
  }
}