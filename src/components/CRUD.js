import React, { useEffect, useState, useRef } from 'react'
import Formik from "formik"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { login, product, selectedProduct, fetchTodos, selectedState, PostTodos, PutTodos, DeleteTodos } from '../reduxtoolkit/userslice';
import 'bootstrap/dist/css/bootstrap.min.css';


export const CRUD = () => {

    const dispatch = useDispatch()

    const shouldlog = useRef(true)

    dispatch(login({
        name: "raj"
    }))

    const array = useSelector(selectedProduct)

    const [loading, setloading] = useState(true)

    const [formvalue, setformvalue] = useState({
        courses: [],
        name: "",
        age: "",
        email: "",
        id: "",
        error: {
            courses: "",
            name: "",
            age: "",
            email: ""
        }
    })

    const [formError, setFormError] = useState({});

    useEffect(() => {
        if (shouldlog.current) {
            shouldlog.current = false
            dispatch(fetchTodos())
            setloading(false)
        }
    }, [])


    const update = async (id) => {
        var selecteddata = array.filter((row) => row.id == id)[0];
        await setformvalue({
            courses: selecteddata.courses.join(''),
            name: selecteddata.Name,
            email: selecteddata.email,
            id: selecteddata.id,
            age: selecteddata.age
        })
    }


    const Delete = async (id) => {
        dispatch(DeleteTodos({
            id: id
        }))
            .catch((err) => {
                toast.error(err.response.data)
            })
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        if (formvalue.id) {
            dispatch(PutTodos({
                courses: formvalue.courses.split(''),
                Name: formvalue.name,
                age: formvalue.age,
                email: formvalue.email,
                id: formvalue.id
            })).then(()=>{
                setformvalue({courses:"",name:"", age:"",email:"",id:""})
            })
                .catch((err) => {
                    toast.error(err.response.data)
                })
        }
        else {
            dispatch(PostTodos({
                courses: formvalue.courses.split(''),
                Name: formvalue.name,
                age: formvalue.age,
                email: formvalue.email
            })).then(()=>{
                setformvalue({courses:"",name:"", age:"",email:""})
            })
                .catch((err) => {
                    toast.error(err.response.data)
                })
        }
    }

    const handlechange = async (e) => {
        const name = e.target.name;
        const value = e.target.value
        e.preventDefault();
        // setformvalue((prevstate) => ({
        //     ...prevstate,
        //     [name]: value
        // }))
        setformvalue({[name]:value})
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <div class="row" >
                        <form onSubmit={onSubmit}>
                            <div class="row mt-3  ">
                                <div class="col-6 mx-auto form-group">
                                    <label for="name">Courses</label>
                                    <input name="courses" type="text" class="form-control" onChange={(e) => handlechange(e)} value={formvalue.courses} />
                                </div>
                            </div>

                            <div class="row mt-3 ">
                                <div class="col-6 mx-auto form-group">
                                    <label for="name">Name</label>
                                    <input name="name" type="text" class="form-control" onChange={(e) => handlechange(e)} value={formvalue.name} />
                                </div>
                            </div>

                            <div class="row mt-3 ">
                                <div class="col-6 mx-auto form-group">
                                    <label for="name">age</label>
                                    <input name="age" type="number" class="form-control" onChange={(e) => handlechange(e)} value={formvalue.age} /> <br></br>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-6  mx-auto form-group">
                                    <label for="name">email</label>
                                    <input name="email" type="email" class="form-control" onChange={(e) => handlechange(e)} value={formvalue.email} /> <br></br>
                                </div>
                            </div>

                            <div class="row mt-3 ">
                                <div class="col-6 mx-auto text-center">
                                    <button type='submit' class="btn btn-outline-primary">submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <div class="col-6">
                    <div class="row  mt-4">
                        <div class="col-6 mx-auto">
                            <table  >
                                <thead >
                                    <tr>
                                        <th>Courses</th>
                                        <th>Name</th>
                                        <th>age</th>
                                        <th>email</th>
                                        <th>id</th>
                                        <th colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        loading ?

                                            <div>....loading</div>

                                            : array?.map((row, i) => (
                                                <tr key={i}>
                                                    <td>{row.courses}</td>
                                                    <td>{row.Name}</td>
                                                    <td>{row.age}</td>
                                                    <td>{row.email}</td>
                                                    <td>{row.id}</td>
                                                    <td><button onClick={() => update(row.id)}>Edit</button> </td>
                                                    <td><button onClick={() => Delete(row.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
