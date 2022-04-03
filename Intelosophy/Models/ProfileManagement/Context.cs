using System;
using Intelosophy.Models.CourseManagement;
using Intelosophy.Models.ProfileManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Intelosophy
{
    public partial class DbContext1 : Microsoft.EntityFrameworkCore.DbContext
    {
        public virtual DbSet<Profile> Profile { get; set; }
        public virtual DbSet<Registration> Registration { get; set; }
        public virtual DbSet<LogIn> Login{ get; set; }







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


            modelBuilder.Entity<Registration>(entity =>
            {
                entity.HasKey(e => new { e.UserId });

                entity.ToTable("ProfileManagement_Registration");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Password).HasColumnName("Password");

                entity.Property(e => e.FirstName).HasColumnName("FirstName");

                entity.Property(e => e.LastName).HasColumnName("LastName");

                entity.Property(e => e.Email).HasColumnName("Email");

                entity.Property(e => e.Address).HasColumnName("Address");

                entity.Property(e => e.Country).HasColumnName("Country");

                entity.Property(e => e.State).HasColumnName("State");

                entity.Property(e => e.Zip).HasColumnName("Zip");

                entity.Property(e => e.ProfileBio).HasColumnName("ProfileBio");

                entity.Property(e => e.ProfilePicture).HasColumnName("ProfilePicture");

            });


            modelBuilder.Entity<Profile>(entity =>
            {
                entity.HasKey(e => new { e.UserId });

                entity.ToTable("ProfileManagement_Profile");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.FirstName).HasColumnName("FirstName");

                entity.Property(e => e.LastName).HasColumnName("LastName");

                entity.Property(e => e.Email).HasColumnName("Email");

                entity.Property(e => e.ProfileBio).HasColumnName("ProfileBio");

                entity.Property(e => e.ProfilePicture).HasColumnName("ProfilePicture");

            });

           

            modelBuilder.Entity<LogIn>(entity =>
            {
                entity.HasKey(e => new { e.UserId });

                entity.ToTable("ProfileManagement_LogIn");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Password).HasColumnName("Password");

                entity.Property(e => e.Email).HasColumnName("Email");

             

            });
        }
    }
}
