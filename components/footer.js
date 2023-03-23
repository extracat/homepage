import Link from 'next/link';
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";


export function Footer() {
  return (
    <>
      <div className='main'>
        <div className='footer-content'>
          <div className='row'>
            <div className='col name-block'>
                <p className='name'>Anton Basistov</p>
                <p>Product Designer</p>
            </div>
            <div className='col align-right menu-icon'>
              <a href="mailto:basistov@gmail.com" title="Mail Me">
                <HiMail className='react-icon mail-icon'/>
              </a> 
            </div>
            <div className='col align-right menu-icon'>
              <a href="https://twitter.com/5n32h1" title="Tweet Me" target="_blank" rel="noopener noreferrer">
                <FaTwitter className='react-icon twitter-icon'/>
              </a>
            </div>
            <div className='col align-right menu-icon'>
              <a href="https://linkedin.com/in/basistov/" title="Hire Me" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className='react-icon ' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
