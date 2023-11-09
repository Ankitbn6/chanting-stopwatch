import { useContext, useEffect,useState } from "react";
import Button from "./Button";
import TimeItem from "./TimeItem";
import { ThemeContext } from "../contexts/ThemeContext";
let watchID;
const Stopwatch = ({count,setCount}) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [lock,setLock]=useState(false);
  const [checkpoints, setCheckpoints] = useState(
    JSON.parse(localStorage.getItem("lapitem")) || []
  );
  const [disableBtn,setDisableBtn]=useState(false);
  const [prevHour, setPrevHour] = useState(0);
  const [prevMinute, setPrevMinute] = useState(0);
  const [prevSecond, setPrevSecond] = useState(0);
  let str =
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second);
  const startWatch = () => {
    watchID = setInterval(() => {
      setSecond((prev) => {
        if (prev === 59) {
          setMinute((prev) => {
            if (prev === 59) {
              setHour((prev) => prev + 1);
              return 0;
            }
            return prev + 1;
          });
          return 0;
        } else return prev + 1;
      });
    }, 1000);
  };
  const cleanup = () => {
    clearInterval(watchID);
  };
  const startStopwatch = () => {
    if (!stopwatchRunning) {
      setStopwatchRunning(true);
      setLock(false);
      setDisableBtn(false);
      startWatch();
    }
  };
  const pauseStopwatch = () => {
    setStopwatchRunning(false);
    cleanup();
  };
  const refreshStopwatch = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setPrevHour(0);
    setPrevSecond(0);
    setPrevMinute(0);
    pauseStopwatch();
    setCheckpoints([]);
    let time = "00:00:00";
    localStorage.setItem("str", JSON.stringify(time));
    localStorage.setItem("lapitem", JSON.stringify([]));
  };
  const lapStopwatch = () => {
    let curSecond = second;
    let curMinute = minute;
    let curHour = hour;
    let diffSecond, diffMinute, diffHour;
    let cSum = curHour * 3600 + curMinute * 60 + curSecond;
    let pSum = prevHour * 3600 + prevMinute * 60 + prevSecond;
    let diff = cSum - pSum;
    diffHour = Math.trunc(diff / 3600);
    let hr = diff % 3600;
    diffMinute = Math.trunc(hr / 60);
    diffSecond = hr % 60;
    let diffStr =
      (diffHour < 10 ? "0" + diffHour : diffHour) +
      ":" +
      (diffMinute < 10 ? "0" + diffMinute : diffMinute) +
      ":" +
      (diffSecond < 10 ? "0" + diffSecond : diffSecond);
    setPrevHour(hour);
    setPrevMinute(minute);
    setPrevSecond(second);
    setCheckpoints([diffStr,...checkpoints]);
    storeLocally();
  };
  const storeLocally=()=>{
    localStorage.setItem("str",JSON.stringify(str));
    localStorage.setItem("lapitem",JSON.stringify(checkpoints));
  }
  const saveAndRefresh=()=>{
    let myDate=new Date();
    let todayDate=myDate.toDateString();
    let historyItem={
      date:todayDate,
      data:JSON.parse(localStorage.getItem("lapitem"))
    }
    let history=JSON.parse(localStorage.getItem("prevItems"))||[];
    let lapItems=JSON.parse(localStorage.getItem("lapitem"));
    if(history.length===0)
    {
      history.push(historyItem)}
    else if(history[0].date==todayDate)
    {
      history[0].data=lapItems.concat(history[0].data);
    }
    else if(history.length>=7)
      {
        history.splice(6,(history.length)-6);
        history.unshift(historyItem);
      }
    else
      {
        history.unshift(historyItem);}
    localStorage.setItem("prevItems",JSON.stringify(history));
    refreshStopwatch();
    setCount(count+1);
  }
  useEffect(()=>{
    storeLocally();
  },[second])
  useEffect(()=>{
    if(localStorage.getItem("prevItems") === null)
    localStorage.setItem("prevItems",JSON.stringify([]));
  },[])
  const [theme]=useContext(ThemeContext)
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
  const shadow={
    dark:{
      boxShadow:"rgba(255, 255, 255) 0px 2px 15px 10px"
    },
    light:{
      boxShadow:"rgba(4, 59, 92) 0px 5px 15px 10px"
    },
  }
  return (
    <div style={styles[theme]}  className="w-full relative pt-8">
    <div className='absolute w-full flex justify-end top-[0px] right-4'>
        {lock &&(hour != 0 || minute != 0 || second != 0) && <img className="w-[20px]" onClick={()=>{setLock(false);setDisableBtn(false)}} src={(theme==="light")?"/src/image/icons8-lock-boldBlue-50.png":"/src/image/icons8-lock-50.png"}/>}
        {!lock &&(hour != 0 || minute != 0 || second != 0) && <img className="w-[20px]" onClick={()=>{setLock(true);setDisableBtn(true)}} src={(theme==="light")?"/src/image/icons8-unlock-boldBlue-50.png":"/src/image/icons8-unlock-white-50.png"}/>}
        </div>
      <div style={shadow[theme]} className="  rounded-full h-[250px] w-[250px] m-auto mb-5  flex items-center justify-center">
      <h1  className="text-5xl">{str}
      </h1>
      </div>
      <br />
      <div className="flex justify-center mt-4 ">{(hour != 0 || minute != 0 || second != 0) && (
          <Button onClick={refreshStopwatch} disabled={disableBtn}>Refresh</Button>
        )}
        <Button onClick={stopwatchRunning ? pauseStopwatch : startStopwatch} disabled={disableBtn }>
          {stopwatchRunning ? "Pause" : "Play"}
        </Button>
        {(hour != 0 || minute != 0 || second != 0) && (
          <Button onClick={lapStopwatch} disabled={disableBtn}>lap</Button>
        )}
        </div>
      {(checkpoints.length!=0)&&<div style={styles[theme]} className="mt-8 bg-blue-100 p-2  rounded-lg">
      
      {checkpoints.map((ele,index)=><TimeItem data={checkpoints} ele={ele} key={index+1} index={index}/>)}
      </div>}
      {(checkpoints.length!=0)&&(<div  className="mt-12">
        <Button onClick={saveAndRefresh} disabled={disableBtn}>Save & Refresh</Button>
      </div>)}
      </div>
  );
};

export default Stopwatch;
