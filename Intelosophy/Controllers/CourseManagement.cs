   using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Intelosophy.Models.CourseManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using VimeoDotNet;
using VimeoDotNet.Models;
using VimeoDotNet.Net;
using Xunit;

namespace Intelosophy.Controllers.CourseManagement
{
    public class CourseManagementController : Controller
    {


        //Displays the Add Course View
        [Authorize]
        public IActionResult Add_Course()
        {
            return View();
        }

         
        //// Displays the Update Course Views
        [Authorize]
        public IActionResult Update_Course()
        {
            return View();
        }

        [Authorize]
        public IActionResult Manage_Course()
        {
          
            return View();
        }

        //This function adds the Course ID into the course id table
        //on Add_Course Form load 
        public void Add_CourseID()
        {
            Intelosophy.Models.CourseManagement.CRUD.Insert_Course_ID();

        }


        [HttpGet]
        [Route("/CourseManagement/Retrieve_Course")]
        public IEnumerable<Course> Retrieve_Course()
        {
            IEnumerable<Course> course = Intelosophy.Models.CourseManagement.CRUD.Retrieve_Course();
            return course;
        }


        // Functions Pertaining to the Add_Course Form

        //This function maps form to the Lesson object
        public static Lesson MapFormCollectionToLesson(IFormCollection form)
        {

            var lesson = new Lesson();
            lesson.LessonName = form["LessonName"];
            lesson.LessonDescription = form["LessonDescription"];
            lesson.VideoName = form["VideoName"];
            lesson.VideoDescription = form["VideoDescription"];
            lesson.TextName = form["TextName"];
            lesson.TextName = form["TextDescription"];
            return lesson;
        }

  
        public dynamic Add_Lesson(IFormCollection form)
        {

            var s = form["TextDescription"];
         

            if (s[0].Contains(".mp4"))
                CRUD.Insert_Lesson_AddForm( "video", form);
            if (s[0].Contains(".pdf"))
                CRUD.Insert_Lesson_AddForm( ".pdf", form);

            return new { Success = true };
        }

        //This function maps form to the Section object
        public static Section MapFormCollectionToSection(IFormCollection form)
        {
            var section = new Section();
            section.SectionName = form["SectionName"];
            section.SectionDescription = form["SectionDescription"];
            return section;
        }

        public void Add_Section(IFormCollection form)
        {
            Section S = MapFormCollectionToSection(form);
            CRUD.Insert_Section(S, form);
        }



        public void AddCourse(IFormCollection form)
        {
            Course C = MapFormCollectionToCourse(form);
            CRUD.Insert_Course(C, form);

        }





                                     // This function updates a Lesson in the Update_CourseForm

        // Loads Lesson UI
        [HttpGet]
        [Route("/CourseManagement/Load_LessonUI/{id}")]
        public IEnumerable<LessonView> Load_LessonUI(string id)
        {
            IEnumerable<LessonView> LessonView = Intelosophy.Models.CourseManagement.LessonView.Load_LessonView(id);
            return LessonView.ToList();
        }


        // Loads Section UI
        [HttpGet]
        [Route("/CourseManagement/Load_SectionUI/{id}")]
        public IEnumerable<SectionView> Load_SectionUI(string id)
        {
            
            IEnumerable<SectionView> SectionView = Intelosophy.Models.CourseManagement.SectionView.Load_SectionView(id);
            return SectionView.ToList();
        }

        // Loads Course UI
        [HttpGet]
        [Route("/CourseManagement/Load_CourseUI/{id}")]
        public IEnumerable<CourseView> Load_CourseUI(int id)
        {
            IEnumerable<CourseView> CourseView = Intelosophy.Models.CourseManagement.CourseView.Load_CourseView(id);
            return CourseView.ToList();
        }

        //This function retrieves a new User Course
        // Loads Course
        [HttpGet]
        [Route("/CourseManagement/Retrieve_Course/{id}")]
        public Course Retrieve_Course(int id)
        {
            DbContext course_context = new DbContext();
            Course cr = course_context.Course.First(g => g.CourseId == id);
            return cr;
        }


         

        //This function maps form to the Course object
        public static Course MapFormCollectionToCourse(IFormCollection form)
        {
            var course = new Course();
            course.CourseName = form["CourseName"];
            course.CourseDescription = form["CourseDescription"];
            return course;
        }


        // This function adds a Lesson in Update Course Form
        public dynamic Add_Lesson_Update_Course(IFormCollection form)
        {

            Lesson L = MapFormCollectionToLesson(form);
            if (L.TextName.Contains(".mp4"))
                CRUD.Insert_Lesson_UpdateForm(L, "video", form);
            if (L.TextName.Contains(".pdf"))
                CRUD.Insert_Lesson_UpdateForm(L, ".pdf", form);

            return new { Success = true };
        }
    

         
        public dynamic Add_NewSection(IFormCollection form)
        {
            Section s = MapFormCollectionToSection(form);       
            CRUD.Insert_Section(s, form);
            return new { Success = true };
        }

    

      
        ////This function edits a lesson
        [HttpPost]
        [Route("/CourseManagement/Edit_Lesson/{id}")]
        public void Edit_Lesson([FromBody] LessonView l,int id)
        {

            Intelosophy.Models.CourseManagement.CRUD.Edit_Lesson(l,id);

        }
        ////This function removes a lesson
        [HttpPost]
        [Route("/CourseManagement/Remove_Lesson/{id}")]
        public void Remove_Lesson([FromBody] LessonView l, int id)
        {

            Intelosophy.Models.CourseManagement.CRUD.Remove_Lesson(l,id);

        }

        ////This function edits a section
        [HttpPost]
        [Route("/CourseManagement/Edit_Section/{id}")]
        public void Edit_Section([FromBody] SectionView s, int id)
        {

            Intelosophy.Models.CourseManagement.CRUD.Edit_Section(s, id);

        }


        ////This function removes a section
        [HttpPost]
        [Route("/CourseManagement/Remove_Section/{id}")]
        public void Remove_Section([FromBody] SectionView s, int id)
        {
            
            Intelosophy.Models.CourseManagement.CRUD.Remove_Section(s, id);

        }



        ////This function edits a course
        [HttpPost]
        [Route("/CourseManagement/Edit_Course/{id}")]
        public void Edit_Course([FromBody] CourseView c, int id)
        {

            Intelosophy.Models.CourseManagement.CRUD.Edit_Course(c,id);

        }

        ////This function removes a course
        [HttpPost]
        [Route("/CourseManagement/Remove_Course/{id}")]
        public void Remove_Course([FromBody] Course c, int id)
        {

            Intelosophy.Models.CourseManagement.CRUD.Remove_Course(id);

        }




    }
}




///Test/////
///This signature is used when passing a List of objects from the client to the controller
//public void Add_Lesson([FromBody]List<Lesson> Lessons)
//{
//}