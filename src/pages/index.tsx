import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// Initialize an agent at application startup.



function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  console.log("hello")
//   if(window){

  
//   ;(async () => {
//     // Get the visitor identifier when you need it.
//     const fpPromise = FingerprintJS.load()

//     const fp = await fpPromise
//     const result = await fp.get()
//     console.log(result.visitorId)
//     getProgress(result.visitorId)

//   })()
// }


  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
