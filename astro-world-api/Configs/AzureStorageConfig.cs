using System;

namespace astro_world_api.Configs
{
    public class AzureStorageConfig 
    {
      public string AccountName { get; set; }
      public string AccountKey { get; set; }
      public string FileShareUri { get; set; }
    }
}