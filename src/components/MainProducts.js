// コンポーネントインポート
import Link from "next/link";

import Image from "next/image";

// cssインポート
import Style from '@style/components/MainProduct.module.scss';

const MainProducts = ({products}) => {
  return (
    <div className={Style["main-products"]}>
      {products.map(({href, img, title, description},index) => {
        return (
            <Link href={href} key={index}>
              <div className={Style["product-img-box"]}>
                <div className={Style.fill}>
                  <Image src={img} alt="サーバー参加方法" />
                </div>
              </div>
              <div className={Style["product-text"]}>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </Link>
        );
      })}
    </div>
  );
}
export default MainProducts;