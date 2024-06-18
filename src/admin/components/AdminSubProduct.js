// cssインポート
import Style from '@style/components/SubProduct.module.scss';
import AdminStyle from '@admin/styles/Admin.module.scss'

import Image from "next/image";

const AdminSubProduct = ({product: { imgTitle, img }}) => {
  return (
    <div className={`${Style.product} ${AdminStyle.productCard}`}>
      <div className={Style["product-img-box"]}>
        <div className={Style["text-box"]}>
          <div className={Style.gara}>
            <h3>{imgTitle}</h3>
          </div>
        </div>
        <div className={Style.fill}>
          <Image src={img} width={400} height={200} alt={imgTitle} />
        </div>
      </div>
    </div>
  );
}
export default AdminSubProduct;