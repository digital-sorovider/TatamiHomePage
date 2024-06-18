// cssインポート
import Style from '@style/components/LargeCategory.module.scss';

const LargeCategory = (props) =>{
  return(
    <div className={Style["large-category-container"]}>
        <div className={Style["large-category-line"]}></div>
        <h3 className={Style["large-category"]}>
          {props.LargeCategory}
        </h3>
        <div className={Style["large-category-line"]}></div>
    </div>
  );
}
export default LargeCategory;