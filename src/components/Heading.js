// cssインポート
import Style from '@style/components/Heading.module.scss';

const Heading = (props) => {
  return (
    <div className={Style["heading-container"]}>
        <div className={Style["heading-line"]}></div>
        <h1 className={Style["heading-text"]}>
          {props.heading}
        </h1>
        <div className={Style["heading-line"]}></div>
    </div>
  );
}
export default Heading;