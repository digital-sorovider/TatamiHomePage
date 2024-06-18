// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import UpArrow from '@components/UpArrow';
import SubProducts from '@components/SubProducts';
import Igusa from '@components/Igusa';

// 画像インポート
import tatami from '/public/images/Igusa.images/sister1.png';

// cssインポート
import Style from '@style/pages/map.module.scss';
import { groupBy } from '@util/Query';
import { getAll } from '@lib/firebase';

const Map = ({maps}) => {
  return (
    <div>
        <Heading heading="配布マップ等"/>
          {maps.map(([groupName, maps]) => (
            <div key={groupName}>
              <Subtitle subtitle={groupName} />
              {groupName.includes('プラグイン') && <p className={Style["note"]}>※プライグインの動作確認にはpaperまたはspigot環境が必要です。</p>}
              <div className="Products">
                <SubProducts products={maps}/>
              </div>
            </div>
          ))}
        <UpArrow/>
      <Igusa text="ここでは畳サーバーが提供している配布マップ等を掲載しているわ。
        クリックすれば配布先に飛べるはずだわ。
        ぜひDLやハッシュタグで応援をしてね!"
        image={tatami}
        creator="ナミヤ 和 様"
      />
    </div>
  );
}

export async function getStaticProps() {
  const mapData = (await getAll('map', { sort: [{ field: 'updatedAt', order: 'desc' }]})).map(map => {
    return {
      ...map,
      href: map.url || `/map/${map.id}`,
      img: map.mainImg?.src || '',
      imgTitle: map.title,
      mapTypeName: map.mapType.title || ''
    }
  })

  const maps = groupBy(
    mapData,
    'mapTypeName',
    {
        groupSort: ['mapType.sortNum', 'asc']
    }
  )

  return {
      props: { maps },
      revalidate: 60,
  }
}

export default Map;