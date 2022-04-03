using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using VimeoDotNet.Models;
using Xunit;

namespace Intelosophy.Models.CourseManagement
{
    public partial class CRUD
   {
        [Key]
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public string SectionDescription { get; set; }
        public int LessonId { get; set; }
        public string LessonName { get; set; }
        public string LessonDescription { get; set; }
        public string VideoName { get; set; }
        public string VideoDescription { get; set; }
        public byte[] TextFile { get; set; }
        public string TextName { get; set; }
        public string TextDescription { get; set; }



        //Constructor which takes all of the variables associated with a course from the Add_Course Form
        public CRUD(int CourseId, int SectionId)
        {
            this.CourseId = CourseId;
            this.SectionId = SectionId;

        }
       
   


        //This function adds a new  Course ID on Add_Course Form load 
        public static void Insert_Course_ID()
        {

            //Adds new course id to course table
            DbContext course_context = new DbContext();
            Course course = new Course();
            course_context.Add(course);
            course_context.SaveChanges();
        }

        


        //This function retrieves a new Section ID and Course ID on Add_Course Form load 
        public static CRUD Retrieve_Course_ID()
        {
            CRUD li;
            int course_id = 0;
            int section_id = 0;
            //Retrieves Course ID
            DbContext course_context = new DbContext();
            course_id = course_context.Course.Max(x => x.CourseId);
            li = new CRUD(course_id, section_id);
            return li;
        }

        //This function retrieves a new Section ID and Course ID on Add_Course Form load 
        public static CRUD Retrieve_Section_ID()
        {
            CRUD li;
            int course_id = 0;
            int section_id = 0;
            //Retrieves Course ID
            DbContext section_context = new DbContext();
            course_id = section_context.Section.Max(x => x.SectionId);
            li = new CRUD(course_id, section_id);
            return li;
        }


        //This function retrieves a course from the Add_Course Form.
        public static IEnumerable<Course>  Retrieve_Course()
        {
            DbContext course_context = new DbContext();
            var qry = course_context.Course.Select(x => x).ToList();
            return qry;

        }




        //This function inserts a Lesson from the Add_Course Form.
        public static void Insert_Lesson_AddForm(string file_type, IFormCollection form)
        {         
            CRUD li = Retrieve_Course_ID();
            DbContext lesson_context = new DbContext();
            Lesson le = new Lesson();
            lesson_context.Add(le);
            if (file_type == ".pdf")
            {

                foreach (var file in form.Files)
                {

                    le.CourseId = li.CourseId;
                    le.SectionId = 0;
                    le.LessonId = 0;
                    le.LessonName = form["LessonName"];
                    le.LessonDescription = form["LessonDescription"];
                    le.VideoName = form["VideoName"];
                    le.VideoDescription = form["VideoDescription"];
                    le.TextName = form["TextDescription"];
                    le.TextDescription = form["TextName"];
                    le.TextFile = FileUpload.Upload_PDF_File(file);
                    lesson_context.SaveChanges();
                   
                }

            }

            if (file_type == "video")
            {           
             
                foreach (var file in form.Files)
                {
                    le.CourseId = li.CourseId;
                    le.SectionId = 0;
                    le.LessonId = 0;
                    le.LessonName = form["LessonName"];
                    le.LessonDescription = form["LessonDescription"];
                    le.VideoName = form["VideoName"];
                    le.VideoDescription = form["VideoDescription"];
                    le.TextFile = null;
                    le.TextName = form["TextDescription"];
                    le.TextDescription = form["TextName"];
                    lesson_context.SaveChanges();
                    FileUpload.Upload_Video_To_Vimeo(file);               
                
                }

            }
        }

