import React from "react";

const TimeItem = ({data,ele,index,key}) => {
  return (
    <div key={index+1} className="flex justify-between items-center text-sm w-[80%]  mt-3 m-auto ">
      <div className="text-sm">{data.length - index}</div>
      <div className="text-2xl">{ele}</div>
    </div>
  );
};

export default TimeItem;
