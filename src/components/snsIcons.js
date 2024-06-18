// アイコンインポート
import { ImTwitter } from 'react-icons/im'
import { AiFillYoutube } from 'react-icons/ai'
import { SiTwitch } from 'react-icons/si'
import { SiDiscord } from 'react-icons/si'
import { IconContext } from 'react-icons'

// cssインポート
import Style from '@style/components/SnsIcons.module.scss';

const SnsIcons = () => {

  const FooterIconList = [
    { href: "https://twitter.com/tatamiserver", reactIcon: ImTwitter },
    { href: "https://www.youtube.com/@tatamiserver", reactIcon: AiFillYoutube },
    { href: "https://twitch.tv/ototaki_soji", reactIcon: SiTwitch },
    { href: "https://disco.tatamiserver.com", reactIcon: SiDiscord }
  ]
  
  return (
        <ul className={Style.icons}>
            {FooterIconList.map((iconItem,index) => {
              return (
                <IconContext.Provider value={{ color: '#fff', size: '30px' }} key={index}>
                  <li>
                    <a href={iconItem.href} target="_blank" rel="noopener noreferrer">
                      <iconItem.reactIcon />
                    </a>
                  </li>
                </IconContext.Provider>
              );
            })}
        </ul>
  );
}
export default SnsIcons;