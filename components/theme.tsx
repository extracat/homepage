import type { NextraThemeLayoutProps } from 'nextra';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const {
    title,
    frontMatter,
    headings,
    pageMap,
    route
  } = pageOpts

  const htmlHead = (
    <Head>
      <title>{title}</title>
      <meta name="description" content="A product designer specialized in professional aimed fintech products." />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Anton Basistov — Product Designer" />
      <meta property="og:description" content={frontMatter.description} />
      <meta property="og:image" content={"https://basistov.com" + frontMatter.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@5n32h1" />
      <meta name="twitter:image" content={"https://basistov.com" + frontMatter.image} />
      <meta name="twitter:description" content={frontMatter.description} />
    </Head>
  );

  const ConditionalWrapper = ({ children, condition }) => {
    return condition ? (
        children
      ) : (
        ''
      )
  }
  var homepageClass = ''


  // NDA password check
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [ndaPassed, setNdaPassed] = useState(false);

  useEffect(() => {
      const ndaCookie = Cookies.get('ndaPassed');
      setNdaPassed(ndaCookie === 'true');
  }, []);
    
  const isNdaPage = frontMatter && frontMatter.nda === true;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'knockknock') {
      Cookies.set('ndaPassed', 'true', { expires: 90 });
      router.reload();
    } else {
      alert('Incorrect password');
    }
  }

  return (
    <div className={route == "/" ? "container homepage" : "container"}>
      {htmlHead}

      <header className="header">
          <Header />
      </header>

      <main className="main">
            <div className="main-content">
              <article>

                {/* Checking if the page is NDA */}
                {isNdaPage && !ndaPassed ?
                  (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="password-input">This is NDA project</label>
                      </div>
                      <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter password" 
                        required 
                      />
                      <div><button type="submit">Let me in</button></div>
                    </form>
                  ) : (
                    children
                  )
                }

                {// This renders only on the specified route
                <ConditionalWrapper condition={route == "/"}>
                  <div></div>
                </ConditionalWrapper>
                }

              </article>
            </div>
        </main>

        <footer className="footer">
            <Footer/>
        </footer>

      </div>
    )
}
