// コンポーネントインポート
import UpArrow from '@components/UpArrow';
import HistoryContent from '@components/HistoryContent';
import HistoryWarps from '@components/HistoryWarps';
import Igusa from '@components/Igusa';

// reactの機能をインポート
import { useRef ,createRef, useEffect, useState} from 'react';
import Image from "next/image";

// 画像インポート
import tatami from '/public/images/Igusa.images/sister1.png';

// cssインポート
import Style from '@style/pages/History.module.scss';
import { getAll } from '@lib/firebase';
import { groupBy } from '@util/Query';

const History = ({histories}) => {
  const historyContentRefs = useRef([]);
      {histories.forEach((_,i) => {
        historyContentRefs.current[i] = createRef();
      })};

    const[scrollPosition, setScrollPosition]= useState(0);
    useEffect(() => {
        const onScroll= () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll",onScroll)
    return() => window.removeEventListener("scroll",onScroll)
  });

  return (
    <>
        <div className={Style["history-hero"]}>
        <Image src={'/images/HistoryContent.images/history.png'} width={1920} height={1057}  className={Style['history-hero-img']} alt="" />
          <div className={Style["history-hero-content-title"]}>
            <h3>畳サーバーの</h3>
            <h3>歴史</h3>
          </div>
        </div>
      <HistoryWarps 
      contentRef={historyContentRefs.current} 
      scrollPosition={scrollPosition}
      histories={histories}
      />
        {histories.map(([year, historyData], i) => {
          return(
            <div ref={historyContentRefs.current[i]} key={i}>
              <HistoryContent year={year} histories={historyData}>
              </HistoryContent>
            </div>
          );
        })}

        <UpArrow/>
      <Igusa text="ここでは畳サーバーの歴史を知ることができるわ。
        決して順調ではなく何度も困難にぶち当たっているんです…。
        それでも遊んでくださるみなさんのおかげで続けてこれているわ。
        本当にありがとう。"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </>
  );
}

export async function getStaticProps() {
  const historyData = (await getAll(
      'history', { sort: [{ field: 'year', order: 'asc' }, { field: 'month', order: 'asc' }]}
    ))
    .map(history => ({
        ...history,
        year: `${history.year}年`
      }
    ))

  return {
      props: { histories: groupBy(historyData, 'year') },
      revalidate: 60,
  }
}

export default History;