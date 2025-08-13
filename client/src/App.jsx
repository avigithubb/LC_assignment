import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { useNavigate } from "react-router-dom"

function App() {
  const [link, setLink] = useState("");
  const [isFormSubmitted, setFormSubmit] = useState(false);
  const [mylink, setMyLink] = useState("");
  const [is_clicked, setClicked] = useState(false);

  function handleSubmit(e){
    e.preventDefault()
    // value = e.target.value;
    // console.log(value);
    console.log(mylink);
    setFormSubmit(true);
  }

  useEffect(()=>{
    if(isFormSubmitted){
      const queryParams = new URLSearchParams({
        li_nk: mylink,
      }).toString();

      fetch(`http://localhost:5000/shorten?${queryParams}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(res => res.json())
      .then((data)=> {
        console.log(data.message);
        console.log(data.short_url);
        setLink(data.short_url);

        setMyLink("");
      })
    }
    

  }, [isFormSubmitted])

  

  function handleChange(e){
    const {name, value} = e.target;
    setMyLink(value);
  }

  useEffect(()=>{
    if(is_clicked){
      const queryParams = new URLSearchParams({
        url: link,
      }).toString();

      fetch(`http://localhost:5000/show?${queryParams}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // navigateTo(`${data.url}`);
        window.location.href = data.url;
      })
    }
  }, [is_clicked])

  return (
    <>
      <h1 className='heading-text' style={{color: "white", background: "transparent"}}>Welcome to LC Link Shortner</h1>
      <form onSubmit={handleSubmit} method='POST'>
        <input onChange={handleChange} type="text" name='link-text' autoFocus="true" placeholder="Paste your link here" value={mylink ?? ""}/>
        <input type="submit" value="shorten"/>
      </form>

      {link != "" ?
        <p style={{color: "black"}}>The shorten link is <em><span onClick={()=> setClicked(true)} style={{color: "blue", cursor: "pointer"}}>{link}</span></em></p>
       : ""}
    </>
  )
}

export default App

