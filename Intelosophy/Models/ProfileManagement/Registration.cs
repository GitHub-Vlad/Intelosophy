using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intelosophy
{
    public partial class Registration
    {
        public int UserId { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName{ get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string ProfileBio { get; set; }
        public byte[] ProfilePicture { get; set; }

    }
}
