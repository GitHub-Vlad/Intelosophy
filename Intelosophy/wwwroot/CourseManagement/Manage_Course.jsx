
//Manage Course
class ManageCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Course: [],
            CourseName: "",
            CourseDescription: ""
        }
 
      
        this.handle_Course_UI_Click = this.handle_Course_UI_Click.bind(this);
       
    }


    componentDidMount() {
        
        var pathArray = window.location.pathname.split('/');
        axios.get('/CourseManagement/Load_CourseUI/' + pathArray[3]).then(res => {
            this.setState({ Course: res.data });
        });
    }

    handle_Course_UI_Click(s) {
        var pathArray = window.location.pathname.split('/');
        window.location.href = '/CourseManagement/Update_Course/' + pathArray[3] + '-' + s.courseid;
    }


    render() {

          

       const listitem = {
            display: 'inline',
            color: 'blue',
            textalign:'center',
           padding: '14px 16px',
           float: 'right'
        }
        const link = {
             color: 'black'
        }
        var pathArray = window.location.pathname.split('/');
        var x = pathArray[3];
        return [
            
          
                
            <ul>
                <li style={listitem}><a style={link} class="active" href={'/ProfileManagement/Profile/' + x}>Home</a></li>
                <li style={listitem}><a style={link} href={'/ProfileManagement/Logout/'}>Logout</a></li>              
            </ul>,
      
                
            this.state.Course.map((el, i) => (
                <div key={i} >
                    <div class="row pb-4 mx-0">
                        <div class="card">
                            <div class="row no-gutters">
                                <div class="col-3">
                                    <img src="https://picsum.photos/250/250" class="card-img" alt="Profile Picture"></img>
                                </div>
                                <div class="col-9">
                                    <div class="card-body">
                                            <h2 class="card-title" name="courseName" Value={el.courseName}>{el.courseName}</h2>
                                            <button type="button" class="btn btn-primary btn-lg btn-block" onClick={() => this.handle_Course_UI_Click(el)}>Edit Course</button>
                                        </div>
                                    </div>
                                </div>                      
                    </div>
                    </div>
                </div>
               

            ))
        ];
        }
    }


ReactDOM.render(<ManageCourse />, document.getElementById('content'));

//<p name="courseDescription" Value={el.courseDescription}>{el.courseDescription}</p>



































































































































































































































































































































































































































































































































































































































































                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
