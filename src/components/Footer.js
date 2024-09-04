// アイコンインポート
import { ImTwitter } from 'react-icons/im'
import { AiFillYoutube } from 'react-icons/ai'
import { SiTwitch } from 'react-icons/si'
import { SiDiscord } from 'react-icons/si'
import { IconContext } from 'react-icons'

import tatamiIcontebex from '/public/images/icon.images/tatami-icon-tebex.png';

import Image from "next/image";

// cssインポート
import Style from '@style/components/Footer.module.scss';
import Link from 'next/link'

const Footer = () => {

  const FooterIconList = [
    { href: "https://twitter.com/tatamiserver", reactIcon: ImTwitter, isIcon: true },
    { href: "https://www.youtube.com/@tatamiserver", reactIcon: AiFillYoutube, isIcon: true },
    { href: "https://tatamiserver.tebex.io/", reactIcon: tatamiIcontebex, isIcon: false },
    { href: "https://disco.tatamiserver.com", reactIcon: SiDiscord, isIcon: true }
  ]

  return (
    <footer className={Style.footer}>
      <div className={Style["footer-contents-container"]}>
        <p>(c)畳サーバー</p>
        <p className={Style.footerText}>JEでもBEでも遊べるマイクラサーバー</p>
        <ul className={Style.icons}>
          {FooterIconList.map((iconItem, index) => (
              <li key={index}>
                {iconItem.isIcon ? (
                  <IconContext.Provider value={{ color: '#fff', size: '30px' }}>
                    <Link href={iconItem.href} target="_blank" rel="noopener noreferrer">
                      <iconItem.reactIcon />
                    </Link>
                  </IconContext.Provider>

                ) : (
                  <a href={iconItem.href} target="_blank" rel="noopener noreferrer">
                  <Image src={iconItem.reactIcon} alt="Image" width={30} height={30} />
                </a>
                )}
              </li>
            )
          )}
        </ul>
      </div>
    </footer>
  );
}
export default Footer;