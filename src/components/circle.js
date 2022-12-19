import React,{useRef, useState} from 'react'
import "../styles/index.css"

export const Circle = () => {

    const ele = useRef()

    const [array,setarray] =  useState([])

    const [circlevalue, setcirclevalue] = useState(0)

   const circlecolor = (i) => {

console.log(array)


    // var data = [...array];
    // data[i].classList.toggle('aftercircle');
    // setarray(data)

//     var inputele = ele.current
//     inputele.classList.toggle("aftercircle")
//     setcirclevalue(circlevalue+1)

//    if(inputele.classList == "initialcircle"){
//         setcirclevalue(circlevalue-1)
//     }
    
   }

   const Addcircle = () =>{
const abc = [...array, []]
setarray(abc)
   }


  return (
    <div >
<p>"circle no": {circlevalue}</p>
 <br></br>

 <span className='raj'>raj</span>

<button onClick={()=>Addcircle()}>Add Circle</button>

{
    array?.map((ele,i) => {
        return (
            <>
            <div>

            <span key={i} ref={ele} className='initialcircle' onClick={(e)=>circlecolor(e,i)}>circle</span>

            </div>
            </>
        )
    })
}

    </div>
  )
}
