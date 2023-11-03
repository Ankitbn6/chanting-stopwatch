import { useEffect,useState } from "react";
import Button from "./Button";
import TimeItem from "./TimeItem";
// let hourId;
// let minuteID;
// let secondID;
let watchID;
const Stopwatch = ({count,setCount}) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [checkpoints, setCheckpoints] = useState(
    JSON.parse(localStorage.getItem("lapitem")) || []
  );
  const [disableLap,setDisableLap]=useState(true);
  // const [history,setHistory]=useState(JSON.parse(localStorage.getItem("prevItems"))||[])
  const [prevHour, setPrevHour] = useState(0);
  const [prevMinute, setPrevMinute] = useState(0);
  const [prevSecond, setPrevSecond] = useState(0);
  // const [paused,setpaused]=useState(false);
  // const [str,setStr]=useState((hour < 10 ? ("0" + hour) : hour)+":"+(minute < 10 ? "0" + minute : minute)+":"+
  // (second < 10 ? ("0" + second ): second))
  let str =
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second);
  // const startHour = () => {
  //   hourId = setInterval(() => {
  //     setHour((prev) => prev + 1);
  //   }, 60000*(60));
  // };
  // const startMinute = () => {
  //   minuteID = setInterval(() => {
  //     setMinute((prev) => {
  //       if (prev === 60) return 0;
  //       else return prev + 1;
  //     });
  //   }, 1000*(60));
  // };

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
    // clearInterval(hourId);
    // clearInterval(minuteID);
    // clearInterval(secondID);
    clearInterval(watchID);
  };
  const startStopwatch = () => {
    if (!stopwatchRunning) {
      setStopwatchRunning(true);
      // setTimeout(()=>{setpaused(false)},100);
      // startSecond();
      // startMinute();
      // startHour();
      startWatch();
    }
  };
  const pauseStopwatch = () => {
    setStopwatchRunning(false);
    // setpaused(true);
    // let hourP=hour;
    // let minuteP=minute;
    // let SecondP=second;
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
    // cleanup();
  };
  const lapStopwatch = () => {
    // const str=hour+":"+
    // setLap(str);
    // checkpoints.push(str);
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
    // diffSecond=(prevSecond>curSecond?(60-(prevSecond)+curSecond):curSecond-prevSecond);
    // diffMinute=(prevMinute>curMinute && curMinute?(60-(prevMinute)+curMinute):curMinute-prevMinute);
    // diffHour=curHour-prevHour;
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
    // localStorage.setItem("str", JSON.stringify(str));
    // localStorage.setItem("lapitem", JSON.stringify(checkpoints));
  };
  const storeLocally=()=>{
    localStorage.setItem("str",JSON.stringify(str));
    localStorage.setItem("lapitem",JSON.stringify(checkpoints));
  }
  const saveAndRefresh=()=>{
    let historyItem={
      date:new Date().toISOString().slice(0, 10),
      data:JSON.parse(localStorage.getItem("lapitem"))
    }
    let history=JSON.parse(localStorage.getItem("prevItems"))||[];
    let lapItems=JSON.parse(localStorage.getItem("lapitem"));
    // history.unshift(historyItem)
    // history.map((ele)=>{
    //   if(ele.date==(new Date().toISOString().slice(0, 10))+"hi")
    //   {console.log(lapItems.concat(ele.data));
    //     ele.data=lapItems.concat(ele.data);
    //     // return {...ele,data:lapItems.concat(ele.data)}}
    //   }
    // else
    // {history.unshift(historyItem)
    // return}
  // })
    if(history.length===0)
    {history.push(historyItem)}
    else if(history[0].date==(new Date().toISOString().slice(0, 10)))
    {
      history[0].data=lapItems.concat(history[0].data);
    }
    else if(history.length>=7)
      {
        console.log(history.length);
        history.splice(6,(history.length)-6);
        history.unshift(historyItem);
      }
    else
      history.unshift(historyItem);
  // setHistory([historyItem]);
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

  // useEffect(()=>{
  //   setStr(JSON.parse(localStorage.getItem("str")));
  // },[])
  //   useEffect(() => {
  //     startSecond();
  //     startMinute();
  //     startHour();
  //     return cleanup;
  //   }, []);
  return (
    <div className="w-full">
      <div className=" shadow-[0_5px_15px_rgba(4,59,92,0.75)] rounded-full h-[250px] w-[250px] m-auto mb-8 flex items-center justify-center">
      <h1 className="text-5xl">
        {/* {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}: */}
        {/* {second < 10 ? "0" + second : second}  */}
        {str}
      </h1>
      </div>
      <br />
      <div className="flex justify-center mt-8">
        {/* {(hour!=0||minute!=0||second!=0) && <Button onClick={refreshStopwatch}>Refresh</Button>} */}
        {/* {stopwatchRunning && <Button onClick={pauseStopwatch}>Pause</Button>} */}
        {/* {(hour!=0||minute!=0||second!=0) && <Button onClick={lapStopwatch}>lap</Button>} */}
        {(hour != 0 || minute != 0 || second != 0) && (
          <Button onClick={refreshStopwatch}>Refresh</Button>
        )}
        {/* <Button  onClick={refreshStopwatch}>Refresh</Button> */}
        <Button onClick={stopwatchRunning ? pauseStopwatch : startStopwatch}>
          {stopwatchRunning ? "Pause" : "Play"}
        </Button>
        {/* <Button onClick={lapStopwatch} disabled={hour===0&&minute===0&&second===0}>lap</Button> */}
        {(hour != 0 || minute != 0 || second != 0) && (
          <Button onClick={lapStopwatch}>lap</Button>
        )}
        {/* <img onClick={refreshStopwatch} src="src\image\icons8-refresh-96.png" />
      <img onClick={refreshStopwatch} src={stopwatchRunning?("src\image\icons8-pause-96.png"):"src\image\icons8-play-96.png"} />
      <img onClick={refreshStopwatch} src="src\image\icons8-flag-48.png" /> */}
      </div>
      {(checkpoints.length!=0)&&<div className="mt-8 bg-blue-100 p-2  rounded-lg">
      {/* {checkpoints.map((ele, index) => (
        <div key={index + 1} className="flex justify-center items-center text-sm  ">
          <h3 className="mr-20">{checkpoints.length-index }</h3>
          <h1>{ele}</h1>
        </div>
      ))} */}
      {checkpoints.map((ele,index)=><TimeItem data={checkpoints} ele={ele} key={index+1} index={index}/>)}
      </div>}
      {(checkpoints.length!=0)&&(<div className="mt-12">
        <Button onClick={saveAndRefresh}>Save & Refresh</Button>
      </div>)}
      {/* <div className="mt-8 flex justify-center"> */}
      {/* <img className="rounded-lg " src="https://qph.cf2.quoracdn.net/main-qimg-a381019170e22776adb2099a1b4f34ff-lq"/> */}
      {/* </div> */}
    </div>
  );
};

export default Stopwatch;
