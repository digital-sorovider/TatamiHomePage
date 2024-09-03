// アイコンインポート
import { BsTwitterX } from "react-icons/bs";
import { AiFillYoutube } from 'react-icons/ai';
import { SiTwitch } from 'react-icons/si';
import { SiDiscord } from 'react-icons/si';
import { IconContext } from 'react-icons';

import tatamiIcontwitch from '/public/images/icon.images/tatami-icon-twitch.png';

import Image from "next/image";

// cssインポート
import Style from '@style/components/SnsIcons.module.scss';

const SnsIcons = () => {
  const FooterIconList = [
    { href: "https://x.com/tatamiserver", reactIcon: BsTwitterX, isIcon: true },
    { href: "https://www.youtube.com/@tatamiserver", reactIcon: AiFillYoutube, isIcon: true },
    { href: "https://twitch.tv/ototaki0622", reactIcon: tatamiIcontwitch, isIcon: false },
    { href: "https://disco.tatamiserver.com", reactIcon: SiDiscord, isIcon: true }
  ];

  return (
    <ul className={Style.icons}>
      {FooterIconList.map((iconItem, index) => (
        <li key={index}>
          {iconItem.isIcon ? (
            <IconContext.Provider value={{ color: '#fff', size: '30px' }}>
              <a href={iconItem.href} target="_blank" rel="noopener noreferrer">
                <iconItem.reactIcon />
              </a>
            </IconContext.Provider>
          ) : (
            <a href={iconItem.href} target="_blank" rel="noopener noreferrer">
              <Image src={iconItem.reactIcon} alt="Image" width={30} height={30} />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SnsIcons;