using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
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
    public class LessonView
    {

        
        public int courseId { get; set; }
        public int sectionId { get; set; }
        [Key]
        public int lessonId { get; set; }
        public string lessonName { get; set; }
        public string lessonDescription { get; set; }
        public string videoName { get; set; }
        public string videoDescription { get; set; }
        public byte[] textFile { get; set; }
        public string textName { get; set; }
        public string textDescription { get; set; }
        public int videoId { get; set; }
        public int pictureId { get; set; }

        //Parameterless constructor for execution of stored procedure
        public LessonView()
        {


        }

        //constructor which holds the lesson view
        public LessonView(int courseId, int sectionId, int lessonId, string lessonName, string lessonDescription, string videoName, string videoDescription, byte[] textFile, string textName, string textDescription,int videoId,int pictureId)
        {
           
            this.courseId = courseId;
            this.sectionId = sectionId;
            this.lessonId = lessonId;
            this.lessonName = lessonName;
            this.lessonDescription = lessonDescription;
            this.videoName = videoName;
            this.videoDescription = videoDescription;
            this.textFile = textFile;
            this.textName = textName;
            this.textDescription = textDescription;
            this.videoId = videoId;
            this.pictureId = pictureId;


        }
        

        public static IEnumerable<LessonView> Load_LessonView(string id)
        {
            DbContext LessonView_context = new DbContext();
            string[] x = id.Split('-');
            
            var l = LessonView_context.Lv.FromSql("EXEC sp_Course_Load_LessonUI @courseid={0}",int.Parse(x[0])).ToList();
            return l;
        }








    }
}
