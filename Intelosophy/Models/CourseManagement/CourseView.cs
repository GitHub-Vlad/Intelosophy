using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using VimeoDotNet;
using VimeoDotNet.Models;
using VimeoDotNet.Net;
using Xunit;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Intelosophy.Models.CourseManagement
{
    public class CourseView
    {
        public int userid { get; set; }
        public int courseid { get; set; }           
        public string courseName { get; set; }
        public string courseDescription { get; set; }
        public byte[] CourseImage { get; set; }



        //Parameterless constructor for execution of stored procedure
        public CourseView()
        {


        }

        //constructor which holds the lesson view
        public CourseView(int userid, int courseid, string courseName, string courseDescription ,byte[]CourseImage)
        {
            this.userid = userid;
            this.courseid = courseid;
            this.courseName = courseName;
            this.courseDescription = courseDescription;
            this.CourseImage = CourseImage;
          
        }


    

        public static IEnumerable<CourseView> Load_CourseView(int id)
        {
            DbContext CourseView_context = new DbContext();
            var c = CourseView_context.Cv.FromSql("EXEC sp_Course_Load_CourseUI  @userid={0}", id).ToList();
            return c;
        }


    }
}
