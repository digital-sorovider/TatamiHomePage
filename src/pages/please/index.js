// リアクトアイコンインポート
import {BsDownload} from 'react-icons/bs';
import { IconContext } from 'react-icons';

// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import UpArrow from '@components/UpArrow';
import Link from 'next/link';
import Igusa from '@components/Igusa';
import Image from "next/image";
// 画像インポート
import PleaseVote from '/public/images/Please.images/please1.png';
import PleaseProfile1 from '/public/images/Please.images/please2-1.png';
import PleaseProfile2 from '/public/images/Please.images/please2-2.png';
import PleaseJoin from '/public/images/Please.images/please3-1.png';
import tatami from '/public/images/Igusa.images/sister1.png';

// cssインポート
import Style from '@style/pages/Please.module.scss';

const Please = () => {
  return (
    <div>
        <Heading heading="運営からのお願い"/>
        <Subtitle subtitle="投票にご協力ください！"/>
        <div className='subtitle-content'>
          <Image className='subtitle-img' src={PleaseVote} alt="サブスクイメージ画像"></Image>
          <p>
          JEの方は、1日1回
          <Link href={"https://minecraft.jp/servers/61488929d0215b4024000000"}>
          こちら 
          </Link>
          で畳サーバーへの投票をすることができます。<br/>
          投票いただけると
          <span className='green'>ランキング上位</span>
          になりやすくなり、新規鯖民が増えてサーバーが盛り上がります。<br/>
          初回はアカウント登録が必要ですが、一度してしまえば2日目以降は楽なので、ぜひお願いしますm(__)m
          </p>
        </div>
        <Subtitle subtitle="ツイートして盛り上げよう（＃畳サーバー）"/>
          <div className='subtitle-content'>
            <p>
            日常生活やイベント時など、是非Twitterで
            <Link href={"https://twitter.com/search?q=%23%E7%95%B3%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC&src=typed_query"}>
            #畳サーバー
            </Link>
            をつけてツイートください。公式アカウントがいいねします。<br/>
            皆さんからの感想等、心待ちにしております。
            </p>
          </div>
        <Subtitle subtitle="プロフィールカードを作ってみよう（＃畳サーバープロフィールカード)"/>
          <div className='subtitle-content'>
            <Image className='subtitle-img' src={PleaseProfile2} alt="プロフィールカードお手本"></Image>
            <p>
            当サーバーにはプロフィールカードというものがあります。自己紹介シートと思っていただければ幸いです。<br/>
            こちらも
            <Link href={"https://twitter.com/search?q=%23%E7%95%B3%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%97%E3%83%AD%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%82%AB%E3%83%BC%E3%83%89&src=typed_query&f=top"}>
            #畳サーバープロフィールカード
            </Link>
            でツイートいただければ運営が喜びながら確認します!
            </p>
          </div>
          <div className={Style["download-container"]}>
              <IconContext.Provider value={{ color: '#525a49', size: '25px' }}>
                <Link  className={Style.download} href='/images/Please.images/please2-1.png' width={495} height={298.45} download="">
                  <BsDownload />フォーマットのダウンロードはこちらから
                </Link>
              </IconContext.Provider>
            </div>
        <Subtitle subtitle="サーバー維持の為いろんな方と交流してみてください！"/>
          <div className='subtitle-content'>
            <Image className='subtitle-img' src={PleaseJoin} alt="交流している画像"></Image>
            <p>
            サーバーの維持には莫大な費用が掛かります。<br/>
            普段サブスクライブやご寄付をいただきありがとうございます!<br/>
            ですがお金だけで解決する問題でもありません。<br/>
            普段からたくさん利用してくださる鯖民がいなければサーバーの維持はできません。<br/>
            ぜひお友達もお誘いあわせの上、日々追加されていくコンテンツをお楽しみください!<br/>
            ご意見ご要望等ございましたら 
            <Link href={"https://forms.gle/4v4KK23h1i6UTCae9"}>
            こちら
            </Link>
            でお待ちしております！<br/>
            </p>
          </div>
        <UpArrow/>
      <Igusa text="運営からのお願いをまとめました。
        皆さんが楽しんでくれて、盛り上げてくれることが、サーバー維持の一番の近道だわ。
        さらなるアップデートのために是非ご協力をお願いします。"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </div>
  );
}
export default Please;