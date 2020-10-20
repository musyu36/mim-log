import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts")

const categories = ["Dev", "Diary", "Gadget"]

export function getSortedPostsData() { 
    // /posts 配下のファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // idを 取得するためにファイル名から".md"を削除
        const id = fileName.replace(/\.md$/, '')

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // 投稿のメタデータ部分を解析するために gray-matterを使用
        const matterResult = matter(fileContents)

        // データをidと合わせる
        return {
            id,
          ...matterResult.data as { date: string; title: string; category: string;}
        }

    })

    // 投稿を日付でソートする
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

// 該当カテゴリに所属する投稿データを取得　
export function getSortedCategoryPostsData(category: string) { 
    // /posts 配下のファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // idを 取得するためにファイル名から".md"を削除
        const id = fileName.replace(/\.md$/, '')

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // 投稿のメタデータ部分を解析するために gray-matterを使用
      const matterResult = matter(fileContents)
    

        // データをidと合わせる
        return {
            id,
          ...matterResult.data as { date: string; title: string, category: string}
        }
    })

    // 該当するカテゴリの記事を抽出
    var filteredPostsData = allPostsData.filter(function(postData) {
      return postData.category  === category;
    });

    // 投稿を日付でソートする
    return filteredPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

// posts ディレクトリに存在するファイル名の配列を返す関数
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // 以下のような配列を返します:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getAllCategories() {
  return categories.map(category => {
    return {
      params: {
        category: category
      }
    }
  })
}

// id を元に投稿をレンダーするのに必要なデータをフェッチする関数
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)
    
    // マークダウンをHTML 文字列に変換するために remarkを使う
    const processedContent = await remark()
        .use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    // データを id 及び contentHtml と組み合わせる
    return {
        id,
        contentHtml,
      ...matterResult.data as { date: string; title: string; category: string}
    }
}