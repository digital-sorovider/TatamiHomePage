// コンポーネントインポート
import Link from "next/link";

// cssインポート
import Style from '@style/components/SubProduct.module.scss';

import Image from "next/image";
import MultiLineText from "./MultiLineText";

const SubProduct = ({product: { href, imgTitle, img, title, description}, filter}) => {
  return (
    <div className={Style.product}>
      <Link href={href}>
        <div className={Style["product-img-box"]}>
          {/* <div className={Style["text-box"]}>
            <div className={Style.gara}>
              <h3>{imgTitle}</h3>
            </div>
          </div> */}
          <div className={Style.fill} style={{filter}}>
            <Image src={img} width={600} height={300} alt={imgTitle} />
          </div>
        </div>
        <div className={Style["product-text"]}>
          <h2>{title}</h2>
          <MultiLineText text={description} />
        </div>
      </Link>
    </div>
  );
}
export default SubProduct;