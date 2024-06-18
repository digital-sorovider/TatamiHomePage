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
import sub4 from '/public/images/Subscription.images/sub1-4.png';
import sub5 from '/public/images/Subscription.images/sub1-5.png';
import sub6 from '/public/images/Subscription.images/sub1-6.png';
import sub7 from '/public/images/Subscription.images/sub1-7.png';
import tebex from '/public/images/Subscription.images/tebex.png';
import tatami from '/public/images/Igusa.images/sister1.png';

// cssインポート
import Style from '@style/pages/Subscription.module.scss';

const Subscription = () => {

  const LargeCategoryContent = [
    { title: "限定企画に参加できる！", img: sub1, description: "村人防衛戦・スコットランドヤード・人数制限のある配布マップ等の限定企画に参加できます！" },
    { title: "通常イベントも優先参加可能！", img: sub2, description: "人狼のような参加人数制限があるイベントについても、より優先的にゲームに参加できます。" },
    { title: "Twitchで広告がつかない！", img: sub3, description: "Twitchの生配信を広告なしで視聴できるようになります。快適です!" },
    { title: "チャネルポイントが貯まりやすい！", img: sub4, description: <>Twitchの視聴や継続ログインで得られるチャンネルポイント「Takika」が貯まりやすくなります!<br />貯めたポイントは、ゲームリクエストや企画提案、歌枠での曲のリクエスト等に使うことができます。</> },
    { title: "専用スタンプが使用可能に！", img: sub5, description: "Twitch及びDiscordでオリジナルスタンプが利用可能になります!配信や会話を盛り上げよう！" },
    { title: "お名前の横にバッジが付く", img: sub6, description: <>サブスクライバーの証となるバッジが付与され、他の方と違った雰囲気を出すことが可能です。<br />しかもこのバッジは、サブスク年月によって成長していきます。</> },
    { title: "付近vcMODが使える(Java版限定)", img: sub7, description: <>サブスクライバー限定で、付近vcMODでの通話ができるようになりました!<br />味方との連携をする際や敵の位置を察知する際など、楽しさの幅がぐっと広がります！</> },
  ];

  return (
    <>
      <Heading heading="サブスクライブ・ご寄付について" />
      <Subtitle subtitle="サブスクライブとは？" />
      <div className='subtitle-content'>
        <Image className='subtitle-img' src={tebeximg} alt="tebexの画像"></Image>
        <p>
        当サーバーには
            <Link href={"https://tatamiserver.tebex.io/"}>
            Tebex
            </Link>
            というサイトを用いた支援制度が存在します。<br/>
            いただいたご支援は、<br/>
            ・サーバーの維持や強化<br/>
            ・新機能を作るためのプラグインの購入<br/>
            ・外注依頼をする際の費用<br/>
            などの目的で利用させていただきます。<br/>

            Tebexでは月額制(サブスクライブ)で入手できる特典や、<br/>
            買い切りでアイテムを入手できる特典を用意しています。<br/>
            今後、随時プランを追加予定です。<br/>
            是非一度ご覧になってみてください！<br/>
        </p>
      </div>
      <Subtitle subtitle="サブスクライブのメリット！" />
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
      <Subtitle subtitle="ご寄付" />
      <div className={Style["subscription-subtitle-content"]}>
        <p>ご寄付はこちらをクリック↓</p>
        <Link href={"https://tatamiserver.tebex.io/"} target="_blank" >
          <Image src={tebex} className={Style["tebex"]} alt="tebexのロゴ" width={"160"}></Image>
        </Link>
        <p>
          平素より、畳サーバー並びに鯖主:おとたきの活動に関心をお寄せくださり、
          誠にありがとうございます。<br />
          この度、サーバー維持の資金として、ご寄付を募ることに致しました。
        </p>
        <ul className={Style["subscription-used"]}>
          <li>[使用実績/使用予定]</li>
          <li>Minecraft有料サーバーのレンタル</li>
          <li>配信機材　静音キーボード　オーディオインターフェース等の購入</li>
          <li>新規ゲームやシステムの開発</li>
        </ul>
      </div>
      <UpArrow />
      <Igusa text="ここではサブスクライバーのメリットや支援者への御礼を掲載しているわ。
        サーバーの維持って結構金銭的に大変なのよね…。
        いつもご支援いただきありがとうございます。"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </>
  );
}
export default Subscription;