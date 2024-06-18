// リアクトアイコンをインポート
import {BsPlusLg} from 'react-icons/bs'
import { IconContext } from 'react-icons';

// reactの機能をインポート
import React, { useState } from 'react';

// cssインポート
import Style from '@style/pages/Helpre.module.scss';
  
const QuestionAccordion = ({question, answer}) => {
  
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  
  return (
    <div className={Style["QandA-container"]}>
      <div onClick={toggle} className={Style["question-container"]}>
        <div className={Style["q-icon"]}>Q</div>
        <p className={Style.question}>{question}</p>
        <IconContext.Provider value={{ color: '#436644', size: '20px' }}>
          <BsPlusLg className={open? Style.rotate : Style["plus-icon"]}/>
        </IconContext.Provider>
      </div>
      <div className={`${Style["answer-container"]} ${open? Style.isOpen : Style.isClose}`}>
        <div className={Style["a-icon"]}>A</div>
        <p className={Style.answer}>{answer}</p>
      </div>
    </div>
  );
}
export default QuestionAccordion;