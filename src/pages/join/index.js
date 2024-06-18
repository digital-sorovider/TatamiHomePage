// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import UpArrow from '@components/UpArrow';
import JoinBtn from '@components/JoinBtn';
import Igusa from '@components/Igusa';
import Link from 'next/link';
import Image from "next/image";

// 画像インポート
import joinDiscord from '/public/images/Join.images/join1.jpg';
import joinTebex from '/public/images/Join.images/join3.png';
import tatami from '/public/images/Igusa.images/sister1.png';

const Join = () => {
  return (
    <div>
        <Heading heading="サーバー接続方法"/>
        <Subtitle subtitle="畳サーバー公式Discord"/>
        <div className='subtitle-content'>
          <p>
            畳サーバーで遊ぶにはDiscordサーバーへの参加が必須になります。<br/>
            まず最初に<Link href={"/rules/"}>利用規約</Link>をご確認ください！
          </p>
          <JoinBtn size="large"/>
        </div>
        <Subtitle subtitle="Discordに入ったら..."/>
        <div className='subtitle-content'>
          <Image className='subtitle-img' src={joinDiscord} alt="はじめに と 📘ルール をよく見てね"></Image>
          <p>
            Discordに加入しましたら<span className='green'> #📘ルール </span>より利用規約を確認し、同意ボタンを押して規約に同意してください。
            <br />
            同意後は自動的に<span className='green'> Tatamiロール </span>が付与され、サーバーへの接続方法や鯖民交流に必要なチャンネルが表示されるようになります。
          </p>
        </div>
        <Subtitle subtitle="畳サーバーをもっと楽しみたい！"/>
        <div className='subtitle-content'>
          <Image className='subtitle-img' src={joinTebex} alt="Tebexサイト"></Image>
          <p>
            当サーバーには
            <Link href={"https://tatamiserver.tebex.io/"}>
            Tebex
            </Link>
            というサイトを用いた支援制度が存在します。<br/>
            Tebexでの支援をすると
            <span className='green'>畳サーバー愛好家</span> 
            になれます。<br/>
            <span className='green'>畳サーバー愛好家</span>
            になると、<br/>
            ・ユニークな入退出メッセージに変更<br/>
            ・プレイヤー名の前に{'("[畳+]")'}のような特別な文字が追加<br/>
            ・イベントサーバーの貸し出し / 貸し切りが可能に<br/>
            ・ロビーを飛び回れるグラップリングフックを入手<br/>
            などなど、たくさんのメリットがあります！詳しくは
            <Link href={`/subscription/`}>
            こちら
            </Link>
            からご確認ください。
          </p>
        </div>
        <UpArrow/>
      <Igusa text="サーバーや企画への参加の仕方をまとめてみました。
        分からないことがあったらDiscordやお問い合わせで聞くといいわ。
        サーバーで待ってるからね。"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </div>
  );
}
export default Join;