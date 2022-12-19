import React, { useEffect, useState,useRef } from 'react'
import { Row } from 'react-bootstrap'

export const Fetch = () => {

const loading = useRef(true)
 const [array, setarray] = useState([])   

useEffect(()=>
{
if(loading.current){
  loading.current = false
  getData()
}


})

const getData = async () => {
  var response = await fetch("https://62053f31161670001741b6db.mockapi.io/users")
  .then((res)=> res.json())
  .then((data)=>setarray(data))
  .catch((err)=>console.log(err))

}



  return (
    <div>

<ul>
  {
    array?.map((row,i) => (
      
       <li key={i}>{row.Name}</li>
    
       )   )
  }
</ul>

    </div>

    


  )
}
