import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { TbMoon } from "react-icons/tb";
import { useState, useEffect } from 'react';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export function DarkModeButton() {

  const [buttonType, setButtonType] = useState('sun');
  const mode = getCookie('mode');

  if (mode == 'dark') {
    useEffect(()=>{
      setButtonType('moon');
    }, [])
  }
  else {
    useEffect(()=>{
      setButtonType('sun');
    }, [])
  }

  if (typeof window !== "undefined") {
    //var mode = window.localStorage.getItem('mode');
    var html = document.body.parentNode;
    var body = document.body;

    if (mode == 'light') {
      html.classList.add("light-mode");
      body.classList.add("light-mode");
    } 
    if (mode == 'dark') {
      html.classList.add("dark-mode");
      body.classList.add("dark-mode");
    }
    
    //console.log('cookie is', mode);
   }

  function toggleDarkMode() {
    //var mode = window.localStorage.getItem('mode');
    var mode = getCookie('mode');

    var html = document.body.parentNode;
    var body = document.body;
    var prefersMode = '';

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      prefersMode = 'dark';
    }
    else {
      prefersMode = 'light';
    }

    if (mode != 'dark' && mode != 'light') {
      mode = prefersMode;
    }

    //console.log('mode is', mode);

    if (mode != 'dark') {
      html.classList.add("dark-mode");
      body.classList.add("dark-mode");
      html.classList.remove("light-mode");
      body.classList.remove("light-mode");
      setButtonType('moon');
    
      if (mode == prefersMode) {
        window.localStorage.setItem('mode', 'dark');
        setCookie('mode','dark');
      }
      else {
        //window.localStorage.setItem('mode', '');
        setCookie('mode','');
      }
    

    } 
    else {
      html.classList.add("light-mode");
      body.classList.add("light-mode");
      html.classList.remove("dark-mode");
      body.classList.remove("dark-mode");
      setButtonType('sun');
      setCookie('mode','light');

      if (mode == prefersMode) {
        window.localStorage.setItem('mode', 'light');
        setCookie('mode','light');
      }
      else {
        window.localStorage.setItem('mode', '');
        setCookie('mode','');
      }
      
    }
  }

  return (
    <>
      <a id='darkModeButton' className='darkModeButton' title={ buttonType == 'moon' ? 'Turn on the light' : 'Turn off the light' } style={{cursor: 'pointer'}} onClick={toggleDarkMode}>
        { buttonType == 'moon' ? <TbMoon className="react-icon moon-icon" /> : <MdOutlineLightMode className="react-icon sun-icon" /> }
      </a>
    </>
  );
}
