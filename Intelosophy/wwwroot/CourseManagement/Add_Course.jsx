
//Add lesson component
class AddLesson extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
       // this.LessonArray = [];
        this.LessonForm = null;   
        this.state = {
            Lesson: [{ lessonName: "", lessonDescription: "", fileUpload: "" }],
            Link: {},
            //Flag which checks if file has been uploaded
            file_uploaded: "No",
            //Variable which holds the Uploaded file name
            file_name: "",

            //Variable that checks if Add Lesson Button has been clicked ---- after Add Section Prompt
            AddLesson_ButtonClicked: "No"
        }

        this.handle_Lesson_UI_Field_Change = this.handle_Lesson_UI_Field_Change.bind(this);
        this.handle_Lesson_UI_Click = this.handle_Lesson_UI_Click.bind(this);
        this.handle_LessonUI_Validation = this.handle_LessonUI_Validation.bind(this);
        this.handle_AddTo_LessonUI_Form = this.handle_AddTo_LessonUI_Form.bind(this);
    }
    //Handle adding the LessonUI input fields into the array
    handle_AddTo_LessonUI_Form() {
        //// Write the Lesson to the DB. 
        object = this.state.Link;
        if (file_name.name.includes(".pdf")) {
            this.state.file_uploaded = "Yes";
            LessonForm = new FormData();
           // let LessonForm = new FormData();
            LessonForm.append("file", file_name);
            LessonForm.append("CourseId", object.courseId);
            LessonForm.append("SectionId", object.sectionId);
            LessonForm.append("LessonName", this.state.lessonName);
            LessonForm.append("LessonDescription", this.state.lessonDescription);
            LessonForm.append("VideoName", "None");
            LessonForm.append("VideoDescription", "None");
            LessonForm.append("TextName", "This is a PDF File!");
            LessonForm.append("TextDescription", file_name.name);
            axios.post('/CourseManagement/Add_Lesson', LessonForm);
        }
        else if (file_name.name.includes(".mp4")) {
            this.state.file_uploaded = "Yes";
            LessonForm = new FormData();
            LessonForm.append("file", file_name);
            LessonForm.append("CourseId", object.courseId);
            LessonForm.append("SectionId", object.sectionId);
            LessonForm.append("LessonName", this.state.lessonName);
            LessonForm.append("LessonDescription", this.state.lessonDescription);
            LessonForm.append("VideoName", "None");
            LessonForm.append("VideoDescription", "None");
            LessonForm.append("TextName", "This is a MP4 File!");
            LessonForm.append("TextDescription", file_name.name);
            axios.post('/CourseManagement/Add_Lesson', LessonForm);      
        }
        return this.LessonForm;
    }

    //Handles state changes of all fields in the Lesson UI component
    handle_Lesson_UI_Field_Change(i, e) {
        const { name, value } = e.target;
        let Lesson = [...this.state.Lesson];
        Lesson[i] = { ...Lesson[i], [name]: value };
        this.setState({ Lesson });
        this.setState({ [event.target.name]: event.target.value });
    }

    // Add Lesson Button click Event
    handle_Lesson_UI_Click() {
        //Checks for empty fields in the Lesson UI Form. Prompts user to fill them in.
        if (this.state.lessonName === "" || this.state.lessonName === undefined || this.state.lessonDescription === "" || this.state.lessonDescription === undefined || this.state.file_uploaded === "No") {
            if (this.state.lessonName === "" || this.state.lessonName === undefined)
                alert("Please add a LessonName!");
            else if (this.state.lessonDescription === "" || this.state.lessonDescription === undefined)
                alert("Please add a LessonDescription!");
            else if (this.state.file_uploaded === "No")
                alert("Please upload a file!");
        }

        // If all Lesson UI fields are filled out in the Lesson UI, disable the text fields, Hide the Add Lesson Button, And add all the textfields to an array
        else {
            for (var i = 0; i <= this.state.Lesson.length - 1; i++)
            {
                this.refs[i + 'lesson_Name'].disabled = true;
                this.refs[i + 'lesson_Description'].disabled = true;
                this.refs[i + 'Add_button'].style.visibility = "hidden";
            }

            this.handle_AddTo_LessonUI_Form();
            this.setState(prevState => ({
                Lesson: [...prevState.Lesson, { lessonName: " ", lessonDescription: " ", fileUpload: " " }]
            }));
            this.state.lessonName = "";
            this.state.lessonDescription = "";
            this.state.file_uploaded = "No";
        }
    }
    // Lesson UI File Upload Event
    handle_LessonUI_File_Change = e => {
        if (e.target.files[0].name.includes(".pdf") || e.target.files[0].name.includes(".mp4"))
            this.state.file_uploaded = "Yes";
        file_name = e.target.files[0];      
    }
    //Validates that all Lesson UI fields are filled in upon Add Section Button Click
    handle_LessonUI_Validation() {
        //IF one of the Lesson UI text input fields is not filled in
        if (this.state.lessonName === "" || this.state.lessonName === undefined || this.state.lessonDescription === "" || this.state.lessonDescription === undefined || this.state.file_uploaded === "No") {
            if (this.state.lessonName === "" || this.state.lessonName === undefined)
                alert("Please add a LessonName... before adding a Section!");
            else if (this.state.lessonDescription === "" || this.state.lessonDescription === undefined)
                alert("Please add a LessonDescription... before adding a Section!");
            else if (this.state.file_uploaded === "No")
                alert("Please upload a file... before adding a Section!");
            return 'NeedValidation';
        }
        else if (this.state.lessonName !== "" && this.state.lessonName !== undefined && this.state.lessonDescription !== "" && this.state.lessonDescription !== undefined) {
            this.state.AddLesson_ButtonClicked = "Yes";
            if (this.state.AddLesson_ButtonClicked === "Yes")
            {
                for (var i = 0; i <= this.state.Lesson.length - 1; i++)
                {
                    this.refs[i + 'lesson_Name'].disabled = true;
                    this.refs[i + 'lesson_Description'].disabled = true;
                    this.refs[i + 'Add_button'].style.visibility = "hidden";
                }
            }
            this.state.AddLesson_ButtonClicked = "No";
            return 'AddNewSection';
        }
    }
    render() {

        return this.state.Lesson.map((el, i) => (
            <div key={i} >
                <li class="list-group-item bg-light" >
                    <div class="row">

                        <div class="col-sm">
                            <label for="LessonName1">Lesson Name</label>
                            <input type="text" ref={i + 'lesson_Name'}  class="form-control" name="lessonName"  value={el.lessonName || ''} onChange={this.handle_Lesson_UI_Field_Change.bind(this, i)}></input>
                        </div>


                        <div class="col-sm" >
                            <label for="LessonDesc1">Lesson Description</label>
                            <textarea class="form-control" rows="2" name="lessonDescription"  ref={i + 'lesson_Description'} value={el.lessonDescription || ''} onChange={this.handle_Lesson_UI_Field_Change.bind(this, i)} ></textarea>
                        </div>

                        <div class="col-sm">
                            <div class="form-group">
                                <label for="FileUpload1">File Upload</label>
                                <input type="file" class="form-control-file"  name="File" ref={i + 'file_upload'} onChange={this.handle_LessonUI_File_Change} ></input>
                            </div>
                        </div>
                    </div>
                </li>
                <button type="button" class="btn btn-primary" ref={i + 'Add_button'}  onClick={this.handle_Lesson_UI_Click.bind(this, i)}>Add Lesson</button>
            </div>

        ));

    }
}


