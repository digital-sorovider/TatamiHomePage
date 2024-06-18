// コンポーネントインポート
import Link from 'next/link';

// 画像インポート
import Style from '@style/components/JoinBtn.module.scss'

const JoinBtn = ({ size }) => {

  const className = `${Style['join-btn']} ${size === 'large' ? Style['join-btn-large'] : Style['join-btn-small']}`;

  return (
    <Link href="https://disco.tatamiserver.com">
      <button className={className}>参加はこちらから！</button>
    </Link>
  );
};
export default JoinBtn;