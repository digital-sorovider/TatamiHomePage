// リアクトバーガーメニューをインポート
import { stack as Burger } from 'react-burger-menu';

// コンポーネントインポート
import Link from 'next/link';


const Menu = (props) => {

  const links = [
    { href: "/", text: "Home" },
    { href: "/join/", text: "サーバー参加方法" },
    { href: "/event/", text: "イベント一覧" },
    { href: "/life/", text: "生活鯖Season3始動" },
    { href: "/subscription/", text: "公式特典サービス" },
    { href: "/rules/", text: "利用規約"},
    { href: "/map/", text: "配布マップ" },
    { href: "/history/", text: "畳サーバーの歴史" },
    { href: "/sns/", text: "公式SNS" },
    { href: "/help/", text: "運営への応募" },
    { href: "/contact/", text: "お問い合わせ・意見箱" },
    { href: "/please/", text: "運営からのお願い" },
    { href: "/omikuji/", text: "畳おみくじ"},

  ];

  return (
    <div className='burger-container'>
      <Burger {...props}>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </Burger>
    </div>
  );
};
export default Menu;