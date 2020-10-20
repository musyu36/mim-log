// 共通コンポーネント
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'Mim'
export const siteTitle = "mimlog"

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                <div className={styles.container}>
                    <h1 className={utilStyles.heading2Xl}>
                        <img
                            src="/images/logo.jpg"
                            className={`${styles.headerImage}`}
                            alt={name}
                        />
                    </h1>
                </div>
            </header>
            <div className={styles.container}>
                <main>{children}</main>
            </div>
        </>
    );
}