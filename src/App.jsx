import { useState } from 'react';
import './App.css';

function App() {
  const [img,setimg]=useState("")
  const[loading,setloading]=useState(false)
  const[qrdata,setqrdata]=useState("")
  const[size,setsize]=useState("300")
  const[para,setpara]=useState("")
  function generateqr(){
    setloading(true);
    try {
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`;
      setimg(url);
    } catch (error) {
      setpara.innerHTML("error",error);
    }
    finally{
      setloading(false);
    }
  };
  function downloadqr(){
    fetch(img)
      .then((response)=>response.blob()).then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="QR Code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    };
  return (
    <div className='container'>
      <div className='heading'>
      <h3 >QR-Code GENERATOR</h3>
      {loading && <p id={para}>please wait...</p>}
      {img && <img src={img}></img>}
      </div >
      <div className='data1'>
      {/*htmlFor is used to u can click the text its directly goes to input box. 
      u frist put the name on htmlFor then the same name is given to input id */ }
      <label htmlFor='data1'>Data for QR code</label>
      <input type="text" id='data1' onChange={(e)=>setqrdata(e.target.value)} placeholder='URL'/>
      </div >
      <div className='data2'>
      <label htmlFor='data2'>Image Size eg:(150)</label>
      <input type="text" id='data2' onChange={(e)=>setsize(e.target.value)} placeholder='SIZE'/>
      </div >
      <div className='button' >
      <button className="but1" disabled={loading} onClick={generateqr}>Generate the QR</button>
      <button className="but2" onClick={downloadqr} >Download the QR</button>
      </div >
      <h6 id="desc">Design By  <a target='blank'href="https://mohamedhanifaharish.wordpress.com/">MOHAMED HANIFA HARISH.</a></h6>
  </div>
  );
}

export default App;
