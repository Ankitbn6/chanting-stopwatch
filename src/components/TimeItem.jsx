import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const TimeItem = ({data,ele,index,key}) => {
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
    <div key={index+1} style={styles[theme]} className="flex {theme} justify-between items-center text-sm w-[80%]  mt-3 m-auto ">
      <div className="text-sm">{data.length - index}</div>
      <div className="text-2xl">{ele}</div>
    </div>
  );
};

export default TimeItem;
