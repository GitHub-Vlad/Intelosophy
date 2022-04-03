using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;




namespace Intelosophy.Models.ProfileManagement
{
    public partial class CRUD
    { 
    
        [Key]
        public int UserId { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string ProfileBio { get; set; }
        public string Zip { get; set; }
        public byte[] ProfilePic { get; set; }




        //This function adds a new user id to the Registration table.
        public static void Insert_User_ID()
        {
            //Adds new user id to Registration table
            DbContext1 registration_context = new DbContext1();
            Registration register = new Registration();
            registration_context.Add(register);
            registration_context.SaveChanges();

        }


        public static void AddRegistration(Registration r, IFormCollection form)
        {

            ///Retrieves user id from Registration table 
            DbContext1 registration_context1 = new DbContext1();
            int user_id = registration_context1.Registration.Max(x => x.UserId);



        

            //Update Registration form on the user id
            DbContext1 registration_context = new DbContext1();
            Registration re = registration_context.Registration.First(g => g.UserId == user_id);
            re.UserId = user_id;
            re.Password = r.Password;
            re.FirstName = r.FirstName;
            re.LastName = r.LastName;
            re.Email = r.Email;
            re.Address = r.Address;
            re.Country = r.Country;
            re.State = r.State;
            re.Zip = r.Zip;
            re.ProfileBio = r.ProfileBio;
            re.ProfilePicture = r.ProfilePicture;
            registration_context.SaveChanges();

                   
            // Inserts info into a profile table to create a user profile from the registration form
            DbContext1 profile_context = new DbContext1();
            Profile pr  = new Profile();
            profile_context.Add(pr);

            pr.UserId = user_id;
            pr.FirstName = r.FirstName;
            pr.LastName = r.LastName;
            pr.Email = r.Email;
            pr.ProfileBio = r.ProfileBio;
            pr.ProfilePicture = r.ProfilePicture;
            profile_context.SaveChanges();


            // Inserts the userid and into the login table 
            DbContext1 login_context = new DbContext1();
            LogIn lg = new LogIn();
            login_context.Add(lg);

            lg.UserId = user_id;;
            lg.Email = r.Email;
            lg.Password = r.Password;
            login_context.SaveChanges();



         }


        public static void Edit_Profile(Profile p, int id)
        {

            DbContext1 profile_context = new DbContext1();
            var pr = profile_context.Profile.First(g => g.UserId == id);
            pr.UserId = id;
            pr.FirstName = p.FirstName;
            pr.LastName = p.LastName;
            pr.Email = p.Email;
            pr.ProfileBio = p.ProfileBio;
            pr.ProfilePicture = p.ProfilePicture;
            profile_context.SaveChanges(); 
        }

        public static void Remove_Profile(Profile p, int id)
        {

            DbContext1 profile_context = new DbContext1();
            Profile pro = profile_context.Profile.Single(profile => profile.UserId == id);
            profile_context.Remove(pro);
            profile_context.SaveChanges();
        }



    }






























}

    

   

