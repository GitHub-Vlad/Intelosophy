
//Add lesson component
class LessonUI extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.LessonForm = null;
        this.state = {
            Lesson: [{ lessonName: "", lessonDescription: "", fileUpload: "" }],
            //Variable which holds the Uploaded file name
            file_name: "",
            section_id: "",
            lesson_name: "",
            lesson_description: ""
        }

        this.handle_Lesson_UI_Click = this.handle_Lesson_UI_Click.bind(this);
        this.Validate_LessonUI_Form = this.Validate_LessonUI_Form.bind(this);
    } 
    onClearLesson = () => {
        this.state.lessonName = "";
        this.state.lessonDescription = "";
        this.setState({ Lesson: [{ lessonName: "", lessonDescription: "", fileUpload: "" }] });         
    };

    //Handles state changes of all fields in the Lesson UI component
    handle_Lesson_UI_FieldChange(i, e) {
        const { name, value } = e.target;
        let Lesson = [...this.state.Lesson];
        Lesson[i] = { ...Lesson[i], [name]: value };
        this.setState({ Lesson });
        this.setState({ [event.target.name]: event.target.value });
    }

    // Lesson UI File Upload Event
    handle_LessonUI_FileChange = e => {

      if (e.target.files[0].name.includes(".pdf") || e.target.files[0].name.includes(".mp4"))
         this.state.file_uploaded = "Yes";
        file_name = e.target.files[0];
        this.sendLessonName();
        this.sendLessonDescription();
     
    }

    //Validates the Lesson UI Form from the Lesson UI Form
    Validate_LessonUI_Form() {

        if (this.state.lessonName === "" || this.state.lessonName === undefined)
            alert("Please add a LessonName!");
        else if (this.state.lessonDescription === "" || this.state.lessonDescription === undefined)
            alert("Please add a LessonDescription!");
        else if (this.state.file_uploaded === "No")
            alert("Please upload a file!");
    }

       //This is done when collecting (adding) a lesson to an already existing Section.
    LessonUI_Fill_LessonForm() {
        var pathArray = window.location.pathname.split('/');
        this.LessonForm = new FormData();
        //We are adding an New Section and a New Lesson
        if (this.props.AddNewSectionAndNewLesson === "Yes") {
            if (file_name.name.includes(".pdf")) {               
                this.state.file_uploaded = "Yes";
                this.LessonForm.append("file", file_name);
                this.LessonForm.append("CourseId", pathArray[3]);
                this.LessonForm.append("SectionId", "");
                this.LessonForm.append("LessonName", lesson_name);
                this.LessonForm.append("LessonDescription", lesson_description);
                this.LessonForm.append("VideoName", "None");
                this.LessonForm.append("VideoDescription", "None");
                this.LessonForm.append("TextName", "This is a PDF File!");
                this.LessonForm.append("TextDescription", file_name.name);
                return this.LessonForm;
            }
            else if (file_name.name.includes(".mp4")) {
                this.state.file_uploaded = "Yes";
                this.LessonForm.append("file", file_name);
                this.LessonForm.append("CourseId", pathArray[3]);
                this.LessonForm.append("SectionId", "");
                this.LessonForm.append("LessonName", lesson_name);
                this.LessonForm.append("LessonDescription", lesson_description);
                this.LessonForm.append("VideoName", "None");
                this.LessonForm.append("VideoDescription", "None");
                this.LessonForm.append("TextName", "This is a PDF File!");
                this.LessonForm.append("TextDescription", file_name.name);
                return this.LessonForm;
            }
        }
        else
        {
            if (file_name.name.includes(".pdf")) {
                this.state.file_uploaded = "Yes";
                this.LessonForm.append("file", file_name);
                this.LessonForm.append("CourseId", pathArray[3]);
                this.LessonForm.append("SectionId", section_id);
                this.LessonForm.append("LessonName", lesson_name);
                this.LessonForm.append("LessonDescription", lesson_description);
                this.LessonForm.append("VideoName", "None");
                this.LessonForm.append("VideoDescription", "None");
                this.LessonForm.append("TextName", "This is a PDF File!");
                this.LessonForm.append("TextDescription", file_name.name);
                return this.LessonForm;
            }
            else if (file_name.name.includes(".mp4")) {
                this.state.file_uploaded = "Yes";
                this.LessonForm.append("file", file_name);
                this.LessonForm.append("CourseId", pathArray[3]);
                this.LessonForm.append("SectionId", section_id);
                this.LessonForm.append("LessonName", lesson_name);
                this.LessonForm.append("LessonDescription", lesson_description);
                this.LessonForm.append("VideoName", "None");
                this.LessonForm.append("VideoDescription", "None");
                this.LessonForm.append("TextName", "This is a PDF File!");
                this.LessonForm.append("TextDescription", file_name.name);
                return this.LessonForm;

            }
        }
    }

    //This is done when collecting(adding) lesson(s) for a New Section.
    handle_AddTo_LessonUI_Form() {
        //// Write the Lesson to the DB. 
        var pathArray = window.location.pathname.split('/');
        if (file_name.name.includes(".pdf")) {
            this.state.file_uploaded = "Yes";
            LessonForm = new FormData();
            // let LessonForm = new FormData();
            LessonForm.append("file", file_name);
            LessonForm.append("CourseId", pathArray[3]);
            LessonForm.append("SectionId", "");
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
            LessonForm.append("CourseId", pathArray[3]);
            LessonForm.append("SectionId", "");
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

    handle_Lesson_UI_Click() {
        //We are adding an New Section and a New Lesson
        if (this.props.AddNewSectionAndNewLesson === "Yes")
        {           
            lesson_name = this.state.lessonName;
            lesson_description = this.state.lessonDescription;

            if (this.state.lessonName === "" || this.state.lessonName === undefined)
                alert("Please add a LessonName!");
            else if (this.state.lessonDescription === "" || this.state.lessonDescription === undefined)
                alert("Please add a LessonDescription!");
            else if (this.state.file_uploaded === "No")
                alert("Please upload a file!");
            else
            {
                //for (var i = 0; i <= this.state.Lesson.length - 1; i++) {

                //    this.refs[i + 'Add_button'].style.visibility = "hidden";
                //    this.refs[i + 'lesson_Name'].disabled = true;
                //    this.refs[i + 'lesson_Description'].disabled = true;
                //}

                this.handle_AddTo_LessonUI_Form();

                this.setState(prevState => ({
                    Lesson: [...prevState.Lesson, { lessonName: " ", lessonDescription: " ", fileUpload: " " }]
                }));

              
                //this.state.lessonName = "";
                //this.state.lessonDescription = "";
                //this.state.file_uploaded = "No";
               
            }                             
        }

        //We are adding a New Lesson to an already existing Section
        else
        {              
            lesson_name = this.state.lessonName;
            lesson_description = this.state.lessonDescription;
            section_id = this.props.sectionIdParent;
            if (this.state.lessonName === "" || this.state.lessonName === undefined)
                alert("Please add a LessonName!");
            else if (this.state.lessonDescription === "" || this.state.lessonDescription === undefined)
                alert("Please add a LessonDescription!");
            else if (this.state.file_uploaded === "No")
                alert("Please upload a file!");
            else
            {
                this.props.RefreshLessonView();
                this.onClearLesson();
            }                                       
        }
    }
    render() {          
        return this.state.Lesson.map((el, i) => (
            <div key={i} >
                <li class="list-group-item bg-light" >
                    <div class="row">
                        <div class="col-sm">
                            <label for="LessonName1">Lesson Name</label>
                            <input type="text" ref={i + 'lesson_Name'} class="form-control" name="lessonName"  value={el.lessonName || ''} onChange={this.handle_Lesson_UI_FieldChange.bind(this, i)}></input>
                        </div>
                        <div class="col-sm" >
                            <label for="LessonDesc1">Lesson Description</label>
                            <textarea class="form-control" rows="2" name="lessonDescription" ref={i + 'lesson_Description'} value={el.lessonDescription || ''} onChange={this.handle_Lesson_UI_FieldChange.bind(this, i)} ></textarea>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label for="FileUpload1">File Upload</label>
                              <input type="file" id = "file" class="form-control-file" name="File" ref={i + 'file_upload'} onChange={this.handle_LessonUI_FileChange}></input>
                            
                            </div>
                        </div>
                    </div>
                </li>
                <button type="button" class="btn btn-primary" ref={i + 'Add_button'}  onClick={this.handle_Lesson_UI_Click.bind(this)}>Add Lesson</button>
            </div>
        ));
    }
}

////Add Section component
class SectionUI extends React.Component {
    constructor(props) {
        super(props)
        this.componentRef = React.createRef()
        this.SectionForm = null;
        this.state = {
            Section: [{ sectionName: "", lessonName: "", lessonDescription: "", fileUpload: "" }],
            AddLesson: "Yes"
        }    
        this.handle_Section_UI_Field_Change = this.handle_Section_UI_Field_Change.bind(this);
        this.handle_Section_UI_Click = this.handle_Section_UI_Click.bind(this);
        this.Validate_SectionUI_Form = this.Validate_SectionUI_Form.bind(this);
    }
    onClearSection = () => {
        this.setState({ Section: [{ sectionName: "", lessonName: "", lessonDescription: "", fileUpload: "" }]});
    };
   
    //Validates the Section UI Form to check if it was filled
    Validate_SectionUI_Form()
    {     
        if (this.state.sectionName === "" || this.state.sectionName === undefined)
            alert("Please enter a Section Name!");
    }

    //Handles state changes of all fields in the Section UI component
    handle_Section_UI_Field_Change(i, e) {
        const { name, value } = e.target;
        let Section = [...this.state.Section];
        Section[i] = { ...Section[i], [name]: value };
        this.setState({ Section });
        this.setState({ [event.target.name]: event.target.value });     
    }

    // Add section Button click Event
     handle_Section_UI_Click()
     {  
         this.Validate_SectionUI_Form();
         this.componentRef.current.handle_AddTo_LessonUI_Form();

         SectionForm = new FormData();
         SectionForm.append("CourseId", this.props.CourseIdData);
         SectionForm.append("SectionId", this.props.SectionIdData);
         SectionForm.append("SectionName", this.state.sectionName);
         SectionForm.append("SectionDescription", "This will be the section description!");
         axios.post('/CourseManagement/Add_Section', SectionForm);
         this.props.RefreshSectionView();           
        ////3.Clear both the Section and Lesson objects
         this.onClearSection();
         this.componentRef.current.onClearLesson(); 
        
            
    }
   
    render() {      
        return this.state.Section.map((el, i) => (
            <div key={i}>
                <li class="list-group-item">
                    <div class="form-group">
                        <label for="SectionName">Section Name</label>
                        <input type="text" class="form-control" name="sectionName" ref={i + 'section_Name'} value={el.sectionName || ''} onChange={this.handle_Section_UI_Field_Change.bind(this, i)} placeholder="Section Name"></input>
                    </div>
                    <li class="list-group-item bg-light">
                        <LessonUI ref={this.componentRef} CourseID={this.props.CourseParent} AddNewSectionAndNewLesson={this.state.AddLesson}  ClearSection={this.onClearSection}></LessonUI>

                    </li>
                </li>
                <button type="button" class="btn btn-primary" ref={i + 'section_btn'} onClick={this.handle_Section_UI_Click.bind(this, i)}>Add Section</button>
            </div>
        ));
    }
}

//Display Course Details
class DisplayCourseDetails extends React.Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef()
        this.componentRef1 = React.createRef()
        this.RefreshLessonView = this.RefreshLessonView.bind(this);
        this.RefreshSectionView = this.RefreshSectionView.bind(this);           
        this.state = {
            course_id: " ",
            section_id: "",
            CourseView:[],
            SectionView: [],
            LessonView: [],
            CourseName: " ",
            SectionName: " ",
            LessonName: "",
            LessonDescription: "",       
            TextFile: "",
            intervalID:null
        }
        this.handle_DisplayPDF = this.handle_DisplayPDF.bind(this);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeSectionName = this.onChangeSectionName.bind(this);
        this.onChangeLessonName = this.onChangeLessonName.bind(this);
        this.onChangeLessonDescription = this.onChangeLessonDescription.bind(this);
        this.handle_EditCourse_Click = this.handle_EditCourse_Click.bind(this);
        this.handle_RemoveCourse_Click = this.handle_RemoveCourse_Click.bind(this);
        this.handle_EditSection_Click = this.handle_EditSection_Click.bind(this);
        this.handle_RemoveSection_Click = this.handle_RemoveSection_Click.bind(this);
        this.handle_EditLesson_Click = this.handle_EditLesson_Click.bind(this);
        this.handle_RemoveLesson_Click = this.handle_RemoveLesson_Click.bind(this);     
    }

    //This will automatically update the Lesson and Section component every 5 seconds.
    componentWillMount() {
        const id = setInterval(this.UpdateUI, 5000);
        this.setState({ intervalID: id });
        this.UpdateUI();
    }

    componentWillUnmount() {
      
        clearInterval(this.state,intervalID);
    }
    UpdateUI = () => {
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3].split('-');
        this.state.course_id = x[1];
        ////LoadSectionUI
        axios.get('/CourseManagement/Load_SectionUI/' + x[1]).then(res => {
            this.setState({ SectionView: res.data });
        });
        ////Load LessonUI
        axios.get('/CourseManagement/Load_LessonUI/' + x[1]).then(res => {
            this.setState({ LessonView: res.data });
        });

    }

    //This function refreshes after the addition of a new Lesson to an already existing section
   RefreshLessonView() {
        // Extract section id
        for (var pair of this.componentRef.current.LessonUI_Fill_LessonForm().entries())
        {           
            if (pair[0] === "SectionId")
            {          
                section_id = pair[1];              
            }           
        }
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3].split('-');
        // Add LessonUI Fields to DB
        axios.post('/CourseManagement/Add_Lesson_Update_Course', this.componentRef.current.LessonUI_Fill_LessonForm())
            .then(response => {
                console.log(response.data); //need to be your new "user" from server response
                //You can send your "get" request again to update your component state
                axios.get('/CourseManagement/Load_LessonUI/' + x[1]).then(res => {
                    this.setState({ LessonView: res.data });
                })
            });       
    }

     //This function refreshes after the addition of a new Section.
    RefreshSectionView() {
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3].split('-');
        this.state.course_id = x[1];
        ////LoadSectionUI
        axios.get('/CourseManagement/Load_SectionUI/' + x[1]).then(res => {
            this.setState({ SectionView: res.data });
        });
        ////Load LessonUI
        axios.get('/CourseManagement/Load_LessonUI/' + x[1]).then(res => {
            this.setState({ LessonView: res.data });
        });
    }
    //Retrieves user input into the Course Name Text field
    onChangeCourseName(e) {
        this.setState({
            CourseName: e.currentTarget.textContent
        });      
    }

    //Retrieves user input into the Section Name Text field
    onChangeSectionName(e) {
        this.setState({

            SectionName: e.currentTarget.textContent
        });  
    }

    //Retrieves user input into the Lesson Name Text field
    onChangeLessonName(e) {
        this.setState({           
            LessonName: e.target.value
        });     
    }

    //Retrieves user input into the Lesson Description Text field
    onChangeLessonDescription(e) {
        this.setState({
          LessonDescription: e.target.value

        });
    }

    componentDidMount() {
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3].split('-');    
        this.state.course_id = x[1];    
        ////LoadSectionUI
        axios.get('/CourseManagement/Load_SectionUI/' + x[1]).then(res => {
            this.setState({ SectionView: res.data });
        });
        ////Load LessonUI
        axios.get('/CourseManagement/Load_LessonUI/' + x[1]).then(res => {
            this.setState({ LessonView: res.data });
        });
        //Load Course
        axios.get('/CourseManagement/Retrieve_Course/' + x[1]).then(res => {
            this.setState({ CourseView: res.data });
        });
    }
    //Displays Thumbnail
    Display_PDF_Thumbnail(l) {

        var pdfData = atob(
            l.textFile)
        //// Loaded via <script> tag, create shortcut to access PDF.js exports.
        var pdfjsLib = window['pdfjs-dist/build/pdf'];

        //// The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        //// Using DocumentInitParameters object to load binary data.
        var loadingTask = pdfjsLib.getDocument({ data: pdfData });
        loadingTask.promise.then(function (pdf) {
            console.log('PDF loaded');

            // Fetch the first page
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page) {
                var scale = 0.10;
                var viewport = page.getViewport({ scale: scale });
                // Prepare canvas using PDF page dimensions
                var canvas = document.getElementById(l.lessonName + 'the-canvas');
                var context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                //    renderTask.promise.then(function () {
            });
        });
    }

    //Edits Lesson
    handle_EditLesson_Click = (l) => () => {
        const obj = {
            Id: l.lessonId,
            LessonName: this.state.LessonName,
            LessonDescription: this.state.LessonDescription
        }
        axios.post('/CourseManagement/Edit_Lesson/' + obj.Id, obj)
            .then(response => {
                console.log(response.data); //need to be your new "user" from server response
                //You can send your "get" request again to update your component state
                axios.get('/CourseManagement/Load_LessonUI/' + pathArray[3]).then(res => {
                    this.setState({ LessonView: res.data });
                })
            });
    }
    //Removes Lesson
    handle_RemoveLesson_Click = (l) => () => {
        const obj = {
            Id: l.lessonId,
            LessonName: this.state.LessonName,
            LessonDescription: this.state.LessonDescription
        }
 
        var pathArray = window.location.pathname.split('/');
        this.state.course_id = pathArray[3];
        var x = pathArray[3].split('-');
        axios.post('/CourseManagement/Remove_Lesson/' + obj.Id, obj)
            .then(response => {
                console.log(response.data);
                axios.get('/CourseManagement/Load_LessonUI/' +x[1]).then(res => {
                    this.setState({ LessonView: res.data })
                });
                });
    }

  handle_EditSection_Click = (s) => () => { 
        const obj = {
            Id: s.sectionid,
            SectionName: this.state.SectionName,
        }
        axios.post('/CourseManagement/Edit_Section/' + obj.Id, obj)
            .then(response => {
                console.log(response.data); //need to be your new "user" from server response
                //You can send your "get" request again to update your component state
                axios.get('/CourseManagement/Load_SectionUI/' + pathArray[3]).then(res => {
                    this.setState({ SectionView: res.data });
                })
            });
    }
    //Removes Section
    handle_RemoveSection_Click = (s) => () => {
        const obj = {
            Id: s.sectionid,
            SectionName: this.state.SectionName
        }
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3].split('-');
        this.state.course_id = x[1];
        axios.post('/CourseManagement/Remove_Section/' + obj.Id, obj)
            .then(response => {
                console.log(response.data); //need to be your new "user" from server response
                //You can send your "get" request again to update your component state
                axios.get('/CourseManagement/Load_SectionUI/' + x[1]).then(res => {
                    this.setState({ SectionView: res.data });
                })
                axios.get('/CourseManagement/Load_LessonUI/' + x[1]).then(res => {
                    this.setState({ LessonView: res.data });
                })
            });      
    }
    //Edits Course
    handle_EditCourse_Click () {
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3].split('-');       
        const obj = {
            Id: x[1],
            CourseName: this.state.CourseName
        }    
        axios.post('/CourseManagement/Edit_Course/' + obj.Id, obj)
            .then(response => {
                console.log(response.data); //need to be your new "user" from server response

            });
    }

    //Removes Course
    handle_RemoveCourse_Click() {
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3].split('-');
        const obj = {
            Id: x[1],
            CourseName: this.state.CourseName
        }      
        axios.post('/CourseManagement/Remove_Course/' + obj.Id,obj);
        location.href = "/ProfileManagement/Profile/" + x[0];
    }
    handle_DisplayPDF = (l) => () => {
        if (l.textName.includes(".mp4")) {
            window.open('https://player.vimeo.com/video/' + l.videoId);
        }
        if (l.textName.includes(".pdf")) {         
            var pdfAsDataUri = "data:application/pdf;base64," + l.textFile;
            window.open(pdfAsDataUri);
        }
    }
    render() {
        const canvas = {
            border: '1px solid black'
        };
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
        var x = pathArray[3].split('-');
        this.state.course_id = x[0];
        const { CourseView } = this.state
        return [
            <ul>
                <li style={listitem}><a style={link} class="active" href={'/ProfileManagement/Profile/' + x[0]}>Home</a></li>
                <li style={listitem}><a style={link} href={'/ProfileManagement/Logout/'}>Logout</a></li>
            </ul>,
            <h1 contenteditable="true" defaultValue={CourseView.courseName} onInput={this.onChangeCourseName}>{CourseView.courseName}</h1>,
            <div>
                <button type="button" class="btn btn-danger" onClick={this.handle_EditCourse_Click}>Edit Course</button>
                <button type="button" class="btn btn-danger" onClick={this.handle_RemoveCourse_Click}>Remove Course</button>
            </div>,
            this.state.SectionView.map((section, i) => {
                return (
                    <div key={i} >
                        <ul class="list-group mb-3">
                            <li class="list-group-item">
                                <h2 contenteditable="true" defaultValue={section.sectionName} onInput={this.onChangeSectionName}>{section.sectionName}</h2>
                                {this.state.LessonView.map((lesson, j) => {
                                    if (lesson.sectionId === section.sectionid)
                                        return (<div key={j}>
                                            <ul class="list-group mb-3">
                                                <li class="list-group-item bg-light">
                                                    <div class="row">
                                                        <div class="col-30">
                                                            <label for="LessonName2_1">Lesson Name</label>
                                                            <input type="text" class="form-control" onChange={this.onChangeLessonName} defaultValue={lesson.lessonName || ''} id="LessonName2_1"></input>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label for="LessonDesc2_1">Lesson Description</label>
                                                            <textarea class="form-control" onChange={this.onChangeLessonDescription} defaultValue={lesson.lessonDescription || ''} id="LessonDesc2_1" rows="2"></textarea>
                                                        </div>
                                                        <div class="col-sm">
                                                            {lesson.textName.includes(".pdf") ? <canvas style={canvas} id={lesson.lessonName + 'the-canvas'} onload={this.Display_PDF_Thumbnail(lesson)} onClick={this.handle_DisplayPDF(lesson)} width="100" height="100" />
                                                                : <img src={'https://i.vimeocdn.com/video/' + lesson.pictureId + '.jpg'} onClick={this.handle_DisplayPDF(lesson)} width="100" height="100" />}
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="btn-group" role="group" aria-label="Lesson Buttons">
                                                            <button type="button" class="btn btn-danger" onClick={this.handle_EditLesson_Click(lesson)} >Edit Lesson </button>
                                                            <button type="button" class="btn btn-danger" onClick={this.handle_RemoveLesson_Click(lesson)} >Delete Lesson</button>
                                                        </div>
                                                    </div>
                                            </li>
                                            </ul>
                                        </div>)
                                }
                                )
                               }
                             <LessonUI CourseIdParent={section.courseid} sectionIdParent={section.sectionid} ref={this.componentRef} RefreshLessonView={this.RefreshLessonView}></LessonUI>
                            </li>
                        </ul>
                        <button type="button" class="btn btn-danger" onClick={this.handle_EditSection_Click(section)}>Edit Section</button>
                        <button type="button" class="btn btn-danger" onClick={this.handle_RemoveSection_Click(section)}>Delete Section</button>
                    </div>
                )                
            }),

            
            <div> <SectionUI CourseParent={this.state.course_id} ref={this.componentRef1}  RefreshSectionView={this.RefreshSectionView}></SectionUI></div>
        ];
                         
       
      
    }
}        
            
             

ReactDOM.render(<DisplayCourseDetails/>, document.getElementById('content'));












































































































































































































































































































































































































































































































































































































































































                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
