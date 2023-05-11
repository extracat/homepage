import React, { useState } from 'react';
import Link from 'next/link';
import posts from '../pages/posts.json';
import Image from 'next/image';
import { ComingSoon } from './comingSoon';
import { Nda } from './nda';
import { PasswordPopup } from './passwordPopup';

export function Cards() {

  const [showPopup, setShowPopup] = useState(false);

  const handleLinkClick = () => {
    setShowPopup(true);
  };
  
  const handlePopupClose = () => {
    setShowPopup(false);
  };


  return (
    <>

      <div className="grid">
      <PasswordPopup redirectUrl="1" showPopup={showPopup} onClose={handlePopupClose} />

        {posts.posts.map((p) => (
          <a onClick={p.nda ? handleLinkClick : null} key={p.slug} href={p.nda ? "#!" : p.slug } className={ p.comingSoon ? "card nolink" : "card" }>
            { p.image != "" ? <Image className="card-image no-bleed" src={p.image} width={1200} height={630} /> : ''}
            <div className="card-text">
              { p.comingSoon ? <ComingSoon /> : "" }
              { p.nda ? <Nda /> : "" }
              <h3>{p.title}</h3>
              { p.excerpt ? <p>{p.excerpt}</p> : "" }
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
