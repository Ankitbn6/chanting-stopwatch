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
      <div className="fixed z-[10] ml-1">
        {theme === "dark" ? (
          <img
            onClick={toggleTheme}
            className="w-[30px]"
            src="/src/image/icons8-sun-lightWhite-50.png"
          />
        ) : (
          <img
            onClick={toggleTheme}
            className="w-[30px]"
            src="/src/image/icons8-dark-mode-60.png"
          />
        )}
      </div>
      <Stopwatch count={count} setCount={setCount} />
      <div>
        <img
          className="rounded-lg m-auto mt-[80px] "
          // src="https://www.harekrishnajapa.com/wp-content/wallpapers/eight_line_wallpapers/print_quality/Hare-Krishna-Maha-Mantra-Eight-Line-584.jpg"
          src="/src/image/Hare-Krishna-Maha-Mantra.jpg"
        />
      </div>
      <History count={count} />
      <div>
        <img
          className="rounded-lg m-auto mt-12 "
          src="/src/image/Prabhupada.jpg"
        />
      </div>
    </div>
  );
}

export default App;
