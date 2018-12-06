using API.Tables;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace API
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
      services.AddCors(options =>
      {
        options.AddPolicy("CORS",
        corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
      });

      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.RequireHttpsMetadata = false;
        x.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = false,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.Configuration["JWT:IssuerSigningKey"])),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });


      var connectionString = Configuration["ConnectionStrings:DefaultConnection"];
      //var connectionString = "Server=biztechdbserversandbox.database.secure.windows.net,15021;Database=ABADIversity;User ID=biztech;Password=L0c@ldatabase;";

      services.AddDbContext<ADContext>(cfg =>
      {
        cfg.UseSqlServer(connectionString);
      });

      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors("CORS");

      app.UseAuthentication();

      try
      {
        using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
        .CreateScope())
        {
          serviceScope.ServiceProvider.GetService<ADContext>().Database.Migrate();
        }
      }
      catch (Exception ex)
      {

        System.Diagnostics.Debug.WriteLine(ex, "Failed to migrate or seed database");
      }
      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }
}