////Add Section component
class AddSection extends React.Component {
    constructor(props) {
        super(props)
        this.componentRef = React.createRef() 
        this.SectionForm = null;
        this.state = {
            Section: [{ sectionName: "", lessonName: "", lessonDescription: "", fileUpload: "" }],          
        }

        this.handle_Section_UI_Field_Change = this.handle_Section_UI_Field_Change.bind(this);
        this.handle_AddTo_SectionUI_Form = this.handle_AddTo_SectionUI_Form.bind(this);
        this.handle_Section_UI_Click = this.handle_Section_UI_Click.bind(this);       
    }

    

    // This function receives a LessonArray from LessonUi
    callbackFunction = (childData) => { this.setState({ Lesson_Array: childData }) }

    //Sends data from Section Component to Course component signaling that at least one course has been added.
    sendData = () => {
        this.props.parentCallback("Yes");
    }
   
    //Handles state changes of all fields in the Section UI component
    handle_Section_UI_Field_Change(i, e) {
        const { name, value } = e.target;
        let Section = [...this.state.Section];
        Section[i] = { ...Section[i], [name]: value };
        this.setState({ Section });
        this.setState({ [event.target.name]: event.target.value });
    }
    handle_AddTo_SectionUI_Form()
    {
       this.componentRef.current.handle_AddTo_LessonUI_Form();      
        SectionForm = new FormData();
        SectionForm.append("CourseId", this.props.CourseIdData);
        SectionForm.append("SectionId", this.props.SectionIdData);
        SectionForm.append("SectionName", this.state.sectionName);
        SectionForm.append("SectionDescription", "This will be the section description!");
        axios.post('/CourseManagement/Add_Section', SectionForm);
        return this.SectionForm;
    }
    // Add Lesson Button click Event
    handle_Section_UI_Click() {
        if (this.state.sectionName === "" || this.state.sectionName === undefined)
            alert("Please enter a Section Name!");
        else {
            if (this.componentRef.current.handle_LessonUI_Validation() === "AddNewSection")
            {
                for (var i = 0; i <= this.state.Section.length - 1; i++)
                {
                    this.refs[i + 'section_Name'].disabled = true;
                    this.refs[i + 'section_btn'].style.visibility = "hidden";

                }

                if (this.props.dataFromParent === "No")
                {
                    this.setState(prevState => ({
                        Section: [...prevState.Section, { sectionName: "", lessonName: "", lessonDescription: "", fileUpload: "" }]
                    }));
                }
                

              }
           
            this.handle_AddTo_SectionUI_Form();
            this.sendData();
       
                  
        }
            }


