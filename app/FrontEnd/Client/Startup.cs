using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Newtonsoft.Json.Serialization;

namespace Client
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }
    public static IConfiguration Configuration { get; private set; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<MvcOptions>(options =>
      {
        options.Filters.Add(new CorsAuthorizationFilterFactory("CORS"));
      });

      services.AddAuthentication(sharedOptions =>
      {
        sharedOptions.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        sharedOptions.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
      })
      .AddOpenIdConnect(options =>
      {
        options.Authority = Configuration["ADAUTH:Authority"];
        options.ClientId = Configuration["ADAUTH:ClientID"];
        options.ResponseType = OpenIdConnectResponseType.IdToken;
        options.CallbackPath = Configuration["ADAUTH:Callback"];
        //options.CallbackPath = "/.auth/login/aad/callback";
      })
      .AddCookie();

      //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      services.AddMvc()
      .AddJsonOptions(o =>
      {
        if (o.SerializerSettings.ContractResolver != null)
        {
          var castedResolver = o.SerializerSettings.ContractResolver
                        as DefaultContractResolver;
          castedResolver.NamingStrategy = null;
        }
      });

      services.AddCors(options =>
      {
        options.AddPolicy("CORS",
        corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

      });

      services.AddSession();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseAuthentication();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        //app.UseExceptionHandler("/Home/Error");
        //app.UseHsts();
      }

      //app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSession();
      app.UseCors("CORS");

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }
}
