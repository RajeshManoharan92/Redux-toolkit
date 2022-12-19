import React, { useState, useEffect, useRef, useId  } from 'react'
import axios from "axios"
import { Formik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectUser } from '../reduxtoolkit/userslice';



export const Ratlab = () => {
  const [array, setarray] = useState([]);

  const [counter, setcounter] = useState(0)

  const shouldlog = useRef(true)

  useEffect(()=>{
    if (shouldlog.current) {
        shouldlog.current = false
        axios.get('https://62053f31161670001741b6db.mockapi.io/ratlab').then((res)=>setarray(res.data))
        
    }
  },[])

  const [formvalue, setformvalue] = useState({
    p:"",
    f:"",
    name1:"",
    name2:""
  })

  const validate = (formData)=>{
    var errors = {}
    if (formData.p == "") errors.p = "Name is required";
   if (formData.f == "") errors.f = "User Id is required";
    return errors;
  }


  const [formvalue1, setformvalue1] = useState({
    name1:"",
    name2:""
  })


  const validate1 = (formData)=>{
    var errors = {}
    if (formData.name1 == "") errors.name1 = "Name is required";
   if (formData.name2 == "") errors.name2 = "User Id is required";
    return errors;
  }


  const onSubmit = (formData)=>{
    console.log(formData)
    axios.post('https://62053f31161670001741b6db.mockapi.io/ratlab',{
        person:formData.p,
        friend:formData.f
    }).then((res)=>setarray([...array,res.data]))
   
}

const onSubmit1 = (formData)=>{
    console.log(formData)
    var selecteddata = array.filter((row) => row.person == formData.name1);
    
   var test = selecteddata.map((data) => 
    {
       return array.filter((row)=>row.friend ==  formData.name2);
    })
    console.log(test)


//     var selecteddata1 = array.filter((row) => row.friend == formData.name2);  
//    console.log(selecteddata1)

    //   var selectedfriend =array.filter((row)=>row.person == selecteddata.friend);
    // // var selectedfriend1 =array.filter((row)=>row.person == selecteddata1.friend);
    //  console.log(selectedfriend)



}


  
  return (
    
    <div id="sub_admin_page">
      
      <main>
        <div class="container-fluid">
          <div class="container">
            
            <div class="form_section">
              <div class="sub_page_form">
                <h4>Create User</h4>
                <Formik
                  enableReinitialize
                  initialValues={formvalue}
                  validate={(formData) => validate(formData)}
                  onSubmit={(formData) => onSubmit(formData)}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (


                    <form onSubmit={handleSubmit} class="form-inline">
                      <div class="form-group col-md-4 col-sm-6">
                        <label for="Name">Person Name</label>
                        <img class="form_icon" src="assets/images/form_icon_user.png" alt="" />
                        <input type="text" name="p" class="form-control" id="Name" placeholder="Enter Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.p}
                        /> <span  style={{ color: "red" }}>{errors.p && touched.p && errors.p}</span>
                      </div>
                      <div class="form-group col-md-4 col-sm-6">
                        <label for="Email" >Friend Name</label>
                        <img class="form_icon" src="assets/images/form_icon_mail.png" alt="" />
                        <input type="text" name="f" class="form-control" id="Email" placeholder="Enter Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.f} /> <span style={{ color: "red" }}>{errors.f && touched.f && errors.f}</span>
                      </div>
                      <button type="submit">submit</button>

                    </form>
                  )}
                </Formik>
              </div>
            </div>

            <div class="form_section">
              <div class="sub_page_form">
                <h4>Create User</h4>
                <Formik
                  enableReinitialize
                  initialValues={formvalue1}
                  validate={(formData) => validate1(formData)}
                  onSubmit={(formData) => onSubmit1(formData)}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (


                    <form onSubmit={handleSubmit} class="form-inline">
                      <div class="form-group col-md-4 col-sm-6">
                        <label for="Name">Name1</label>
                        <img class="form_icon" src="assets/images/form_icon_user.png" alt="" />
                        <input type="text" name="name1" class="form-control" id="Name" placeholder="Enter Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name1}
                        /> <span  style={{ color: "red" }}>{errors.name1 && touched.name1 && errors.name1}</span>
                      </div>
                      <div class="form-group col-md-4 col-sm-6">
                        <label for="Email" >Name2</label>
                        <img class="form_icon" src="assets/images/form_icon_mail.png" alt="" />
                        <input type="text" name="name2" class="form-control" id="Email" placeholder="Enter Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name2} /> <span style={{ color: "red" }}>{errors.name2 && touched.name2 && errors.name2}</span>
                      </div>
                      <button type="submit">submit</button>

                    </form>
                  )}
                </Formik>
              </div>
            </div>




          </div>
          <div class="container ">
            <div class="col-md-12 table_section">
              <div class="row table_box">
                <h4>List of Users</h4>
                <table class="table">
                  <thead>
                    <tr >
                      <th scope="col">person</th>
                      <th scope="col">friend</th>
                      
                    </tr>
                  </thead>
                  <tbody>

                    

                    { array?.map((row, i)=>(
                        <tr key={i}>
 <td>{row.person} </td>
 <td>{row.friend} </td>
 </tr>
                    ))
                    

                    
                  }


                   
                  </tbody>
                </table>

                <div class="table_pagination col-md-12">
                <p className="float-left pagination_text">
             
            </p>
                  <ul class="pagination float-right">
                  
                  
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
<ToastContainer></ToastContainer>
    </div>
  )
}
