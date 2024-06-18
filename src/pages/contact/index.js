// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import UpArrow from '@components/UpArrow';
import Igusa from '@components/Igusa';
import Sister1 from '/public/images/Igusa.images/sister1.png';
import { useForm } from "react-hook-form";

// cssインポート
import Style from '@style/pages/Contact.module.scss';

import { useRouter } from 'next/router';
import { required } from 'react-admin';

const Contact = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const topicCheckboxes = [
    'Minecraft畳サーバーそのものに対して',
    '生活サーバーについて',
    'イベントサーバーについて',
    '24時間イベントサーバーについて',
    '配信について',
    '畳サーバーの認証について',
    '配布データ「マイクラスコットランドヤード」について',
    '配布データ「マイクラバカ人狼」について',
    '畳サーバー 運営へのご希望について',
  ]

  const CheckboxTopic = () => {
    return (
      topicCheckboxes.map((topicCheckbox, i) => {
        return (
          <div className={Style["topicCheckboxes"]} key={topicCheckbox}>
            <input className={Style["Input-chackbox"]} id={"checbox" + i} type="checkbox" {...register('entry-370516198', {
              required:true,
            })}
              value={topicCheckbox} />
            <label htmlFor={"checbox" + i} className={Style["Input-chackbox-label"]}>
              {topicCheckbox}
            </label>
          </div>
        );
      })
    );
  }

  const onSubmit = async (data) => {
    let formData = {}
    for(const [key, value] of Object.entries(data)) {
      const newKey = key.replaceAll('-', '.')
      formData[newKey] = value
    }

    const res = await fetch('/api/sendContactFormData', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })

    if(res.status === 200) {
      router.push({pathname: '/contact/thanks'})
    }
    else {
      // console.log('error')
    }
  }


  return (
    <div>

      <Heading heading="お問い合わせ・意見箱" />
      <Subtitle subtitle="お気軽にお問い合わせください" />
      <div className='subtitle-content'>
        <div className={Style["Contact-contents-wrapper"]}>
          <p>
            畳サーバーに関するご質問・ご提案・ご要望等を受け付けております。匿名での送信も可能です。<br />
            お気軽にお問い合わせください。※基本的に返信をすることはございません。<br />
            返信を希望される場合は、Discordの
            <span className={Style["bold"]}>＃チケット作成</span>
            をご利用ください。
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={Style["Input-item"]}>
              <div className={Style["item"]}>
                <p className={Style["Norequired-tag"]}>任意</p>
                <label htmlFor="name" className={Style["item-name"]}>ニックネームをお書きください。(匿名での送信も可能です)</label>
              </div>
              <div className={Style["Input-screen"]}>
                <input type="text" id="name" placeholder="ニックネームをお書きください。" {...register('entry-666156945')} ></input>
              </div>
            </div>
            <div className={Style["Input-item"]}>
              <div className={Style["item"]}>
                <p className={Style["Norequired-tag"]}>任意</p>
                <label htmlFor="name" className={Style["item-name"]}>返信をご希望の方は、連絡のつくアカウントやメールアドレスをお書きください。</label>
              </div>
              <div className={Style["Input-screen"]}>
                <input type="text" {...register('entry-1178584302')} id="mail" placeholder="example@example.com"></input>
              </div>
            </div>
            <div className={Style["Input-item"]}>
              <div className={Style["item"]}>
                <p className={Style["required-tag"]}>必須</p>
                <label htmlFor="name" className={Style["item-name"]}>お問い合わせの内容を選択してください。(複数選択可能)</label>
              </div>
              <div className={Style["Input-screen"]}>
              {errors['entry-370516198'] && <sapn className={Style["error-mesege"]}>※お問い合わせの内容を１つ以上選択してください</sapn>}
                <CheckboxTopic />
                <div className={Style["topicCheckboxes"]}>
                  <input className={Style["Input-chackbox"]} id="other-option" type="checkbox" {...register('entry-370516198',{
                    required:true,
                  })}
                    value="__other_option__"  />
                  <label htmlFor="other-option" className={Style["Input-chackbox-label"]}>その他:</label>
                  <input type="text" className={Style["other-option"]} {...register('entry-370516198-other_option_response')}/>
                </div>
              </div>
            </div>
            <div className={Style["Input-item"]}>
              <div className={Style["item"]}>
                <p className={Style["required-tag"]}>必須</p>
                <label htmlFor="name" className={Style["item-name"]}>お問い合わせのタイトルを入力してください</label>
              </div>
              <div className={Style["Input-screen"]}>
                {errors['entry-207957247'] && <sapn className={Style["error-mesege"]}>※お問い合わせのタイトルを入力してください</sapn>}
                <input type="text" {...register('entry-207957247',{
                  required: true,
                })} id="title" placeholder="お問い合わせのタイトル"></input>
              </div>
            </div>
            <div className={Style["Input-item"]}>
              <div className={Style["item"]}>
                <p className={Style["required-tag"]}>必須</p>
                <label htmlFor="name" className={Style["item-name"]}>お問い合わせの内容をご記入ください</label>
              </div>
              <div className={Style["Input-screen"]}>
              {errors['entry-1718713665'] && <sapn className={Style["error-mesege"]}>※お問い合わせの内容をご記入ください</sapn>}
                <textarea {...register('entry-1718713665', {
                  required:true,
                })} 
                id="inquiry-details"
                  placeholder="お問い合わせの内容" ></textarea>
                  <p>※画像や動画のアップロードを希望される場合は、discordの #チケット作成 チャンネルまでお願いします。</p>
              </div>
            </div>
            <div className={Style["Reserv-btn"]}>
              <button id="form-submit-button" type="submit">
                <p>上記の内容で送信する</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <UpArrow />
      <Igusa text="ここではお問い合わせについて掲載しているわ。
        うちの鯖主はお問い合わせフォームを作る技術はもっていないみたい…。
        お問い合わせ・意見箱というGoogleフォームがあるからそれを使ってね。"
        image={Sister1}
        creator="ナミヤ 和 様"
      />
    </div>
  );
}
export default Contact;