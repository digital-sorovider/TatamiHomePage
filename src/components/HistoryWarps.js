// アンカーリンクインポート
import AnchorLink from "react-anchor-link-smooth-scroll";

// reactの機能をインポート
import { useEffect, useState } from "react";

// cssインポート
import Style from '@style/components/HistoryWarp.module.scss';

const HistoryWarps= ({contentRef, scrollPosition, histories}) => {

  const [selected, setSelected] = useState([]);
  
  useEffect(() => {
    judgeInsideOrNot()
  });

  const judgeInsideOrNot= () => {
    histories.map((_,i) => {
        const {top,bottom} = contentRef[i].current.getBoundingClientRect()
    
        const offset = 200;

        const topPos = top + scrollPosition - offset
        const bottomPos = bottom + scrollPosition - offset
        
        setSelected((prevSelected) => {
          prevSelected[i] = scrollPosition> topPos && scrollPosition< bottomPos ? Style['selected']: ''

          return prevSelected
        });
    })
    }

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY >= 300) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
        <div className={`${Style["warp-container"]} ${isScrolled ? Style['is-scrolled'] : ''}`}>
          <ul className={Style["warp-content"]}>
            {histories.map(([year],i) =>
              <AnchorLink href={'#'+year} key={i}>
                <li className={`${Style["warp-year"]} ${selected[i]} `}>{year}</li>
              </AnchorLink>
            )}
          </ul>
        </div>
    );
}
export default HistoryWarps;