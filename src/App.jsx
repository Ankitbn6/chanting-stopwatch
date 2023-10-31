// import { useState } from 'react'
import './App.css'
import Stopwatch from './components/Stopwatch'
// import Stopwatch1 from './components/Stopwatch1'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <img className='rounded-lg m-auto' src='https://theharekrishnamovement.files.wordpress.com/2020/10/mantra.jpg'/>
      {/* <h1 className='text-red-700 w-[250px] sm:w-[500px] md:w-[700px] lg:w-[850px] m-auto bg-white text-center text-4xl py-5'>Hare Krishna Hare Krishna Krishna Krishna Hare Hare <br/> Hare Rama Hare Rama Rama Rama Hare Hare</h1> */}
      <Stopwatch />
    </>
  )
}

export default App
