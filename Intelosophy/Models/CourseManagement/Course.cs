using System;
using System.Collections.Generic;

namespace Intelosophy
{
    public partial class Course
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public byte[] CourseImage { get; set; }
    }
}
