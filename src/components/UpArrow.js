// リアクトアイコンインポート
import { IconContext } from 'react-icons'
import {IoIosArrowUp} from 'react-icons/io'

// cssインポート
import Style from '@style/components/UpArrow.module.scss'

const UpArrow = () => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={Style["arrow-icon-container"]}>
      <div className={Style["arrow-icon"]} onClick={returnTop}>
        <IconContext.Provider value={{ color: '#67966a', size: '70px'}}>
          <IoIosArrowUp/>
        </IconContext.Provider>
      </div>
    </div>
  );
}
export default UpArrow;