        //Inserts a Lesson in the Update_Course Form -- Update Section
        public static void Insert_Lesson_UpdateForm(Lesson l, string file_type, IFormCollection form)
        {
            string CourseId = "";
            string SectionId = "";
            //Extracting the Course id and Section id from the form
            foreach (var key in form.Keys)
            {
                CourseId = form["CourseId"].ToString();
                SectionId = form["SectionId"].ToString();
                // etc.
            }

            string[] x = CourseId.Split("-");

            DbContext lesson_context = new DbContext();
            Lesson le = new Lesson();
            lesson_context.Add(le);
            if (file_type == "video")
            {

                foreach (var file in form.Files)
                {
                    le.CourseId = int.Parse(x[1]);
                    le.SectionId = int.Parse(SectionId);
                    le.LessonId = l.LessonId;
                    le.LessonName = l.LessonName;
                    le.LessonDescription = l.LessonDescription;
                    le.VideoName = l.VideoName;
                    le.VideoDescription = l.VideoDescription;
                    le.TextFile = l.TextFile;
                    le.TextName = l.TextName;
                    le.TextDescription = l.TextDescription;
                    lesson_context.SaveChanges();
                    FileUpload.Upload_Video_To_Vimeo(file);

                }

                // Pass Lesson list to Retrieve Insert Video To DB function
                FileUpload.Retrieve_Insert_Video_ToDB_Update(le);
            }

            if (file_type == ".pdf")
            {


                foreach (var file in form.Files)
                {
                    le.CourseId = int.Parse(x[1]);
                    le.SectionId = int.Parse(SectionId);
                    le.LessonId = l.LessonId;
                    le.LessonName = l.LessonName;
                    le.LessonDescription = l.LessonDescription;
                    le.VideoName = l.VideoName;
                    le.VideoDescription = l.VideoDescription;
                    le.TextName = l.TextName;
                    le.TextDescription = l.TextDescription;
                    le.TextFile =  FileUpload.Upload_PDF_File(file);
                    lesson_context.SaveChanges();
                }


            }


        }


        public static void Insert_Section(Section s, IFormCollection form)
        {
            int section_id = 0;
            //Retrieve the course id
            CRUD li = Retrieve_Course_ID();

            ////Add New Section to Section table
            DbContext section_context = new DbContext();
            Section section = new Section();
            section.CourseId = li.CourseId;
            section_context.Add(section);
            section_context.SaveChanges();


            //Retrieve section id from section table
            DbContext section_context1 = new DbContext();
            section_id = section_context1.Section.Max(x => x.SectionId);

            //update the Section table with the Section name and description
            DbContext section_context2 = new DbContext();
            var sec2 = section_context2.Section.First(g => g.SectionId == section_id);
            sec2.SectionName = s.SectionName;
            sec2.SectionDescription = s.SectionDescription;
            section_context2.SaveChanges();


            // Update all lessons where section id is 0
            DbContext lesson_context = new DbContext();
            var results = from c in lesson_context.Lesson
                          where c.SectionId == 0
                          select c;

            foreach (var lesson in results)
            {
                lesson.SectionId = section_id;
            }
            lesson_context.SaveChanges();
            //Retrieve all lessons in a section and pass them to Retrieve Insert Video To DB function
            List<Lesson> l = new List<Lesson>();
            DbContext lesson_context1 = new DbContext();
            var results1 = from c in lesson_context.Lesson
                           where c.SectionId == section_id
                           select c;

            foreach (var lesson in results1)
            {
                l.Add(lesson);
            }


            // Pass Lesson list to Retrieve Insert Video To DB function
            FileUpload.Retrieve_Insert_Video_ToDB(l);
        }


   
        
        

    
        //Inserts Course into the Main Form
        public static void Insert_Course(Course c, IFormCollection form)
        {
            byte[] imagebytes = null;
            int userid = 0;
            foreach (var key in form.Keys)
            {
                imagebytes = Encoding.Unicode.GetBytes(form["image"].ToString());
                userid = int.Parse(form["UserId"]);

            }


            //Retrieve the max section id
                CRUD li = Retrieve_Course_ID();
                //Update course on id  
                DbContext course_context = new DbContext();
                var cou = course_context.Course.First(g => g.CourseId == li.CourseId);
                cou.CourseName = c.CourseName;
                cou.CourseDescription = c.CourseDescription;
                cou.CourseImage = imagebytes;
                course_context.SaveChanges();

                //Add course id and associated user id
                DbContext user_course_context = new DbContext();
                CourseLogin cg = new CourseLogin();
                cg.CourseId = li.CourseId;
                cg.UserId = userid;
                user_course_context.Add(cg);
                user_course_context.SaveChanges();


        }

     
       
