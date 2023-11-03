import { useState } from 'react'
import './App.css'
import History from './components/History'
import Stopwatch from './components/Stopwatch'
import Images from './components/Images'

// import Stopwatch1 from './components/Stopwatch1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className='text-red-700 w-[250px] sm:w-[500px] md:w-[700px] lg:w-[850px] m-auto bg-white text-center text-4xl py-5'>Hare Krishna Hare Krishna Krishna Krishna Hare Hare <br/> Hare Rama Hare Rama Rama Rama Hare Hare</h1> */}
      <Images/>
      <Stopwatch count={count} setCount={setCount} />
      <div><img className='rounded-lg m-auto mt-[60px] ' src='https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D181712048W6534H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/hare-krishna-maha-mantra-sticker.jpg'/></div>
      <History count={count}/>
      <div><img className='rounded-lg m-auto mt-12 ' src='https://www.mayapur.com/wp-content/uploads/2016/05/12-4-1024x683.jpg'/></div>
    </>
  )
}

export default App
