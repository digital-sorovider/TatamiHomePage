// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import UpArrow from '@components/UpArrow';
import QuestionAccordion from '@components/QuestionAccodion';
import Igusa from '@components/Igusa';
import Link from 'next/link';

// 画像インポート
import tatami from '/public/images/Igusa.images/sister1.png';
import detail from '/public/images/help.images/detail.png';
import staffRules from '/public/images/help.images/staffRules.png';
import application from '/public/images/Home.images/application.png';

// cssインポート
import HelperStyle from '@style/pages/Helpre.module.scss';
import SubProducts from '@components/SubProducts';
import SubTitle from '@components/Subtitle';

const Help = () => {

  const QuestionList=[
    {
      question:"どんな役職を募集されていますか？", 
      answer:<>上に掲載されている「詳細はこちらから」(MINEIDEA)をご確認ください。<br/>
               何を作りたくて、どんな役職を募集していて、こんな方に来てもらいたいです！<br/>
               という情報を掲載しております。</>,
    },
    {
      question:"面接の流れを教えてください。", 
      answer:<>まずは上記2つのページをご確認いただき、MINEIDEAに掲載されたGoogleフォームで開発経験や希望する班をお伺いします。回答を送信するとDiscordの招待リンクが届きますので入室してください。<br/>
                入室後 #面接の流れ チャンネルをご確認の上、#面接日時決定 チャンネルで面接希望日時を複数記入いただきます。面接は30分程度を予定しております。(複数班希望されると長くなりやすいです。)<br/>
                面接終了後、面接官同士で審議を行い合否通知をDiscord上でお出しします。</>,
    },
    {
      question:"まだ勉強中で力になれるかわかりません。",
      answer:<>現時点での実力は面接でお聞きしますが、まったくの無知(初学者)でない限り、さほど問題にならないことが多いです。<br/>
              運営への意欲があり、主体的に活動いただける方をお待ちしております。<br/>
              ご希望であれば、勉強会・作業会もご用意いたします。</>,
    },
    {
      question:"コマンドに興味はあるけど、やったことはないので不安です。", 
      answer:<>ご安心ください。畳サーバーにはコマンドの練習ができる&quot;データパック研修&quot;という制度がございます。<br/>3週間に分けて無理なく楽しみながら進めることができるので、初学者でも安心です!<br/>また、プラグインに関しても運営が色々教えてくれます!</>,
    },
    {
      question:"絶対に参加しなければならない日はありますか？", 
      answer:<>2025年1月現在、毎月1回進捗確認と情報共有のためのミーティングを開催しています。<br/>
              ミーティングは強制参加ではありませんが、スタンプでの反応やアンケートへの回答は頂くようにお願いしております。</>,
    },
    {
      question:"運営になることで優遇されることはありますか？", 
      answer:<>ございません。イベント優先参加等もございません。強いて言うなら、新イベントのデバッグに参加できることくらいだと思います。</>,
    },
    {
      question:"報酬はもらえますか？", 
      answer:<>お支払いしたいところですが、現状サーバーの維持だけで手一杯です。あくまでお手伝いのつもりで応募をお願いしたいです。
                お仕事のつもりで応募するのはおやめください。</>,
    },
    {
      question:"数か月後忙しくなるのがわかっています。どうしたらよいですか？", 
      answer:<>畳サーバーでは休職制度を設けています。2週間以上のお休みを希望する場合、「希望休職期間・理由」を報告いただければ一時お休みすることが可能です。<br/></>,
    },
  ]

  const CheckPointList = [
    { href: `https://mineidea.net/projects/6160894485`, img: detail, imgTitle: "MINE IDEA", title: "詳細はこちらから", description: "募集役職や募集要項などを掲載しています。応募の際もここから！" },
    { href: `/rules/staff/`, imgTitle: "運営規約", img: staffRules, title: "運営規約", description: "運営になるうえで守らなければいけないルールを掲載しています。" },
  ]

  return (
    <div>
        <Heading heading="運営応募"/>
        <Subtitle subtitle="運営って何？"/>
        <div className='subtitle-content'>
          <p>
            運営とは、畳サーバーのイベント開発やマップ制作、テクスチャ作成、企画、広報等<br/>様々な分野でお手伝いをいただいている方の総称です。<br/>
            もちろん全てを出来なければならないわけではありませんし、足りない技術は覚えながら補えば構いません。<br/>
          </p>
        </div>

        <SubTitle subtitle="確認事項" />
        <div className="Products">
          <SubProducts products={CheckPointList} />
        </div>

        <Subtitle subtitle="よくある質問"/>
        <div className={HelperStyle["Question-wrapper"]}>
        {QuestionList.map(({question, answer}, index) =>
          <QuestionAccordion
            key={index}
            question={question}
            answer={answer}
          />
        )}
        </div>

        <UpArrow/>
      <Igusa text="ここでは畳サーバーの運営募集とよくある質問について掲載しているわ。
        開発でも建築でもテクスチャでも動画編集でもなんでもOK!
        是非応募を検討してみてね。"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </div>
  );
}
export default Help;