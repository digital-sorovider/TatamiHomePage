// コンポーネントをインポート
import MainProducts from '@components/MainProducts';
import SubProducts from '@components/SubProducts';
import News from '@components/News.js';
import SeparatorLine from '@components/SeparatorLine';
import UpArrow from '@components/UpArrow';
import Igusa from '@components/Igusa';
import SnsIcons from '@components/snsIcons';
import Menu from '@components/Menu';
import JoinBtn from '@components/JoinBtn';

// reactの機能をインポート
import { useRef } from 'react';
import useSWR from 'swr'

// カルーセルインポート
import Carousel from 'react-bootstrap/Carousel'

// 画像をインポート
import donation from '/public/images/Home.images/donation.jpg';
import tebex from '/public/images/Home.images/tebex.png';
import map from '/public/images/Home.images/map.png';
import omikuzi from '/public/images/Home.images/omikuzi.jpg';
import please from '/public/images/Home.images/please.jpg';
import application from '/public/images/Home.images/application.png';
import history from '/public/images/Home.images/history.png';
import sns from '/public/images/Home.images/sns.png';
import rules from '/public/images/Home.images/rules.png';
import inquery from '/public/images/Home.images/inquery.jpg';
import event from '/public/images/Home.images/TatamiEvent.jpg';
import life from '/public/images/Home.images/life.png';
import join from '/public/images/Home.images/join.png';
import tatami from '/public/images/Igusa.images/sister1.png';
import { Rings } from 'react-loader-spinner'

// cssインポート
import Style from '@style/pages/Home.module.scss';

import Image from "next/image";
import TopLayout from '@layouts/TopLayout';

import { getAll, getOne } from '@lib/firebase';


function Home({ news, topImages }) {
  // 通常の羅列　順番を変えるときはcompornentのmenu.jsも変更！
  const SubProductsList = [
    { href: `/subscription/`, imgTitle: "Tebex", img: tebex, title: "公式特典サービス", description: "サーバー維持のためご寄付を募っています。<br>ご寄付いただいた方には、<br>ささやかながら特典をご用意しております。" },
    { href: `/rules/`, imgTitle: "利用規約", img: rules, title: "利用規約", description: "鯖民がサーバーで心地よく過ごすために<br>ルールを設けています" },
    { href: `/map/`, imgTitle: "マップ", img: map, title: "配布マップ", description: "当サーバーが提供している\n配布マップ等を紹介しています。" },
    { href: `/history/`, imgTitle: "歴史", img: history, title: "畳サーバーの歴史", description: "畳サーバーの過去を知ることができます。<br>過去にこんな事が...。" },
    { href: `/sns/`, imgTitle: "SNS", img: sns, title: "公式SNS", description: "YouTube・X・支援サイトTebex等の<br>URLを記載しています。" },
    { href: `/help/`, imgTitle: "応募", img: application, title: "運営への応募", description: "開発、建築、広報、企画何でもOK!<br>私たちと一緒に畳サーバーを作りませんか？" },
    { href: `/contact/`, imgTitle: "お問い合わせ", img: inquery, title: "お問い合わせ・意見箱", description: "ご意見やご要望はこちらからご送信ください。" },
    { href: `/please/`, imgTitle: "お願い", img: please, title: "運営からのお願い", description: "サーバーの維持や盛り上げのために<br>お願いしていることを記載しています。" },
    { href: `/omikuzi/`, imgTitle: "おみくじ", img: omikuzi, title: "畳おみくじ", description: "今日の運勢とクエストを占おう！ちょっとした遊び心で用意したコンテンツです。" },
  ];
  // TOPに来る目立つ羅列　順番を変えるときはcompornentのmenu.jsも変更！
  const MainProductsList = [
    { href: `/join/`, img: join, title: "サーバー参加方法", description: "Discordやマイクラサーバーへの参加方法を紹介しています。" },
    { href: `/event/`, img: event, title: "イベント一覧", description: "当サーバーが提供しているイベント一覧とルールを紹介しています。" },
    { href: `/life/`, img: life, title: "生活鯖Season3始動", description: "生活鯖は2024年9月からSeason3をスタート！10種類以上のオリジナル職業、ツール成長システム、株券など畳でしか遊べない新しい生活鯖をお楽しみください！" },
  ];

  const myRef = useRef(null);

  const { data: serverStats } = useSWR("/api/minecraft/simple/server",
    url => fetch(url)
      .then(async r => {
        let existPlayer = false
        const rawStats = await r.json()
        const stats = rawStats.map(rawStat => {
          const [type, stat] = Object.entries(rawStat)[0]
          const players = stat?.players || []
          if (players.length > 0) existPlayer = true

          return {
            type,
            players,
          }
        })

        return { existPlayer, stats }
      })
      .catch((e) => e));

  return (
    <>
      <section className={Style["hero-content-warpper"]}>
        <div>
          <div className={Style["first-view-header"]}>
            <div className={Style.triangle}></div>
            <div className={`${Style.triangle} ${Style.line}`}></div>
            <Image className={Style.logo} src='/images/Home.images/logo.png' width={300} height={300} alt="畳アイコン" />
            <div className={Style["first-view-content"]}>
              <JoinBtn size="small" />
              <SnsIcons />
              <div className={Style["first-view-menu"]}>
                <Menu right noOverlay />
              </div>
            </div>
          </div>
          <Carousel className={Style.Carousel} >
            {/* returnなしでも書ける↓例　他のも統一する。 */}
            {topImages.map((img, index) =>
              <Carousel.Item className={Style["carousel-item"]} interval={2000} key={index}>
                <Image
                  className={`d-block w-100 ${Style["carousel-img"]}`}
                  src={img.src}
                  alt="slide"
                  layout='fill'
                />
              </Carousel.Item>
            )}
          </Carousel>

          {/* <div className={Style["skin-wrapper"]}>
            {serverStats && serverStats.existPlayer > 0 && (
              <>
                <h2>参加中</h2>
                <div className={Style["skin-container"]}>
                  {serverStats.stats?.map(({ players }) =>
                    players?.map(player => (
                      <div key={player} className={Style["skin"]}>
                        <Image src={`https://mineskin.eu/helm/${player}`} width={70} height={70} alt="skin" />
                        <p>{player}</p>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
            {!serverStats && <Rings height={150} width={150} />}
          </div> */}

        </div>
      </section>
      <main ref={myRef}>
        <section className={Style.products}>
          <MainProducts products={MainProductsList} />
          <SeparatorLine />
          <SubProducts products={SubProductsList} filter="grayscale(0.6)"/>
        </section>
        <SeparatorLine />
        <News news={news} />
        <UpArrow />
      </main>
      <Igusa text="はじめまして、伊草 タタミです。よろしくお願いするわ。
        いつかすごい畳職人になって、みんなに最高の畳を提供するのが夢なの。
        まずはサーバー参加方法を確認するといいわよ。
        配布が気になるなら、配布マップ等も確認するといいんじゃないかしら。
        ちなみに誕生日は8/23よ。覚えていてね。"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </>
  );
}

export async function getStaticProps() {
  const news = await getAll('notice', { sort: [{ field: 'date', order: 'desc' }] })
  const { img } = await getOne('top', 'image')

  return {
    props: {
      news,
      topImages: img,
    },
    revalidate: 60,
  }
}

Home.Layout = TopLayout

export default Home;