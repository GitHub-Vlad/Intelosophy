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
    public class SectionView
    {
       
        public int courseid { get; set; }
        [Key]
        public int sectionid { get; set; }           
        public string sectionName { get; set; }
        public string sectionDescription { get; set; }
    


        //Parameterless constructor for execution of stored procedure
        public SectionView()
        {


        }

        //constructor which holds the lesson view
        public SectionView(int courseid, int sectionid, string sectionName, string sectionDescription)
        {
            
            this.courseid = courseid;
            this.sectionid = sectionid;
            this.sectionName = sectionName;
            this.sectionDescription = sectionDescription;
          
        }


    

        public static IEnumerable<SectionView> Load_SectionView(string id)
        {
            DbContext SectionView_context = new DbContext();
            string[] x = id.Split('-');
            var s = SectionView_context.Sv.FromSql("EXEC sp_Course_Load_SectionUI @courseid={0}", int.Parse(x[0])).ToList();        
            return s;
        }


    }
}
