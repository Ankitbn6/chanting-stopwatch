import { useContext, useEffect, useState } from "react";

const Images = () => {
    let i=0;
    const imgSrc=["/src/image/Krishna.jpg","/src/image/Radha.jpg","/src/image/Rama-Sita.jpg"];
    // const imgSrc=["https://www.mayapur.com/wp-content/uploads/2016/05/18-2-1024x683.jpg","https://qph.cf2.quoracdn.net/main-qimg-a381019170e22776adb2099a1b4f34ff-lq","https://i.pinimg.com/736x/05/e5/67/05e567331ffb030282472f193e2e304b.jpg","https://i.pinimg.com/736x/3d/bf/0a/3dbf0a4ac39f8bafea44fc74f6bcd696.jpg",""];
    const [source, setSource] = useState("/src/image/Krishna.jpg");
    const slideShow=()=>{
        setInterval(()=>{
            setSource(imgSrc[i]);
            if(i==(imgSrc.length)-1)
            i=0;
        else
        i++;
        },3000)
    }
    useEffect(slideShow,[]);
    
  return (
    <div>
      {/* <div><img className='rounded-lg m-auto mt-12 ' src='https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D181712048W6534H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/hare-krishna-maha-mantra-sticker.jpg'/></div> */}
      <div><img  className="rounded-xl m-auto mb-[40px] mt-5 w-[300px] h-[180px] " src={source}/></div>
    </div>
  )
}

export default Images