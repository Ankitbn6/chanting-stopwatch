// import React from 'react'

import { useEffect, useState } from "react";
import TimeItem from "./TimeItem";
import Button from "./Button";

const History = ({count}) => {
    const [historyData,setHistoryData]=useState([]);
    const [popup,setPopup]=useState(false);
    const clearAll=()=>{
      localStorage.setItem("prevItems",JSON.stringify([]));
      setHistoryData([]);
    }
    let history=JSON.parse(localStorage.getItem("prevItems"))||[];
    useEffect(()=>{setHistoryData(JSON.parse(localStorage.getItem("prevItems"))||[])},[count])
  return (
    <div className=" mt-12 relative ">
      {historyData.length != 0 &&
        historyData.map((ele, index) => (
          <div key={index}>
            <div className=" bg-blue-500 rounded-lg p-2 text-white mt-2 text-2xl">
              {ele.date}
            </div>
            <div className="bg-blue-100 p-2 m-2 rounded-lg">
              {ele.data.map((el, ind) => (
                <TimeItem ele={el} index={ind} data={ele.data} key={ind+1}/>
              ))}
            </div>
          </div>
        ))}
      {popup && <div className="">
        <div className="absolute bottom-[0px] text-center p-5 ml-auto mr-auto left-0 right-0 rounded-lg border-2  shadow-[0_35px_400px_rgba(0,0,0,1)] bg-white">
        <div className="text-xl">You want to delete all History</div>
        <div className="mt-6">
          <Button onClick={()=>{setPopup(false);clearAll()}} >OK</Button>
          <Button onClick={()=>{setPopup(false)}}>Cancel</Button>
        </div>
      </div>
      </div>}
      { history.length!=0 && <div onClick={()=>{setPopup(true)}} className="bg-red-500 cursor-pointer  text-white w-[100px] p-1 text-xl m-auto rounded-lg mt-12">Clear All</div>}
    </div>
  );
};

export default History;
