using System;

namespace astro_world_api.Persistance.Entities
{
    public class Image
    {
        public int ImageId { get; set; }
        public int? FkUserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string PathStored { get; set; }

        public User User { get; set; }
    }
}