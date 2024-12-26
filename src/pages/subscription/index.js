// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import UpArrow from '@components/UpArrow';
import LargeCategory from '@components/LargeCategory';
import Igusa from '@components/Igusa';
import Image from "next/image";
import Link from "next/link";

// 画像インポート
import tebeximg from '/public/images/Subscription.images/tebeximg.png';
import sub1 from '/public/images/Subscription.images/sub1-1.png';
import sub2 from '/public/images/Subscription.images/sub1-2.png';
import sub3 from '/public/images/Subscription.images/sub1-3.png';
import sub6 from '/public/images/Subscription.images/sub1-6.png';
import sub8 from '/public/images/Subscription.images/sub1-8.png';
import tebex from '/public/images/Subscription.images/tebex.png';
import tatami from '/public/images/Igusa.images/sister1.png';
import debug from '/public/images/Subscription.images/debug.png';

// 画像サイズがおかしい時は…
// heightとwidthは基本width４０％のheight:autoにしてます。
// 画像サイズそれぞれ個別で変更したいときは、Subscription.module.scssで個別にcssを書いてもらうとサイズを変更できます！

// cssインポート
import Style from '@style/pages/Subscription.module.scss';

const Subscription = () => {
// 各メリットはここに掲載してます！
  const LargeCategoryContent = [
    { title: "イベント鯖を貸し出しできる！", img: sub3, description: "畳のイベントを使った主催が可能です。さらに畳サーバー愛好家++以上の方は、貸し切り(身内だけで開催)も可能です！" },
    { title: "限定企画に参加できる！", img: sub1, description: "スコットランドヤードや人数制限のある配布マップ等の限定企画に参加できます！" },
    { title: "通常イベントも優先参加可能！", img: sub2, description: "マイクラバカ人狼のような参加人数制限があるイベントについても、より優先的にゲームに参加できます。" },
    { title: "お名前の横にバッジが付く", img: sub6, description: "畳支援者の証となるバッジが付与され、他の方と違った雰囲気を出すことが可能です。+、++、+++の3段階があり、より上位になると入退室メッセージも豪華になります！"},
    { title: "ロビー鯖で空を飛べる", img: sub8, description: "支援者は、畳のロビーを自由に飛び回ることができます。さらに畳サーバー愛好家++以上の方は、飛行スピードを変更したり、立体起動のような挙動をする[タタマーグラップリングフック]がもらえます！" },
    { title: "先行体験に参加できるかも…", img: debug, description: "支援者に対し、アップデート予定の新イベントや新機能のデバッグをお願いすることがあるかもしれません。ご参加いただける方は、フィードバック(改善案やご感想)をいただけますと幸いです。" },
  ];

  return (
    <>
      <Heading heading="畳公式特典サービス Tebex" />
      <Subtitle subtitle="Tebexとは？" />
      <div className='subtitle-content'>
        <Image className='subtitle-img' src={tebeximg} alt="tebexの画像"></Image>
        <p>
        畳サーバーには
            <Link href={"https://tatamiserver.tebex.io/"}>
            Tebex
            </Link>
            というサイトを用いた支援制度が存在します。<br/>
            いただいたご支援は、<br/>
            ・サーバーの維持や強化<br/>
            ・新機能を作るためのプラグインの購入<br/>
            ・外注依頼をする際の費用<br/>
            などの目的で利用させていただきます。<br/>

            Tebexでは月額制で入手できる特典[畳サーバー愛好家]や、<br/>
            買い切りでアイテムを入手できる特典を用意しています。<br/>
            是非一度ご覧になってみてください！<br/>
        </p>
      </div>
      <Subtitle subtitle="畳サーバー愛好家の特典" />
      <div className='subtitle-content'>
        <div className={Style["LargeCategory-wrapper"]}>
          {LargeCategoryContent.map(({ title, img, description }) => {
            return (
              <div key={title} className={Style["LargeCategory-container"]}>
                <LargeCategory LargeCategory={title} />
                <div className={Style["LargeCategory-content"]}>
                  <Image src={img} alt="サブスクライブイメージ画像"></Image>
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Subtitle subtitle="公式特典サービス Tebexサイトはこちら" />
      <div className={Style["subscription-subtitle-content"]}>
        <p>↓ご支援をご検討いただける方は、下記アイコンを押下ください↓</p>
        <Link href={"https://tatamiserver.tebex.io/"} target="_blank" >
          <Image src={tebex} className={Style["tebex"]} alt="tebexのロゴ" width={"160"}></Image>
        </Link>
        <p>
          平素より、畳サーバーの活動に関心をお寄せくださり、
          誠にありがとうございます。<br />
          この度、サーバー維持の資金として、ご寄付を募ることに致しました。
        </p>
        <ul className={Style["subscription-used"]}>
          <li>[使用実績/使用予定]</li>
          <li>Minecraft有料サーバーのレンタル</li>
          <li>サーバーや通信のアップグレード</li>
          <li>新規イベントやシステムの開発</li>
          <li>畳サーバーの宣伝・広告</li>
        </ul>
        <p>
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
      <UpArrow />
      <Igusa text="ここではサブスクライバーのメリットや支援者への御礼を掲載しているわ。
        サーバーの維持って結構金銭的に大変なのよね…。
        いつもご支援いただきありがとうございます。"
        image={tatami}
        creator="ナミヤ和 様"
      />
    </>
  );
}
export default Subscription;
// 各メリットは上の方 Classにあります