        //Edits Lesson from  the Update_Course Form
        public static void Edit_Lesson(LessonView l, int id)
        {
            DbContext lesson_context = new DbContext();
            var les = lesson_context.Lesson.First(g => g.LessonId == id);
            les.LessonName = l.lessonName;
            les.LessonDescription = l.lessonDescription;
            lesson_context.SaveChanges();
        }


        //Removes Lesson from the Update_Course Form
        public static void Remove_Lesson(LessonView l, int id)
        {
            //remove lesson
            DbContext lesson_context = new DbContext();
            Lesson Les = lesson_context.Lesson.Single(lesson => lesson.LessonId == id);
            lesson_context.Remove(Les);
            lesson_context.SaveChanges();

            //Remove all associated video's if any
            DbContext lesson_video_context = new DbContext();
            var results_cnt = (from c in lesson_video_context.Lesson_Video where c.LessonId == id select c).Count();
            
            if (results_cnt > 0)
            {
                var results = from c in lesson_video_context.Lesson_Video
                              where c.LessonId == id
                              select c;
                foreach (var video in results)
                {
                    lesson_video_context.Remove(video);
                }
                lesson_video_context.SaveChanges();

            }
      

        }

        //Removes Section from the Update_Course Form
        public static void Remove_Section(SectionView s, int id)
        {
           
            DbContext section_context = new DbContext();
            Section sec = section_context.Section.Single(section => section.SectionId == id);
            section_context.Remove(sec);
            section_context.SaveChanges();


            //Removes section from lesson table (MULTIPLE RECORDS)
            DbContext lesson_context = new DbContext();
            var results = from c in lesson_context.Lesson
                          where c.SectionId == id
                          select c;

            foreach (var courseenrollment in results)
            {
                lesson_context.Remove(courseenrollment);
            }
            lesson_context.SaveChanges();


            //Remove all associated video's if any
            DbContext lesson_video_context = new DbContext();
            var results_cnt = (from c in lesson_video_context.Lesson_Video where c.LessonId == id select c).Count();

            if (results_cnt > 0)
            {
                var results1 = from c in lesson_video_context.Lesson_Video
                              where c.LessonId == id
                              select c;
                foreach (var video in results1)
                {
                    lesson_video_context.Remove(video);
                }
                lesson_video_context.SaveChanges();

            }

        }



        //Edits Section from the Update_Course Form
        public static void Edit_Section(SectionView s, int id)
        {

            DbContext section_context = new DbContext();
            var sec = section_context.Section.First(g => g.SectionId == id);
            sec.SectionName = s.sectionName;
            section_context.SaveChanges();
        }

        
        //Edits Course
        public static void Edit_Course(CourseView c,int id)
        {
           
            DbContext course_context = new DbContext();
            var cou = course_context.Course.First(g => g.CourseId == id);
            cou.CourseName = c.courseName;
            course_context.SaveChanges();
        }


        //Removes Course from the Main Form
        public static void Remove_Course(int id)
        {
            //Removes a course associated with a particular course id
            DbContext course_context = new DbContext();
            Course cou = course_context.Course.Single(course => course.CourseId== id);
            course_context.Remove(cou);
            course_context.SaveChanges();



            //Removes all sections associated with a particular course id

            DbContext section_context = new DbContext();
            Section sec = section_context.Section.Single(section => section.CourseId == id);
            section_context.Remove(sec);
            section_context.SaveChanges();



            //Removes all lessons associated with a particular course id
            DbContext lesson_context = new DbContext();
            var results = from c in lesson_context.Lesson
                          where c.CourseId == id
                          select c;

            foreach (var courseenrollment in results)
            {
                lesson_context.Remove(courseenrollment);
            }
            lesson_context.SaveChanges();

            //Remove all associated video's if any
            DbContext lesson_video_context = new DbContext();
            var results_cnt = (from c in lesson_video_context.Lesson_Video where c.LessonId == id select c).Count();

            if (results_cnt > 0)
            {
                var results1 = from c in lesson_video_context.Lesson_Video
                               where c.LessonId == id
                               select c;
                foreach (var video in results1)
                {
                    lesson_video_context.Remove(video);
                }
                lesson_video_context.SaveChanges();

            }


        }





    }


 

}

  

