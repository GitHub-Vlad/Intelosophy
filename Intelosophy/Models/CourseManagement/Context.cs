using System;
using Intelosophy.Models.CourseManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Intelosophy
{
    public partial class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<Lesson> Lesson { get; set; }
        public virtual DbSet<Section>Section { get; set; }
        public virtual DbSet<Lesson_Video> Lesson_Video { get; set; }
        public virtual DbSet<CRUD> Link { get; set; }
        public virtual DbSet<LessonView> Lv { get; set; }
        public virtual DbSet<SectionView> Sv { get; set; }
        public virtual DbSet<CourseView> Cv { get; set; }
        public virtual DbSet<CourseLogin> Cg { get; set; }





        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Data Source=mi3-wdb2.a2hosting.com;Initial Catalog=residen5_Intelosophy;Persist Security Info=false; User ID=residen5_VLAD_ALEX;Password=zN9@2px5");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:DefaultSchema", "residen5_VLAD_ALEX");

            modelBuilder.Entity<Course>(entity =>
            {
                entity.HasKey(e => e.CourseId);

                entity.ToTable("CourseManagement_Course");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.CourseDescription)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

               // entity.Property(e => e.CourseImage).HasColumnType("image");

                entity.Property(e => e.CourseName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Lesson>(entity =>
            {
                entity.HasKey(e => new {  e.LessonId });

                entity.ToTable("CourseManagement_Lesson");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.SectionId).HasColumnName("SectionID");

                entity.Property(e => e.LessonId)
                    .HasColumnName("LessonID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.LessonDescription)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.LessonName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TextDescription)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.TextName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TextFile)
                    .IsUnicode(false);

                entity.Property(e => e.VideoDescription)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.VideoName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.HasKey(e => new { e.CourseId, e.SectionId });

                entity.ToTable("CourseManagement_Section");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.SectionId)
                    .HasColumnName("SectionID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.SectionDescription)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.SectionName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Lesson_Video>(entity =>
            {
                entity.HasKey(e => new { e.CourseId, e.SectionId,e.LessonId });

                entity.ToTable("CourseManagement_Lesson_Video");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.SectionId).HasColumnName("SectionID");

                entity.Property(e => e.LessonId).HasColumnName("LessonID");

                entity.Property(e => e.VideoId).HasColumnName("VideoID");

                entity.Property(e => e.PictureId).HasColumnName("PictureID");


            });

            modelBuilder.Entity<CourseLogin>(entity =>
            {
                entity.HasKey(e => new { e.CourseId, e.UserId});

                entity.ToTable("CourseManagement_User_Course");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

            });

        

            modelBuilder.Entity<CourseView>()
       .HasKey(c => new { c.courseid, c.userid });






        }
    }
}
