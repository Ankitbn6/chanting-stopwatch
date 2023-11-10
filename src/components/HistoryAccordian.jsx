import { useContext, useState } from 'react'
import TimeItem from './TimeItem'
import { ThemeContext } from '../contexts/ThemeContext';

const HistoryAccordian = ({ele,index}) => {
    const [show,setShow]=useState(false);
    const [theme]=useContext(ThemeContext);
  const styles = {
    dark: {
      background: "black",
      color: "white"
    },
    light: {
      background: "white",
      color: "black"
    },
  };
  return (
    <div key={index}>
            <div onClick={()=>{setShow(!show)}} className=" bg-blue-500 rounded-lg p-2 text-white mt-2 text-2xl">
              {ele.date}
            </div>
             <div style={styles[theme]} className="bg-blue-100 p-2 m-2 rounded-lg">
              {show && ele.data.map((el, ind) => (
                <TimeItem ele={el} index={ind} data={ele.data} key={ind+1}/>
              ))}
            </div>
    </div>
  )
}

export default HistoryAccordian
