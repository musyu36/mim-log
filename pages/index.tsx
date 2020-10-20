import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"
import { GetStaticProps } from 'next' 

export default function Home({
  allPostsData
}:{
    allPostsData: {
      category:string,
      date:string,
      title:string,
      id:string
    }[]
  }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, category }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              <br />
              <small className={utilStyles.lightText}>
                {category}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// props は Home コンポーネントに渡される
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}