    render() {
        return this.state.Section.map((el, i) => (
            <div key={i}>
                <li class="list-group-item"> 
                    <div class="form-group">
                        <label for="SectionName">Section Name</label>
                        <input type="text" class="form-control" name="sectionName" ref={i + 'section_Name'}  value={el.sectionName || ''} onChange={this.handle_Section_UI_Field_Change.bind(this, i)} placeholder="Section Name"></input>
                    </div>
                    <li class="list-group-item bg-light">
                        <AddLesson ref={this.componentRef}/>
                    </li>
                </li>
                <button type="button" class="btn btn-primary" ref={i + 'section_btn'} onClick={this.handle_Section_UI_Click.bind(this, i)}>Add Section</button>
            </div>
        ))
    }
}


class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef() 
        this.state = {
            Link: [],
            CourseName: "",
            AtleastOne_SectionAdded: "No",
            Course_has_been_Added: "No",
            image_name: ""
        };
       this.handle_Course_UI_Click = this.handle_Course_UI_Click.bind(this);
        this.handle_Course_UI_Field_Change = this.handle_Course_UI_Field_Change.bind(this);
        
    }

    ////On form load event (Inserts course id and section id into their appropriate tables)
    componentDidMount() {

     
        axios.get('/CourseManagement/Add_CourseID').then(res => {
                this.setState({ Link: res.data });
        });
       

        }
  

    //handles state changes for the Course UI fields
    handle_Course_UI_Field_Change() {
        let CourseName = [...this.state.CourseName];
        this.setState({ CourseName });
        this.setState({ [event.target.name]: event.target.value });
  
    }


    // Lesson UI File Upload Event
    handle_CourseUI_Image_Change = e => {
        
        if (e.target.files[0].name.includes(".png") || e.target.files[0].name.includes(".jpg") || e.target.files[0].name.includes(".jpeg"))
            image_name = e.target.files[0];          
    }


    //This function communicates to the Course component if at least one Section added.
    callbackFunction = (childData) => {this.setState({ AtleastOne_SectionAdded: childData }) }

   
    //handles the Course UI button click event (changes state of Section UI to initial state)
    handle_Course_UI_Click() {
       
        if (this.state.CourseName === "" || this.state.CourseName === undefined)
            alert("Please enter a Course Name!");
        else
        {
                this.componentRef.current.handle_AddTo_SectionUI_Form();
                var pathArray = window.location.pathname.split('/');
                const { Link } = this.state
                let form = new FormData();
                //form.append("image", image_name);
                form.append("CourseId", Link.courseId);
                form.append("UserId", pathArray[3]);
                form.append("CourseName", this.state.CourseName);
                form.append("CourseDescription", "This will be the course description!");
                axios.post('/CourseManagement/AddCourse', form)
                location.href = "/ProfileManagement/Profile/" + pathArray[3];
                          
        }
    }


    render() {
        const listitem = {
            display: 'inline',
            color: 'blue',
            textalign: 'center',
            padding: '14px 16px',
            float: 'right'
        }
        const link = {
            color: 'black'
        }
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3];
        const { Link } = this.state
        return [


            <ul>
                <li style={listitem}><a style={link} class="active" href={'/ProfileManagement/Profile/' + x}>Home</a></li>
                <li style={listitem}><a style={link} href={'/ProfileManagement/Logout/'}>Logout</a></li>
            </ul>,

             
            <form>                             
                    <label for="CourseName">Course Name</label>
                    <input type="text" class="form-control" name="CourseName"  onChange={this.handle_Course_UI_Field_Change.bind(this)} placeholder="Course Name"></input>                 
                <AddSection ref={this.componentRef} CourseIdData={Link.courseId} SectionIdData={Link.sectionId} parentCallback={this.callbackFunction} dataFromParent={this.state.Course_has_been_Added}/>
                 <hr />
                <button type="button" class="btn btn-primary" onClick={this.handle_Course_UI_Click.bind(this)}>Add Course</button>
                </form>          
        ];

    }
}



ReactDOM.render(<CourseForm/>, document.getElementById('content'));

































































































































































































































































































































































































































































































































































































































































                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
