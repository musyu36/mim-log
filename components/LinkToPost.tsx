import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"
import { GetStaticProps } from 'next' 

export default function LinkToPost({
    id,
    date,
    title,
    category
}:{
      category:string,
      date:string,
      title:string,
      id:string
    }
  ) {
  return (    
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
  )
}