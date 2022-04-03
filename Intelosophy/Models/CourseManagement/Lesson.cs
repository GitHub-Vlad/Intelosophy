using System;
using System.Collections.Generic;

namespace Intelosophy
{
    public partial class Lesson
    {
        public int CourseId { get; set; }
        public int SectionId { get; set; }
        public int LessonId { get; set; }
        public string LessonName { get; set; }
        public string LessonDescription { get; set; }
        public string VideoName { get; set; }
        public string VideoDescription { get; set; }
        public byte[] TextFile{ get; set; }
        public string TextName { get; set; }
        public string TextDescription { get; set; }



    }

  
}
