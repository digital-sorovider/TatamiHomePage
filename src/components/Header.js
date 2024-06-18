// コンポーネントインポート
import Link from 'next/link';
import Menu from '@components/Menu';
import JoinBtn from '@components/JoinBtn';
import Image from "next/image";

// 画像インポート
import logo from '/public/images/Home.images/logo.png';

// cssインポート
import Style from '@style/components/Header.module.scss';

const Header = () => {
  return (
    <header className={Style.header}>
        <Link href={`/`}>
          <Image className={Style.logo} src={logo} alt="畳アイコン" />
        </Link>
        <div className={Style.rightContent}>
          <JoinBtn size="small"/>
          <div className={Style.menu}>
            <Menu right noOverlay/>
          </div>
        </div>
    </header>
  );
}
export default Header;