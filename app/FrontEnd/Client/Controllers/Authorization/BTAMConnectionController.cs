using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Client.Controllers.Authorization
{
  [Route("api/[controller]")]
  [ApiController]
    public class BTAMConnectionController : ControllerBase
    {
        private TokenFactory _tokenFactory;

        #region API
        [Route("AppSignIn")]
        [HttpGet]
        public async Task<UserAppRoleDTO> AppSignIn()
        {
            APIAccess apiAccess = new APIAccess("AppSignIn2", Get().BTAMURL);

            AM_AppSignIn si = new AM_AppSignIn
            {
                AppURL = Startup.Configuration["Internal:HostName"],
                UserName = GetSignInUsername().UserName
            };

            var body = JsonConvert.SerializeObject(si);
            var result = await apiAccess.PostRequest(body);
            var currentUser = result == null ? new UserAppRoleDTO() : JsonConvert.DeserializeObject<UserAppRoleDTO>(result);

            if (currentUser != new UserAppRoleDTO())
            {
                apiAccess = new APIAccess("Authenticate/" + Startup.Configuration["Internal:AppSecurityKey"], Get().BTAMURL);
                body = JsonConvert.SerializeObject(currentUser);
                result = await apiAccess.PostRequest(body);

                var authenticationToken = result != null ? JsonConvert.DeserializeObject<AppToken>(result) : new AppToken();
                currentUser.AuthenticationToken = authenticationToken.Token;
                currentUser.AuthorizationToken = GetAuthorizationToken(authenticationToken).Token;
            }
            else
            {

            }


            return currentUser;
        }

        [Route("AppSignIn/{username}")]
        [HttpGet]
        public async Task<UserAppRoleDTO> AppSignIn([FromRoute]string username)
        {
            APIAccess apiAccess = new APIAccess("AppSignIn2", Get().BTAMURL);

            AM_AppSignIn si = new AM_AppSignIn
            {
                AppURL = Startup.Configuration["Internal:HostName"],
                UserName = username
            };

            var body = JsonConvert.SerializeObject(si);
            var result = await apiAccess.PostRequest(body);
            var currentUser = result == null ? new UserAppRoleDTO() : JsonConvert.DeserializeObject<UserAppRoleDTO>(result);

            if (currentUser != new UserAppRoleDTO())
            {
                apiAccess = new APIAccess("Authenticate/" + Startup.Configuration["Internal:AppSecurityKey"], Get().BTAMURL);
                body = JsonConvert.SerializeObject(currentUser);
                result = await apiAccess.PostRequest(body);

                var authenticationToken = result != null ? JsonConvert.DeserializeObject<AppToken>(result) : new AppToken();
                currentUser.AuthenticationToken = authenticationToken.Token;
                currentUser.AuthorizationToken = GetAuthorizationToken(authenticationToken).Token;
            }
            else
            {

            }


            return currentUser;
        }

        #endregion
        #region APIHELPER
        //[HttpGet("GetBTAMURL")]
        public BTAMEntity Get()
        {
            return new BTAMEntity { BTAMURL = Startup.Configuration["BTAMURL"] };
        }

        //[Route("GetUserName")]
        //[HttpGet]
        public CurrentUser GetSignInUsername()
        {
            var username = this.User.Identity.Name;

            return new CurrentUser
            {
                UserName = username
            };
        }

        //[Route("GetAuthorizationUser")]
        //[HttpPost]
        //public async Task<AppToken> GetAuthorizationToken([FromBody] string authenticationtoken)
        public AppToken GetAuthorizationToken([FromBody] AppToken authenticationToken)
        {
            _tokenFactory = new TokenFactory();

            if (authenticationToken.Token != "")
            {
                //1)Extracttoken is used to extract all details required before generating an authorization token
                //2)GenerateAuthorizationToken is used to generate Authorization token
                var authorizationToken = _tokenFactory.GenerateAuthorizationToken(_tokenFactory.ExtractToken(authenticationToken.Token));
                HttpContext.Session.SetString("apiToken", authorizationToken);
                return new AppToken
                {
                    Token = authorizationToken,
                    TokenName = "Authorization"
                };
            }
            return new AppToken
            {
                TokenName = "Authorization"
            };
        }
        #endregion
    }

    #region CLASSHELPER
    public class TokenFactory
    {
        private List<Claim> _claims;

        #region "Public Methods"
        public List<Claim> ExtractToken(String token)
        {
            List<Claim> claims = new List<Claim>();

            _claims = new List<Claim>();

            var jwtToken = new JwtSecurityToken(token);

            var names = jwtToken.Claims.
                Where(x => x.Type == ClaimTypes.Name);

            var roles = jwtToken.Claims.
                Where(x => x.Type == ClaimTypes.Role);

            var urls = jwtToken.Claims.
                Where(x => x.Type == ClaimTypes.Uri);

            var idS = jwtToken.Claims.
                Where(x => x.Type == ClaimTypes.Sid);

            var firstNames = jwtToken.Claims.
                Where(x => x.Type == ClaimTypes.GivenName);

            var surnames = jwtToken.Claims.
                Where(x => x.Type == ClaimTypes.Surname);

            AddToClaim(names);
            AddToClaim(roles);
            AddToClaim(urls);
            AddToClaim(firstNames);
            AddToClaim(surnames);

            claims = _claims;

            return claims;
        }

        public string GenerateAuthorizationToken(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    Startup.Configuration["Internal:IssuerSigningKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Startup.Configuration["Internal:ValidIssuer"],
                audience: Startup.Configuration["Internal:ValidAudience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            var myToken = new JwtSecurityTokenHandler().WriteToken(token);

            return myToken;
        }

        #endregion

        #region "Private Methods"

        private void AddToClaim(IEnumerable<Claim> claims)
        {
            foreach (var claim in claims)
            {
                _claims.Add(claim);
            }
        }

        #endregion
    }

    public class UserAppRoleDTO
    {
        public int UserAppID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int RoleID { get; set; }
        public string Role { get; set; }
        public List<ServiceDTO> Services { get; set; }
        public string AuthenticationToken { get; set; }
        public string AuthorizationToken { get; set; }
    }
    public class ServiceDTO
    {
        public int RoleServiceID { get; set; }
        public string ServiceName { get; set; }
        public string ServiceDesc { get; set; }
        public List<AttributesDTO> Attributes { get; set; }
    }
    public class AttributesDTO
    {
        public string AttribName { get; set; }
        public string AttribDesc { get; set; }
    }
    public class AM_AppSignIn
    {
        public string AppURL { get; set; }

        public string UserName { get; set; }
    }
    public class AppToken
    {
        public String TokenName { get; set; }
        public String Token { get; set; }
        public AppToken()
        {
            Token = "";
            TokenName = "";
        }
    }
    public class BTAMEntity
    {
        public string BTAMURL { get; set; }
    }
    public class CurrentUser
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }

        public CurrentUser()
        {
            UserID = "";
            FirstName = "";
            LastName = "";
            Role = "NoAccess";
        }
    }
    #endregion 
}
