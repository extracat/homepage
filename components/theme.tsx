import { getAbsoluteUrl } from '../utils/vercel-utils'
import type { NextraThemeLayoutProps } from 'nextra';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Header } from './header';
import { Footer } from './footer';

const absoluteUrl = getAbsoluteUrl();

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
      <meta property="og:image" content={absoluteUrl + frontMatter.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@5n32h1" />
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


  return (
    <div className={route == "/" ? "container homepage" : "container"}>
      {htmlHead}

      <header className="header">
          <Header />
      </header>

      <main className="main">
            <div className="main-content">
              <article>

                {/*
                <div>
                  Table of Contents:
                  <ul>
                    {headings.map((heading) => (
                      <li key={heading.value}>{heading.value}</li>
                    ))}
                  </ul>
                </div>
                */}

                {children}

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
