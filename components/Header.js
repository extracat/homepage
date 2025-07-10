import Link from 'next/link';
import { DarkModeButton } from './DarkModeButton';

export function Header() {
  return (
    <>
      <div className='main'>
        <div className='row'>
          <div className='col logo'>
            <Link href="/" title="Home"><span className='first-letter'>A</span>B</Link>
          </div>
          <div className='col align-right top-menu'>
            {/*
            <div className='align-center menu-item'>
              <Link href="/#work">Work</Link>  
            </div>
            */}

            {/*
            <div className='align-center menu-item'>
              <Link href="/about">About</Link>      
            </div>
            <div className='align-center menu-item'>
              <Link href="/about">Garden</Link>      
            </div>
            <div className='align-center menu-item'>
              <Link href="/about">Now</Link>      
            </div>
            */}

            {/*
            <div className='align-center menu-item'>
              <Link href="/cv">CV</Link>      
            </div>
            */}
          </div>
          <div className='col align-right menu-icon'>
            <DarkModeButton />    
          </div>
        </div>
      </div>
    </>
  );
}
