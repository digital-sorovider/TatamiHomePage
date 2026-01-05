// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import SubProducts from '@components/SubProducts';
import UpArrow from '@components/UpArrow';
import Igusa from '@components/Igusa';
import Image from "next/image";


// 画像インポート
import life1 from '/public/images/Life.images/life1.png'
import life2 from '/public/images/Life.images/life2.png'
import tatami from '/public/images/Igusa.images/sister1.png';

// cssインポート
import Style from '@style/pages/Life.module.scss';
import { getAll } from '@lib/firebase';

const Life = ({funPointList}) => {

  return (
    <div>
      <Heading heading="生活鯖" />
      <Subtitle subtitle="24時間遊んで暮らせる 生活鯖で遊ぼう！" />
      <div className='subtitle-content'>
        <div className={Style["life-subtitle-content"]}>
          <div className={Style["life-img-container"]}>
            <Image className='subtitle-img' src={life1} alt="生活鯖写真"></Image>
            <Image className='subtitle-img' src={life2} alt="生活鯖写真"></Image>
          </div>
          <p>
            生活鯖は2026年1月時点でサービス停止中。
            次のシーズンに向けて開発を進めていますので、お待ちください！
          </p>
        </div>
      </div>
      <Subtitle subtitle="生活鯖Season3を楽しむポイント" />
      <div className="Products">
        <SubProducts products={funPointList} />
      </div>
      <UpArrow />
      <Igusa text="生活鯖Season3に関する情報を掲載しているわ。
        ツール成長やオリジナル職業等のやりこみ要素を楽しもう！"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </div>
  );
}

export async function getStaticProps() {
  const funPointList = (await getAll('life', { sort: [{ field: 'sortNum', order: 'asc' }]})).map(life => {
    return {
      ...life,
      href: life.url || `/life/${life.id}`,
      img: life.mainImg?.src || '',
      imgTitle: life.shortTitle,
    }
  })

  return {
    props: {
      funPointList,
    },
    revalidate: 60,
  }
}

export default Life;
