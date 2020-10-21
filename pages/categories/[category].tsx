import Layout from "../../components/layout"
import { getAllCategories, getSortedCategoryPostsData } from '../../lib/posts'
import LinkToPost from "../../components/LinkToPost"
import Head from "next/head"
import utilStyles from "../../styles/utils.module.css"
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Category({
    category,
    categoryPostData 
    }: {
    category:string,
    categoryPostData: {
      category:string,
      date:string,
      title:string,
      id:string
    }[]
  }) {
    return (
        <Layout category={category}>
            <Head>
                <title>{category}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>{category}</h2>
                <ul className={utilStyles.list}>
                {categoryPostData.map(({ id, date, title, category }) => (
                    <LinkToPost id={id} date={date} title={title} category={category} key={id}/>
                ))}
                </ul>
            </section>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCategories()
  return {
    paths,
    fallback: false
  }
}

// props は Category コンポーネントに渡される
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const category = params.category as string;
    const categoryPostData = getSortedCategoryPostsData(category)
    return {
        props: {
            category,
            categoryPostData
        }
    }
}