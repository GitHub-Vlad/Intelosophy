using System;
using System.Collections.Generic;
using System.IO;
using Intelosophy.Models.CourseManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using VimeoDotNet;
using VimeoDotNet.Models;
using VimeoDotNet.Net;
using Xunit;
using System.Threading;

namespace Intelosophy
{
    public class FileUpload
    {

        public static IVimeoClient CreateAuthenticatedClient()
        {
            return new VimeoClient("3b4d945730bf7a6eeae80dfe75483989");
        }

        // This function uploads a video associated with a particular lesson to Vimeo.
        [Fact]
        public static async Task Upload_Video_To_Vimeo(IFormFile File)
        {

            byte[] fileArray;

            //Upload Video
            using (var stream = File.OpenReadStream())
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                fileArray = memoryStream.ToArray();
                using (var file = new BinaryContent(fileArray, "video/mp4"))
                {
                    VimeoDotNet.VimeoClient x = new VimeoDotNet.VimeoClient("3b4d945730bf7a6eeae80dfe75483989");
                    await x.UploadEntireFileAsync(file);
       

                }
          
            }
          
        }


        //This function is implemented in Add Section/Add Course of the Add form.
        public static void Retrieve_Insert_Video_ToDB(List<Lesson> l)
        {
            Thread.Sleep(70000);
            //Create a lesson Video list 
            List<Lesson_Video> lv = new List<Lesson_Video>();           
   
                //Retrieve the Video List
                var client = FileUpload.CreateAuthenticatedClient();
                var video = client.GetVideosAsync(11337297).GetAwaiter().GetResult();
                var n = video.Data.ToList<Video>();

                // Sort video list by "Created Time" ascending -This works.
                List<Video> SortedVideoList = n.OrderBy(o => o.CreatedTime).ToList();

                //Get the count of the videos stored in the db.
                DbContext lesson_video_context = new DbContext();
                var results_cnt = (from c in lesson_video_context.Lesson_Video select c).Count();

                //IF there are videos stored in db
                if (results_cnt > 0)
                {

                    // Retrieve all videos stored in the db
                    lesson_video_context = new DbContext();
                    var results = from c in lesson_video_context.Lesson_Video
                                  select c;

                    //Add all videos found in the dbtable to a list
                    List<Lesson_Video> dblist = new List<Lesson_Video>();
                    foreach (var lessonvideo in results)
                    {
                        dblist.Add(lessonvideo);
                    }

                    //Creating a new video list for videos that are not in DB.
                    List<Video> nv = new List<Video>();
                    nv = SortedVideoList.Where(p => !dblist.Any(p2 => p2.VideoId == p.Id)).ToList();


                    // Loop through Lesson List and Add the video and picture id as well as other attributes to Lesson_Video
                    for (int i = 0; i < l.Count; i++)
                    {
                        ////Retrieve picture id
                        var client1 = FileUpload.CreateAuthenticatedClient();
                        var pictures = client.GetPicturesAsync(int.Parse(nv[i].Id.ToString())).GetAwaiter().GetResult();
                        var uriParts = pictures.Data[0].Uri.Split('/');
                        lv.Add(new Lesson_Video(l[i].CourseId, l[i].SectionId, l[i].LessonId, int.Parse(nv[i].Id.ToString()), int.Parse(uriParts[uriParts.Length - 1])));
                    }


                    //Write lv list to the DB. 
                    foreach (var d in lv)
                    {
                        lesson_video_context.Add(d);
                    }

                    lesson_video_context.SaveChanges();

                }
                else
                {
                    // Loop through Lesson List and Add the video and picture id as well as other attributes to Lesson_Video
                    for (int i = 0; i < l.Count; i++)
                    {
                        ////Retrieve picture id
                        var client1 = FileUpload.CreateAuthenticatedClient();
                        var pictures = client.GetPicturesAsync(int.Parse(SortedVideoList[i].Id.ToString())).GetAwaiter().GetResult();
                        var uriParts = pictures.Data[0].Uri.Split('/');
                        lv.Add(new Lesson_Video(l[i].CourseId, l[i].SectionId, l[i].LessonId, int.Parse(SortedVideoList[i].Id.ToString()), int.Parse(uriParts[uriParts.Length - 1])));
                    }

                    //Write lv list to the DB. 
                    foreach (var d in lv)
                    {
                        lesson_video_context.Add(d);
                    }

                    lesson_video_context.SaveChanges();
                }
            }


        //This function is implemented in Add Lesson of the Update form.
        public static void Retrieve_Insert_Video_ToDB_Update(Lesson l)
        {

            Thread.Sleep(25000);
            //Create a lesson video object
            Lesson_Video lv = new Lesson_Video();

            //Retrieve the video list
            var client = FileUpload.CreateAuthenticatedClient();
            var video = client.GetVideosAsync(11337297).GetAwaiter().GetResult();
            var n = video.Data.ToList<Video>();

            // Sort video list by "Created Time" ascending -This works.
            List<Video> SortedVideoList = n.OrderBy(o => o.CreatedTime).ToList();


            //Retrieve the picture id for the latest video.
            ////Retrieve picture id
            var client1 = FileUpload.CreateAuthenticatedClient();
            var pictures = client.GetPicturesAsync(int.Parse(SortedVideoList[SortedVideoList.Count-1].Id.ToString())).GetAwaiter().GetResult();
            var uriParts = pictures.Data[0].Uri.Split('/');


            ////Add to the List.
            lv.CourseId = l.CourseId;
            lv.SectionId = l.SectionId;
            lv.LessonId = l.LessonId;
            lv.VideoId = int.Parse(SortedVideoList[SortedVideoList.Count - 1].Id.ToString());
            lv.PictureId = int.Parse(uriParts[uriParts.Length - 1]);


            ////Add to the DB.
            DbContext lesson_video_context = new DbContext();
            lesson_video_context.Add(lv);
            lesson_video_context.SaveChanges();


        }



        // This function uploads a pdf file to the DB.
        public static byte[] Upload_PDF_File(IFormFile file)
        {
           
            if (file == null || file.Length == 0)
                throw new Exception("File is empty!");
            byte[] fileArray;
            using (var stream = file.OpenReadStream())
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                fileArray = memoryStream.ToArray();
            }
            return fileArray;

        }

    }
}
