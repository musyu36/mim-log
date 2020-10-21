import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import LinkToPost from "../components/LinkToPost"
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from "../lib/posts"
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
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, category }) => (
            <LinkToPost id={id} date={date} title={title} category={category} key={id}/>
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