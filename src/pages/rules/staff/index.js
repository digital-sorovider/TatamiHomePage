// リアクトアイコンインポート
import {BsDownload} from 'react-icons/bs';
import { IconContext } from 'react-icons';

// コンポーネントインポート
import Heading from '@components/Heading';
import Subtitle from '@components/Subtitle';
import UpArrow from '@components/UpArrow';
import Link from 'next/link';
import Igusa from '@components/Igusa';
import Image from "next/image";
// 画像インポート
import PleaseVote from '/public/images/Please.images/please1.png';
import PleaseProfile1 from '/public/images/Please.images/please2-1.png';
import PleaseProfile2 from '/public/images/Please.images/please2-2.png';
import PleaseJoin from '/public/images/Please.images/please3-1.png';
import tatami from '/public/images/Igusa.images/sister1.png';

// cssインポート
import Style from '@style/pages/Please.module.scss';

const StaffRules = () => {
  return (
    <div>
        <Heading heading="畳サーバー 運営規約"/>
        <div className='subtitle-content'>
          <p>運営規約(以下、当規約)は、畳サーバー(以下、当サーバー)運営が開発・建築等の制作をしやすい環境を整備することを目的とし、必要なルールを記載したものである。</p>
        </div>
        <Subtitle subtitle="第1条 定義"/>
        <div className='subtitle-content'>
          <p>
            当規約で使用している用語の定義は以下のとおりである。<br />
            1. オーナーは、当サーバーにおける全責任を背負う者を指す。Ototaki0622が該当。<br />
            2. アドミンは、オーナーが認めた、当サーバーを中心となってまとめる者を指す。オーナーとサブオーナーもアドミンに含む。<br />
            3. 運営は、オーナーやアドミンが認めた、当サーバーの開発や建築等の制作をする者を指す。オーナー、サブオーナーとアドミンも運営に含む。<br />
            4. 鯖民は、当サーバーに接続を行った者 または 畳Discordに参加した者を指す。
          </p>
        </div>
        
        <Subtitle subtitle="第2条 適用範囲"/>
        <div className='subtitle-content'>
          <p>
            当規約の適用範囲は、運営、運営に所属したことがある者 及び 運営に応募する者を指す。<br />
            運営希望を出した時点で当規約の内容を理解し、同意したものとする。
          </p>
        </div>

        <Subtitle subtitle="第3条 運営の権利と努力義務"/>
        <div className='subtitle-content'>
          <p>
            1. 運営は運営Discord・タスク管理用ツール・内部用Wiki・建築用のBuildサーバー に参加する権利を有する。<br />
            2. 運営のうち、広報を担当する者には、ブログ、SNS、動画格納ドライブ 等に参加する権利を付与することがある。<br />
            3. 当サーバーに関するやり取りは、原則DMではなく各プロジェクトや部署のチャンネルを使用することとする。
          </p>
        </div>

        <Subtitle subtitle="第4条 制作物の権利と義務"/>
        <div className='subtitle-content'>
          <p>
            1. 当サーバーの運営として作成された制作物(プラグイン・建築物・テクスチャなど)に関する著作権その他一切の権利（著作権については、 著作権法第27条及び第28条の権利を含む。）を当サーバーに譲渡する。 (当サーバー用に作成された制作物において著作者人格権を行使しないこと。)<br />
            　 よって、当サーバーでの使用を禁じたり、データを持ち出したりしてはならない。これは運営脱退後でも適用される。<br />
            　 ただし、アドミンが認める場合はこの限りではない。<br />
            2. オーナー、制作者の双方の合意があれば、『運営所属前の、個人で作っていた制作物」に対し、著作権その他一切の権利（著作権については、 著作権法第27条及び第28条の権利を含む。）を当サーバーに譲渡できるものとする。(譲渡された制作物において著作者人格権を行使しないこと。)<br />
            　 譲渡した場合、当サーバーでの使用を禁ずることはできない。これは運営脱退後でも適用される。<br />
            　 ただし、アドミンが認める場合はこの限りではない。<br />
            3. 制作物の配布・OSSライセンスによる公開・譲渡等はしてはならない。
          </p>
        </div>

        <Subtitle subtitle="第5条 運営の禁止行為"/>
        <div className='subtitle-content'>
          <p>
            1. 運営は自身の権限や立場でしか知りえない情報を、本来その情報を知り得ない人物に対して共有してはならない。これは運営脱退後でも適用される。<br />
            2. 運営は自身が持つ権限の濫用をしてはならない。(不必要な/kick、クリエイティブモードでのアイテム複製等が濫用に該当)<br />
            3. 運営は当サーバーのイメージや評判を故意に損なわせる表現をしてはならない。<br />
            4. 運営は当サーバーの制作物や所有物を不適切に取得してはならない。<br />
            5. 運営を辞退 または 剥奪となった場合は、畳運営として使用していた共有物へのログインや使用をしてはならない。<br />
            6. その他、オーナーまたはアドミンが不適格と判断する行為や表現を行ってはならない。
          </p>
        </div>

        <Subtitle subtitle="第6条 ペナルティと剥奪"/>
        <div className='subtitle-content'>
          <p>
            以下に該当する場合、運営に対し厳重注意や運営剥奪を実施することがある。<br />
            1. 当規約や利用規約等のルールに違反した者<br />
            2. トラブルや問題を起こし、サーバー運営に大きく支障をきたした者<br />
            3. 制作に自ら意欲的に取り組めない者 または 生産性が著しく低い者<br />
            4. 休職申請をせず、2週間以上制作や連絡が見られない者<br />
            5. その他、オーナーやアドミンが不適格であると判断した者
          </p>
        </div>

        <br /><br />

        <div className='subtitle-content'>
          <p>初版 2023年11月1日</p>
          <p>改定 2023年11月11日</p>
        </div>
        <UpArrow/>
    </div>
  );
}
export default StaffRules;