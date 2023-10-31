import React, { useState } from 'react'
import Button from './Button';
let watchID=null;
const Stopwatch1 = () => {
    const [hour,setHour]=useState(0);
    const [minute,setMinute]=useState(0);
    const [second,setSecond]=useState(0);

    const startWatch=()=>{
        watchID=setInterval(()=>{
            setSecond((prev) => {
                if (prev === 10)
                {
                    setMinute((prev)=>{
                        if(minute==2)
                        {
                            setHour((prev)=>prev+1);
                            return 0;
                        }
                        return prev+1;
                    })
                    return 0
                }
                else return prev + 1;
            });
            
        },1000)
    }
    const stopWatch=()=>{
        clearInterval(watchID);
    }
    const refreshWatch=()=>{
        clearInterval(watchID);
        setSecond(0);
        setMinute(0);
        setHour(0);
    }
  return (
    <div>
      <h1>{hour}:{minute}:{second}</h1>
      <Button onClick={startWatch}>Start</Button>
      <Button onClick={stopWatch}>Stop</Button>
      <Button onClick={refreshWatch}>Refresh</Button>
    </div>
  )
}

export default Stopwatch1
