
//Add MainForm
class AddRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Registration: [{ Email: "", Password: "", FirstName: "", LastName: "", Address: "", Country: "", State: "", Zip: "", ProfileBio: "" }],
            user_id: "",
            result: "",
       
        }

        this.handle_Registration_UI_Click = this.handle_Registration_UI_Click.bind(this);
        this.Validate_Registration_Form = this.Validate_Registration_Form.bind(this);
        this.handle_Registration_UI_FieldChange = this.handle_Registration_UI_FieldChange.bind(this);
        
    }


    componentDidMount() {
        axios.get('/ProfileManagement/Add_UserID').then(res => {
            this.setState({ user_id: res.data });
        });
    }





    //    //Handles state changes of all fields in the Lesson UI component
    handle_Registration_UI_FieldChange(i, e) {

        const { name, value } = e.target;
        let Registration = [...this.state.Registration];
        Registration[i] = { ...Registration[i], [name]: value };
        this.setState({ Registration });
        this.setState({ [event.target.name]: event.target.value });
        var email = document.getElementById("email").value;
        let registration_form = new FormData();
        registration_form.append("Email", email);
        axios.post('/ProfileManagement/Validate_Registration', registration_form).then(res => {
            this.setState({ result: res.data });
        });
     

    }

 

     //Validate Registration Form
    //Validates the Lesson UI Form from the Lesson UI Form
    Validate_Registration_Form() {
        if (this.state.Email === "" || this.state.Email === undefined)
            alert("Please add a Email!");
        else if (this.state.Password === "" || this.state.Password === undefined)
            alert("Please add a Password!");
        else if (this.state.FirstName === "" || this.state.FirstName === undefined)
            alert("Please add a First Name!");
        else if (this.state.LastName === "" || this.state.LastName === undefined)
            alert("Please add a Last Name!");
        else if (this.state.Address === "" || this.state.Address === undefined)
            alert("Please add a Address!");
        else if (this.state.Country === "" || this.state.Country === undefined)
            alert("Please add a Country!");
        else if (this.state.State=== "" || this.state.State === undefined)
            alert("Please add a State!");
        else if (this.state.Zip === "" || this.state.Zip === undefined)
            alert("Please add a Zip Code!");
        else if (this.state.ProfileBio === "" || this.state.ProfileBio === undefined)
            alert("Please add a Profile Bio!");
     
    }

    

    handle_Registration_UI_Click() {
    
        
        if (this.state.result === "Username Exists!")
            alert("This username exists! Please enter another username!");
        else
        {
            this.Validate_Registration_Form();


            let RegistrationForm = new FormData();
            RegistrationForm.append("Email", this.state.Email);
            RegistrationForm.append("Password", this.state.Password);
            RegistrationForm.append("FirstName", this.state.FirstName);
            RegistrationForm.append("LastName", this.state.LastName);
            RegistrationForm.append("Address", this.state.Address);
            RegistrationForm.append("Country", this.state.Country);
            RegistrationForm.append("State", this.state.State);
            RegistrationForm.append("Zip", this.state.Zip);
            RegistrationForm.append("ProfileBio", this.state.ProfileBio);
            
            axios.post('/ProfileManagement/AddRegistration', RegistrationForm)
            location.href = "/ProfileManagement/Login/";
        }
     
      
    }


    render() {
        return this.state.Registration.map((el, i) => (
            <div key={i}>
            <body class="bg-light">
            <div class="navbar navbar-light bg-light">
                <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                                <img src="includes/intelesophy-logo.png" alt="Intelesophy" title="Intelesophy"></img>
                                
          </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                               
                        </button>
	</div>
            </div>
        
            <div class="container">
                <div class="row py-5">
                    <div class="col-sm">
                        <h1>User Registration</h1>
                        <hr class="mb-4"></hr>
                <div class="mb-3">
                    <label for="userEmail">Email address</label>
                    <input type="text" class="form-control" name = "Email" id = "email" value={el.Email || ''}  onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}></input>
                        <div class="invalid-feedback">
                            Please enter a valid email address
		            </div>
                </div>
                <div class="mb-3">
                    <label for="userPassword">Password</label>
                    <input type="text" class="form-control" name="Password"  onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}></input>
	           </div>  
                <div class="row">
                    <div class="col-md-6 mb-3">
                          <label for="firstName">First name</label>
                          <input type="text" class="form-control" name = "FirstName"  onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}></input>
                            <div class="invalid-feedback">
                                Valid first name is required.
			</div>
		</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control" name = "LastName"  onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}></input>
                    <div class="invalid-feedback">
                        Valid last name is required.
			</div>
		</div>
            <div class="mb-3">
                <label for="address">Address</label>
                <input type="text" class="form-control" name = "Address" onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}></input>
                        <div class="invalid-feedback">
                            Please enter your shipping address.
		</div>
                                </div>
                                <div class="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select class="custom-select d-block w-100" name="Country" onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}required="">
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                               </div>
                                </div>
            <div class="col-md-4 mb-3">
                <label for="state">State</label>
                   <select class="custom-select d-block w-100" name = "State" onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}>
                    <option value="">Choose...</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                </select>
                <div class="invalid-feedback">
                    Please provide a valid state.
            </div>
            </div>
            <div class="col-md-3 mb-3">
                <label for="zip">Zip</label>
                <input type="text" class="form-control" name = "Zip" onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}></input>
                    <div class="invalid-feedback">
                        Zip code required.
            </div>
          </div>
            <div class="mb-3">
                <label for="userBio">Profile Bio</label>
                <textarea class="form-control" name = "ProfileBio"  onChange={this.handle_Registration_UI_FieldChange.bind(this, i)}  rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="userPicture">Profile Picture</label>
                <input type="file" class="form-control-file" name="File" id="userPicture" onChange={this.handle_Registration_UI_File_Change}></input>
  	</div>
            <hr class="mb-4"></hr>

         <button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.handle_Registration_UI_Click.bind(this)} >Register Now</button>


                    </div>
                </div>
            </div>
                </body>
            </div>
        ));
    }
    }
   

ReactDOM.render(<AddRegistration />, document.getElementById('content'));














































