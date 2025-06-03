// cssインポート
import Style from '@style/components/SubProduct.module.scss';

import SubProduct from "./SubProcut";

const SubProducts = ({products, filter}) => {
  return (
    <div className={Style["sub-products"]}>
      {products.map((product, index) => {
        return (
          <SubProduct product={product} key={index} filter={filter} />
        );
      })}
    </div>
  );
}
export default SubProducts;