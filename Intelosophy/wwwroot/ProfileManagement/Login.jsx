
//Add MainForm
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Login: [{ Email: "", Password: "" }],
            LoginInfoFromDB: [],
            result: "",
            isvalid: "",
            user_id: "",
            Email: "",
            Password: ""

        }
        this.handle_Login_UI_FieldChange = this.handle_Login_UI_FieldChange.bind(this);
        this.handle_Login_UI_Click = this.handle_Login_UI_Click.bind(this);

    }


    handle_Login_UI_FieldChange(i, e) {
        const { name, value } = e.target;
        let Login = [...this.state.Login];
        Login[i] = { ...Login[i], [name]: value };
        this.setState({ Login });
        this.setState({ [event.target.name]: event.target.value });
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        let login_form = new FormData();
        //form.append("image", image_name);
        login_form.append("Email", email);
        login_form.append("Password", password);
        axios.post('/ProfileManagement/Validate_Login/', login_form).then(res => {
            this.setState({ result: res.data });
        });

    }

    handle_Login_UI_Click() {

     
       // alert(window.location.href);
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

     

            //// Case I: To check if all input fields are filled in 
            if ((this.state.Email === "" || this.state.Email === undefined) || (this.state.Password === "" || this.state.Password === undefined)) {

                if (this.state.Email === "" || this.state.Email === undefined)
                    alert("Please add a Email!");
                else if (this.state.Password === "" || this.state.Password === undefined)
                    alert("Please add a Password!");

            }

            /// Case II: Minimum number of characters allowance for email and password
            else if (email.length < 6 || password.length < 4) {
                if (email.length < 6)
                    alert("Invalid Email!");
                else if (password.length < 4)
                    alert("Invalid Password!");

            }



            //Case III:- Compares the user input with the ones stored in the db
            else {

                if (this.state.result === "UserName or Password is Incorrect!") {
                    alert("UserName or Password is Incorrect!");
                }
                else
                {
                    axios.get('/ProfileManagement/Retrieve_Userid/' +  email  + '/' +  password ).then(res => {
                        this.setState({ user_id: res.data });
                        location.href = "/ProfileManagement/Profile/" + this.state.user_id;
                    });


                }
                
              


                




               


            }
        }
        
    
               
    

    render() {

        return this.state.Login.map((el, i) => (
            <div key={i}>
            <div class="limiter">
             
                    <div class="wrap-login100 p-t-190 p-b-30">
                        <form class="login100-form validate-form">
                        <a href="#" class="navbar-brand d-flex align-items-center">
                           
          </a>
                            <span class="login100-form-title p-t-20 p-b-45">
                                Intelosophy
					</span>
                            
                            <div class="wrap-input100 validate-input m-b-10" data-validate="Username is required">
                                <input class="input100" type="text" value={el.Email || ''} id="email" name="Email" onChange={this.handle_Login_UI_FieldChange.bind(this, i)}   placeholder="Email" ></input>
                                    <span class="focus-input100"></span>
                                    <span class="symbol-input100">
                                        <i class="fa fa-user"></i>
                                    </span>
					</div>
                        
                            <div class="wrap-input100 validate-input m-b-10" data-validate="Password is required">
                                <input class="input100" type="password" value={el.Password || ''} id="password" name="Password" onChange={this.handle_Login_UI_FieldChange.bind(this, i)}  placeholder="Password"></input>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock"></i>
                                        </span>
					</div>

                                    <div class="container-login10-form-btn p-t-10">
                                  <button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.handle_Login_UI_Click.bind(this)} >LogIn</button>
                                    </div>

                                    <div class="text-center w-full">
                                <a class="txt1" href='http://localhost:57496/ProfileManagement/Add_Registration'>
                                            Create new account
							<i class="fa fa-long-arrow-right"></i>
                                        </a>
                            </div>
                            
				</form>
                            </div>
		</div>
            </div>
       
        ));
    }
}


   

ReactDOM.render(<Login/>, document.getElementById('content'));














































