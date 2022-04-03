using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intelosophy
{
    public partial class Lesson_Video
    {
        public int CourseId { get; set; }
        public int SectionId { get; set; }
        public int LessonId { get; set; }
        public int VideoId { get; set; }
        public int PictureId { get; set; }

        //Parameterless constructor for execution of stored procedure
        public Lesson_Video()
        {


        }

        public Lesson_Video(int CourseId, int SectionId, int LessonId, int VideoId, int PictureId)
        {
            this.CourseId = CourseId;
            this.SectionId = SectionId;
            this.LessonId = LessonId;
            this.VideoId = VideoId;
            this.PictureId = PictureId;

        }


    }


}
