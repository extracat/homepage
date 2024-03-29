import React, { useState } from 'react'
import Link from 'next/link'
import posts from '../pages/posts.json'
import Image from 'next/image'
import { Tag } from './Tag'

export function CardsList() {

  return (
    <>

      <div className="grid">

        {posts.posts.map((p) => { 

          // If project is "Coming Soon" card will be without link
          if (p.comingSoon) return (
            <a onClick={null} key={p.slug} className={ p.comingSoon ? "card nolink" : "card" }>
              { p.image != "" ? <Image unoptimized alt="Card Image" className="card-image no-bleed" src={p.image} width={1200} height={630} /> : ''}
              <div className="card-text">
                <div className="tags">
                  { p.comingSoon ? <Tag>Coming Soon</Tag> : "" }
                  { p.nda ? <Tag>NDA</Tag> : "" }
                  { p.tags.map((t) => (<Tag key={t}>{t}</Tag>))}
                </div>
                <h3>{p.title}</h3>
                { p.excerpt ? <p>{p.excerpt}</p> : "" }
              </div>
            </a>
          )

          // Other regular project cards
          else return (
            <Link key={p.slug} href={p.slug} className="card">
              { p.image != "" ? <Image unoptimized alt="Card Image" className="card-image no-bleed" src={p.image} width={1200} height={630} /> : ''}
              <div className="card-text">
                <div className="tags">
                  { p.nda ? <Tag>NDA</Tag> : "" }               
                  { p.tags.map((t) => (<Tag key={t}>{t}</Tag>))}
                </div>
                <h3>{p.title}</h3>
                { p.excerpt ? <p>{p.excerpt}</p> : "" }
              </div>
            </Link>
          )
        })}
      </div>
    </>
  );
}
