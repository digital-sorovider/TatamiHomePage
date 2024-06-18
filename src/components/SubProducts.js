// cssインポート
import Style from '@style/components/SubProduct.module.scss';

import SubProduct from "./SubProcut";

const SubProducts = ({products}) => {
  return (
    <div className={Style["sub-products"]}>
      {products.map((product, index) => {
        return (
          <SubProduct product={product} key={index} />
        );
      })}
    </div>
  );
}
export default SubProducts;