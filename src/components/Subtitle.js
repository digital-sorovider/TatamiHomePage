// cssインポート
import Style from  '@style/components/Subtitle.module.scss';

const SubTitle = (props) => {
  return (
    <div className={Style["subtitle-container"]}>
      <h2 className={Style.subtilte}>
        <span>
        {props.subtitle}
        </span>
      </h2>
    </div>
  );
}
export default SubTitle;