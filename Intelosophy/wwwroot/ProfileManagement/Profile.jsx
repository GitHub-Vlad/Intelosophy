
//Add MainForm
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Profile: [],
            Name: "",
            ProfileBio: "",
            user_id: ""

        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeProfileBio = this.onChangeProfileBio.bind(this);
        this.handle_Profile_UI_Click = this.handle_Profile_UI_Click.bind(this);
        
    }


    componentDidMount() {      
        var pathArray = window.location.pathname.split('/');
       
       
        //Load ProfileUI
        axios.get('/ProfileManagement/Retrieve_UserProfile/' + pathArray[3] ).then(res => {
            this.setState({ Profile: res.data });
         
        });        
    }

    onChangeName(e) {
        this.setState({
            Name: e.currentTarget.textContent
        });
    }
  
    onChangeProfileBio(e) {

        this.setState({
            ProfileBio: e.currentTarget.textContent           
        });     
    }


    //handles the Profile UI edit
    handle_Profile_UI_Click() {

        var pathArray = window.location.pathname.split('/');
        if (this.state.ProfileBio === "")
            this.state.ProfileBio = this.state.Profile.profileBio;
        if (this.state.Name === "")
            this.state.Name = this.state.Profile.firstName + " " + this.state.Profile.lastName;

        let profile_form = new FormData();
        //form.append("image", image_name);
        profile_form.append("Name", this.state.Name);
        profile_form.append("ProfileBio", this.state.ProfileBio);
        axios.post('/ProfileManagement/Edit_Profile/' + pathArray[3], profile_form);
    }

    
    render() {
        const { Profile } = this.state;
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3];
        const listitem = {
            display: 'inline',
            color: 'blue',
            textalign: 'center',
            padding: '14px 16px',
            float: 'right'
        };
        const link = {
            color: 'black'
        };
    return [


        <ul>
            <li style={listitem}><a style={link} href={'/CourseManagement/Manage_Course/' + x}>Update Course</a></li>
            <li style={listitem}><a style={link} href={'/CourseManagement/Add_Course/' + x}>Add Course</a></li>            
            <li style={listitem}><a style={link} href={'/ProfileManagement/Logout/'}>Logout</a></li>
        </ul>
,
<div class="container">
    <div class="row py-5">
        <div class="col-sm">
         <h1> Profile </h1>
            <hr class="mb-4"></hr>
            <div class="card">
                <div class="row no-gutters">
                    <div class="col-3">
                    <img src="https://picsum.photos/250/250" class="card-img" alt="Profile Picture"></img>
                    </div>
                    <div class="col-9"> 
                        <div class="card-body">
                                        <div class="card-body">
                         <h2 class="card-title" contenteditable="true" defaultValue={Profile.profileBio}  onInput={this.onChangeName}>{Profile.firstName + ' '} {Profile.lastName} </h2>
                         <p contenteditable="true" defaultValue={Profile.profileBio} onInput={this.onChangeProfileBio}>{Profile.profileBio}</p>
                        <button type="button" class="btn btn-primary btn-lg btn-block"onClick={this.handle_Profile_UI_Click.bind(this)}>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                    </div>
               



            ];

    }
}
  
       
ReactDOM.render(<Profile/>, document.getElementById('content'));



                       


