// コンポーネントインポート
import Link from 'next/link';

// cssインポート
import Style from '@style/components/News.module.scss';
import { FormatDate } from '@util/DateFormatter';

const News = ({news}) => {

  return (
    <div className={Style.newsContainer}>
        <h2>お知らせ</h2> 
        <div  className={Style.newsTable}>
          {news.map(({ url, date, title },index) => {
            return(
              <div className={Style.news} key={index}>
                <p className={Style.newsDate}>
                  <FormatDate date={date} />
                </p>
                <p className={Style.newsContent}>
                  <Link className={Style.newsHlef} href={ url || '/' }>{ title } </Link>
                </p>
              </div>
            );
          })}
        </div>
    </div>
  );
}
export default News;