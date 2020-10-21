import utilStyles from '../styles/utils.module.css'
import linkToPost from './LinkToPost.module.css'
import Link from "next/link"
import Date from "../components/date"
import "./LinkToPost.module.css";

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
        <li className={`${utilStyles.listItem} ${utilStyles.convex}`} key={id}>
            <Link href={`/posts/${id}`}>
                <a className={utilStyles.listAnchor}>{title}
                    <br />
                    <small className={utilStyles.lightText}>
                        <Date dateString={date} />
                    </small>
                  <br />
                  <Link href={`/categories/${category}`}>
                    <small className={`${utilStyles.lightText} ${linkToPost.linkCategoryText}`}>
                        {category}
                    </small>
                  </ Link>
                </a>
            </Link>
        </li>
  )
}