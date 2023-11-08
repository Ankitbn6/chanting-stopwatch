import { useContext, useState } from "react";
import "./App.css";
import History from "./components/History";
import Stopwatch from "./components/Stopwatch";
import Images from "./components/Images";
// import Button from "./components/Button";
import { ThemeContext } from "./contexts/ThemeContext";

// import Stopwatch1 from './components/Stopwatch1'

function App() {
  const [count, setCount] = useState(0);
  // const [lock,setLock]=useState(false);
  const [theme, toggleTheme] = useContext(ThemeContext);
  const styles = {
    dark: {
      background: "black",
      color: "white",
    },
    light: {
      background: "white",
      color: "black",
    },
  };
  return (
    <div style={{ ...styles[theme], padding: "10px" }} className="relative">
      <Images />
      <div className="fixed z-[10] ">{theme === "dark" ? (<img onClick={toggleTheme} className="w-[30px]" src="/src/image/icons8-sun-50.png"/>
        /* <div
          onClick={toggleTheme}
          style={{ ...styles[theme], border: "2px solid white" }}
          className="h-[30px] w-[80px] m-auto mb-8 text-xl"
        >
          Light
        </div> */
      ) : (<img onClick={toggleTheme} className="w-[30px]" src="https://img.icons8.com/?size=256&id=59841&format=png"/>)
        /* <div
          onClick={toggleTheme}
          style={{ ...styles[theme], border: "2px solid blue"}}
          className="h-[30px] w-[80px] m-auto mb-8 text-xl"
        >
          Dark
        </div> */
      }</div>
      <Stopwatch count={count} setCount={setCount} />
      <div>
        {/* <img
          className="rounded-lg m-auto mt-[80px] "
          src="https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D181712048W6534H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/hare-krishna-maha-mantra-sticker.jpg"
        /> */}
        <img
          className="rounded-lg m-auto mt-[80px] "
          src="https://www.harekrishnajapa.com/wp-content/wallpapers/eight_line_wallpapers/print_quality/Hare-Krishna-Maha-Mantra-Eight-Line-584.jpg"
        />
      </div>
      <History count={count} />
      <div>
        <img
          className="rounded-lg m-auto mt-12 "
          src="https://www.mayapur.com/wp-content/uploads/2016/05/12-4-1024x683.jpg"
        />
      </div>
    </div>
  );
}

export default App;
