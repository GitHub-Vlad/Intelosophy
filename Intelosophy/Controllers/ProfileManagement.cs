using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Intelosophy.Models.ProfileManagement;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Intelosophy.Controllers.ProfileManagement
{
    
    public class ProfileManagement : Controller
    {

        //Displays the Login View
        
        public IActionResult Login()
        {

            
            return View();
        }


        [HttpPost]
        [Route("/ProfileManagement/Validate_Login/")]
        public async Task<String> Validate_Login(IFormCollection form)
        {
            string result = "";

            LogIn l = MapFormCollectionToLogin(form);
            DbContext1 login_context = new DbContext1();
            var _login = login_context.Login.Where(s => s.Email == l.Email);
            if (!_login.Where(s => s.Email == l.Email).Any() || !_login.Where(s => s.Password == l.Password).Any())
            {
                result = "UserName or Password is Incorrect!";
               
            }
            else
            {
                if (_login.Where(s => s.Email == l.Email).Any())
                {
                    if (_login.Where(s => s.Password == l.Password).Any())
                    {
                        result = "success!";
                        var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                        identity.AddClaim(new Claim(ClaimTypes.Name, l.Email));
                        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
                       
                    }
                }


            }

            return result;
        }


        [HttpGet]
        [Route("/ProfileManagement/Retrieve_Userid/{email}/{password}")]
        public int Retrieve_Userid(string email, string password)
        {
          
            DbContext1 login_context = new DbContext1();
            var user_id = login_context.Login.Where(c => c.Email == email && c.Password == password).Select(x => x.UserId).ToList();
            return user_id[0];
        }


        //This function retrieves a new User profile
        // Loads Profile UI
        [HttpGet]
        [Route("/ProfileManagement/Retrieve_UserProfile/{id}")]
        public Profile Retrieve_UserProfile(int id)
        {
            DbContext1 profile_context = new DbContext1();
            Profile pr = profile_context.Profile.First(g => g.UserId == id);
            return pr;
        }

        //This function maps form to the Login object
        public static LogIn MapFormCollectionToLogin(IFormCollection form)
        {
            var login = new LogIn();
            login.Email = form["Email"];
            login.Password = form["Password"];
            return login;
        }


        //Displays the Login View
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return PartialView("Login", "ProfileManagement");
        }
    


        //Displays the Profile View
        [Authorize]
        public IActionResult Profile()
        {
  
            return View();
        }

    
        //Displays the Add Registration View
        public IActionResult Add_Registration()
        {
            return View();
        }



        //This function maps form to the Registration object
        public static Registration MapFormCollectionToRegistration(IFormCollection form)
        {
            var registration = new Registration();
            MemoryStream ms = new MemoryStream();

            foreach (var file in form.Files)
            {               
                file.CopyTo(ms);
            
            }
            registration.Email = form["Email"];
            registration.Password = form["Password"];
            registration.FirstName = form["FirstName"];
            registration.LastName = form["LastName"];
            registration.Address = form["Address"];
            registration.Country = form["Country"];
            registration.State = form["State"];
            registration.Zip = form["Zip"];
            registration.ProfileBio = form["ProfileBio"];
            registration.ProfilePicture = ms.ToArray();
            return registration;
        }

        //This function maps form to the Registration object
        public static Registration MapFormCollectionToRegistration_Validation(IFormCollection form)
        {
                var registration = new Registration();
                registration.Email = form["Email"];
                registration.Password = form["Password"];
                registration.FirstName = form["FirstName"];
                registration.LastName = form["LastName"];
                registration.Address = form["Address"];
                registration.Country = form["Country"];
                registration.State = form["State"];
                registration.Zip = form["Zip"];
                registration.ProfileBio = form["ProfileBio"];
               // registration.ProfilePicture = ms.ToArray();
            


           return registration;
        }

  




        //This function adds the User ID into the registration table
        //on Registration Form load 
        public void Add_UserID()
        {
            Intelosophy.Models.ProfileManagement.CRUD.Insert_User_ID();
        }





       

        public void AddRegistration(IFormCollection form)
        {

            Registration R = MapFormCollectionToRegistration(form);
            Intelosophy.Models.ProfileManagement.CRUD.AddRegistration(R, form);
        }

        //This function maps form to the Profile object
        public static Profile MapFormCollectionToProfile(IFormCollection form)
        {
            string FullName = form["Name"];
            var profile = new Profile();
            var array = FullName.Split(new[] { " " }, StringSplitOptions.RemoveEmptyEntries);
            profile.FirstName = array[0].Trim();
            profile.LastName = array[1].Trim();
            profile.ProfileBio = form["ProfileBio"];
          //  profile.ProfilePicture = form["ProfilePicture"];
            return profile;
        }


        public string Validate_Registration(IFormCollection form)
        {
            string result = "";
            Registration R = MapFormCollectionToRegistration_Validation(form);
            DbContext1 registration_context = new DbContext1();
            var res = (from e in registration_context.Registration
                          where e.Email == R.Email
                          select e).FirstOrDefault();
            if (res != null)
            {
                result = "Username Exists!";
            }
            
            //var _registration = registration_context.Registration.All(s => s.Email == R.Email) ? result = "Username Exists!" : result = "";    
            return result;
        }





        //[HttpPost]
        //[Route("/ProfileManagement/Edit_Profile/{id}")]
        public void Edit_Profile(IFormCollection form, int id)
        {
            Profile P = MapFormCollectionToProfile(form);
            Intelosophy.Models.ProfileManagement.CRUD.Edit_Profile(P, id);

        }

        [HttpPost]
        [Route("api/ProfileManagement/Remove_Profile/{id}")]
        public void Remove_Profile([FromBody] Profile p, int id)
        {

            Intelosophy.Models.ProfileManagement.CRUD.Remove_Profile(p, id);

        }



    }
}


// LINQ which Retrieves the associated user id with user name and password returns it.
//var user_id = _login.Where(c => c.Email == l.Email && c.Password == l.Password)
//                .Select(x => x.UserId).ToList();