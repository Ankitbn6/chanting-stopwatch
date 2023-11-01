// import React from 'react'

import { useEffect, useState } from "react";
import TimeItem from "./TimeItem";

const History = ({count}) => {
    const [historyData,setHistoryData]=useState([]);
    useEffect(()=>{setHistoryData(JSON.parse(localStorage.getItem("prevItems"))||[])},[count])
  return (
    <div className=" mt-12">
      {historyData.length != 0 &&
        historyData.map((ele, index) => (
          <div key={index}>
            <div className="bg-blue-500 text-white mt-2 text-2xl">
              {ele.date}
            </div>
            <div>
              {ele.data.map((el, ind) => (
                <TimeItem ele={el} index={ind} data={ele.data} key={ind+1}/>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default History;
