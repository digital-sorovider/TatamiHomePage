
// コンポーネントインポート
import Heading from '@components/Heading';

// cssインポート
import Style from '@style/pages/Contact.module.scss';
import Link from 'next/link';

const Thanks = () => {
  return (
    <div>
      <Heading heading="お問い合わせ・意見箱" />
      <div className={Style["thanks-card"]}>
        <div className={Style["card-text"]}>
          <p>お問い合わせありがとうございます。<br />送信完了しました。</p>
          <Link href={'/'}>
            <button>ホームに戻る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Thanks;