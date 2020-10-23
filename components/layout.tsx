// 共通コンポーネント
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from "next/link"

const name = 'Mim'
export const siteTitle = "mimlog"
const categories = ["Dev", "Diary", "Other"]

export default function Layout({ children, post, home, category }: { children: React.ReactNode, post?: boolean, home?: boolean, category?: string }) {
    var homeIcon;
    if (home) {
        homeIcon =
            <li className={styles.categoryLi}>
                        <img width="64px" height="64px" className={styles.categoryIconActive} src="/images/Home.png" alt="Home" />
                <p className={styles.navCategoryText}>
                    Home
                </p>
            </li>
    } else {
        homeIcon =
            <li className={styles.categoryLi} >
                <Link href="/" as="/">
                    <a className={styles.categoryAnchor}>
                        <img width="64px" height="64px" className={styles.categoryIcon} src="/images/Home.png" alt="" />
                    </a>
                </Link>
                <p className={styles.navCategoryText}>
                    Home
                </p>
            </li>
    }
    var categoryNav;
    if (!post) {
        categoryNav =
            <nav className={styles.categoryNav}>
                <div className={styles.container}>
                <ul className={styles.categoryUl}>
                    {homeIcon}
                    {categories.map((categoryName) => {
                        if (categoryName === category) {
                            return (
                                <li className={styles.categoryLi} key={categoryName}>
                                            <img width="64px" height="64px" className={styles.categoryIconActive} src={`/images/${categoryName}.png`} alt="" />
                                    <p className={styles.navCategoryText}>
                                        {categoryName}
                                    </p>
                                </li>
                            );
                        } else {
                            return (
                                <li className={styles.categoryLi} key={categoryName}>
                                    <Link href={`/categories/${categoryName}`}>
                                        <a className={styles.categoryAnchor}>
                                            <img width="64px" height="64px" className={styles.categoryIcon} src={`/images/${categoryName}.png`} alt="" />
                                        </a>
                                    </Link>
                                    <p className={styles.navCategoryText}>
                                        {categoryName}
                                    </p>
                                </li>
                            );
                        }
                        })}
                    </ul>
                </div>
            </nav>;
    }

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
                    <Link href="/" as="/">
                        <h1 className={styles.headerLogo}>
                            <a className={styles.headerAnchor}>
                                mimlog
                            </a>
                        </h1>
                    </Link>

                </div>
            </header>
            {categoryNav}
            <div className={styles.container}>
                <main>{children}</main>
            </div>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <small className={`${utilStyles.lightText} ${utilStyles.flexCenter}`}>Copyright (c) mimlog All Rights Reserved.</small>
                </div>
            </footer>
        </>
    );
}