// リアクトアイコンインポート
import { ImTwitter } from 'react-icons/im'
import { AiFillYoutube } from 'react-icons/ai'
import { SiTwitch } from 'react-icons/si'
import { SiDiscord } from 'react-icons/si'
import { FaWikipediaW } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import { IconContext } from 'react-icons'

// コンポーネントインポート
import Heading from '@components/Heading';
import Igusa from '@components/Igusa';
import Image from "next/image";

// 画像インポート//
import tatami from '/public/images/Igusa.images/sister1.png';
import tatamiIconBlue from '/public/images/icon.images/tatami-icon-blue.webp';
import tatamiIcontebex from '/public/images/icon.images/tatami-icon-tebex.png';

// cssインポート
import Style from '@style/pages/SNS.module.scss';
import Link from 'next/link';

const SNS = () => {

  const SnsContentList1 = [
    { icon: AiFillYoutube, isIcon: true, color: '#B13E3E', title: "畳YouTube", discription: "イベントのダイジェストや切り抜き名場面を投稿している、畳公式YouTubeチャンネルです。", link: "https://www.youtube.com/@tatamiserver" },
    { icon: SiDiscord, isIcon: true, color: '#4E649C', title: "畳Discord", discription: "畳サーバーで遊ぶ際に参加が必要となるサーバーです。サーバールールをご確認の上、お楽しみください！", link: "https://disco.tatamiserver.com" },
    { icon: BsTwitterX, isIcon: true, color: 'rgb(0 0 0 / 74%)', title: "畳X(旧Twitter)", discription: "イベント情報や最新情報はもちろん、鯖民が楽しんでいる日常風景等も投稿していきます！", link: "https://x.com/tatamiserver" },
    { icon: tatamiIcontebex, isIcon: false, color: '#52A7AC', title: "公式特典サービス(Tebex)", discription: "畳サーバーではサーバー維持のためのご寄付を募っております。ご寄付いただいた方には、ささやかながら特典をご用意しております。", link: "https://tatamiserver.tebex.io/" },
    { icon: tatamiIconBlue, isIcon: false, title: "畳サーバー 運営募集中！", discription: "畳サーバーの運営を希望する方向けの記事になります。開発・建築・広報・企画など、なんでもOK!ご応募をお待ちしています!", link: "https://mineidea.net/projects/6160894485/" },
    { icon: BsTwitterX, isIcon: true, color: 'rgb(0 0 0 / 74%)', title: "おとたきX(畳オーナー)", discription: "畳のイベントを主催することがあります。", link: "https://x.com/ototaki0622" },
    {  icon: SiTwitch, isIcon: true, color: '#6660A7', title: "おとたきTwitch(畳オーナー)", discription: "MinecraftとPS2レトロゲーを中心にTwitchで配信！たまにボードゲームやFPS系も　畳の配信、主催もしています。", link: "https://twitch.tv/ototaki0622" },
  ]

  return (
    <div>
      <Heading heading="公式SNS等" />
      <div className={Style["sns-wrapper"]}>
        {SnsContentList1.map((item, index) => {
          return (
            <Link href={item.link} key={index} target="_blank" className={Style["sns-link"]}>
              <div key={item.title} className={Style["sns-content"]}>
                <div className={Style.icon}>

                  {
                    item.isIcon ?
                      <IconContext.Provider value={{ color: item.color, size: '60px' }}>
                        <item.icon />
                      </IconContext.Provider>
                      :
                      <Image src={item.icon} alt="Image" className={Style["icon-size"]} />
                  }

                </div>
                <h3 className={Style["sns-title"]}>{item.title}</h3>
                <p className={Style["sns-discription"]}>{item.discription}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <Igusa text="ここでは畳サーバーの関連SNSや関連サイトを掲載しているわ。
        たくさん種類があるけど、それぞれよろしくね。"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </div>
  );
}
export default SNS;