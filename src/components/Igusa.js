// reactの機能をインポート
import React, { useState } from 'react';

import Image from "next/image";

// 画像インポート
import tatamiMaru from '/public/images/Igusa.images/tatamimaru.png';
import kyuusu from '/public/images/Igusa.images/kyuusu.svg'

// cssインポート
import Style from '@style/components/Igusa.module.scss';

const Igusa = (props) => {

  const [showImage, setShowImage] = useState(false);

  function handleClick() {
    setShowImage(!showImage);
  }

  return (
    <>
      <div className={`${Style['igusa-maru']} ${!showImage ? Style['show']: Style['visible'] }`} src={tatamiMaru} alt="Image" onClick={handleClick}>
        <Image className={Style['kyuusu']} src={kyuusu} alt='急須' />
        <p>？？？</p>
      </div>
      <div className={`${Style['igusa-wrapper']} ${showImage ? Style['show']: Style['visible']}`} onClick={handleClick}>
        <div className={Style['igusa-container']}>
          <div className={Style['igusa']}>
            <Image src={props.image} alt="Image" className={Style['igusa-img']} />
            <div  className={Style['igusa-text-container']}>
              <p>{props.text}</p>
              <p>提供：{props.creator}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Igusa;