import React, { useState } from 'react'

export const Dropdown = () => {

    const [array, setarray] = useState([])

    const [values, setvalues] = useState(["select", "1", "2", "3", "4", "5"])

    const [val, setVal] = useState({
        data:"hi"
    })

    const adddata = (e) => {
        setVal({data:e.target.value})
        var fil = values.filter((row) => row != e.target.value)
        setvalues(fil)
        

    }

const adddropdown = () => {
    
    if(values.length > 1 ) {
        setarray([...array,[]])
    }
    
}

    return (
        <div>


            {values.length > 1 ? array?.map((row,i) => {

                return (
                    <div>
                    <select key={i}  onChange={(e) => adddata(e)}>
                        
                        {
                            values?.map((ele, i) => (
                                <option value={ele} >{ele}</option>
                            ))
                        }

                    </select>
                    </div>
                )
            })
: <>
<span>array Over</span>
</>
            }

            <button onClick={()=>adddropdown()}>Add schema</button>


        </div>
    )
}
