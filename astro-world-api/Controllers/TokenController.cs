using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace astro_world_api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TokenController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly ILogger<TokenController> _logger;

    public TokenController(IConfiguration configuration, ILogger<TokenController> logger)
    {
      _configuration = configuration;
      _logger = logger;
    }

    [HttpGet]
    public async Task<string> GetAccessToken(string apiKey)
    {
      _logger.LogDebug($"Getting access token with api key: {apiKey}");

      if (apiKey != _configuration["ApiKey"]) throw new Exception("Invalid api key");

      var accessToken = "";

      var uri = new Uri(_configuration["AzureAd:Instance"]);
      var requestUri = $"{_configuration["AzureAd:Instance"]}{_configuration["AzureAd:TenantId"]}/oauth2/v2.0/token";

      using (var httpClient = new HttpClient { BaseAddress = uri })
      {
        var clientId = _configuration["AzureAd:ClientId"];
        var scope = _configuration["Scope"];
        var clientSecret = _configuration["ClientSecret"];
        var grantType = _configuration["GrantType"];
        var body = new StringContent($"client_id={clientId}&scope={scope}&client_secret={clientSecret}&grant_type={grantType}", Encoding.UTF8, "application/x-www-form-urlencoded");
        var httpRequestMessage = new HttpRequestMessage
        {
          Content = body,
          Method = HttpMethod.Post,
          RequestUri = new Uri(requestUri)
        };

        var resp = await httpClient.SendAsync(httpRequestMessage);
        if (!resp.IsSuccessStatusCode) throw new Exception("Could not get access token from Azure AD");

        accessToken = JsonConvert.DeserializeObject<dynamic>(await resp.Content.ReadAsStringAsync()).access_token;
      }

      return accessToken;
    }
  }
}