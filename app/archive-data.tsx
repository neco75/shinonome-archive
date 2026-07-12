import type { ReactNode } from "react";

export type Branch = "weather" | "people" | "machine" | "admin" | "convergence" | "optional";

export type ArchiveRecord = {
  id: string;
  title: string;
  date: string;
  level: number;
  kind: string;
  branch: Branch;
  required?: boolean;
  evidence?: string;
  body: ReactNode;
};

export type SearchRoute = {
  terms: string[];
  ids: string[];
  cross?: boolean;
};

export const STORAGE_KEY = "shinonome-archive-progress-v2";

export const BRANCH_META: Record<Branch, { label: string; short: string }> = {
  weather: { label: "気象・住民記録", short: "気象線" },
  people: { label: "人物・勤務記録", short: "人物線" },
  machine: { label: "機器・通信記録", short: "機器線" },
  admin: { label: "管理・改竄記録", short: "管理線" },
  convergence: { label: "横断照合資料", short: "照合" },
  optional: { label: "周辺資料", short: "周辺" },
};

export const REQUIRED_IDS = [
  "R-007",
  "MAP-07",
  "W-817",
  "L-203",
  "OBS-817",
  "FLOOD-01",
  "MAIL-19",
  "LEDGER-38",
  "STAFF-7",
  "SHIFT-817",
  "F04-CARD",
  "K02-NOTE",
  "MIO-LETTER",
  "EQ-B4",
  "MANUAL-4",
  "MAINT-613",
  "TRACE-04",
  "CODEBOOK",
  "ASTER-INDEX",
  "POWER-LOG",
  "ACC-REPORT",
  "MINUTES-02",
  "DRAFT-0207",
  "ASTER-PROTOCOL",
  "ACT-LOG",
  "ALTER-LOG",
  "BROADCAST-LOG",
  "DISCARD-ORDER",
  "YUNAGI",
  "M07-A",
  "M07-B",
  "FINAL-0",
];

export const BOARD_EVIDENCE = ["ASTER-PROTOCOL", "ACT-LOG", "ALTER-LOG", "BROADCAST-LOG"];

export const records: Record<string, ArchiveRecord> = {
  "R-007": {
    id: "R-007",
    title: "観測所台帳・第七号",
    date: "2001.04.01 移管",
    level: 1,
    kind: "施設台帳",
    branch: "admin",
    required: true,
    body: (
      <>
        <p>
          台帳番号07は、平成10年9月30日付で廃止された「ミナセ第七観測所」に割り当てられていた。公開台帳からの削除理由は、設備喪失ではなく
          <strong>原簿区分変更</strong>と記録されている。
        </p>
        <dl className="record-facts">
          <div>
            <dt>所在地</dt>
            <dd>東雲県水無瀬郡 柊沢北部</dd>
          </div>
          <div>
            <dt>職員定数</dt>
            <dd>3名（識別符号 F-04 / K-02 / O-11）</dd>
          </div>
          <div>
            <dt>主要設備</dt>
            <dd>自記気圧計 B-4、南塔送信機</dd>
          </div>
        </dl>
        <p className="archive-reference">
          参照可能資料：構内図 MAP-07／事故区分「落雷事故」／写真箱12
        </p>
      </>
    ),
  },
  "MAP-07": {
    id: "MAP-07",
    title: "ミナセ第七観測所 構内図",
    date: "1997.10 改訂",
    level: 1,
    kind: "施設図面",
    branch: "machine",
    required: true,
    body: (
      <>
        <p>
          改修後の構内図。各棟の英字は送信機の回線識別符号を兼ねる。赤鉛筆で「夜間巡回は勤務記録の順」と追記されている。
        </p>
        <div className="facility-map">
          <div className="map-node n1">
            <b>A</b>
            <span>北棟観測室</span>
          </div>
          <div className="map-node n2">
            <b>S</b>
            <span>南塔</span>
          </div>
          <div className="map-node n3">
            <b>T</b>
            <span>送信室</span>
          </div>
          <div className="map-node n4">
            <b>E</b>
            <span>東斜面計器庫</span>
          </div>
          <div className="map-node n5">
            <b>R</b>
            <span>記録庫</span>
          </div>
        </div>
        <p className="margin-note">裏面：巡回欄の数字は剥離。人物資料との照合が必要。</p>
      </>
    ),
  },
  "W-817": {
    id: "W-817",
    title: "平成10年8月17日 異常降水照会",
    date: "1998.08.24",
    level: 2,
    kind: "照会記録",
    branch: "weather",
    required: true,
    body: (
      <>
        <p>
          柊沢地区から、降水の色に関する問い合わせが9件寄せられた。採取試料から着色物質は検出されず、公式回答は「街灯と低層雲による視覚現象」とした。
        </p>
        <blockquote>
          雨粒の中で、まだ朝になっていない空が光っていた。色よりも、音が先に落ちてきた。——住民聴取票3
        </blockquote>
        <div className="document-grid">
          <span>事案</span>
          <b>A-17</b>
          <span>最初の通報</span>
          <b>02:14</b>
          <span>採取地点</span>
          <b>風見郵便局前</b>
        </div>
      </>
    ),
  },
  "L-203": {
    id: "L-203",
    title: "住民投書「夜明け前の放送」",
    date: "1998.08.19",
    level: 2,
    kind: "住民資料",
    branch: "weather",
    required: true,
    body: (
      <>
        <p>
          停電中の防災無線から、女性の声で「川から離れて。東斜面へ」と三度流れた。役場は放送しておらず、観測所の回線も02:08に落雷で停止したと説明された。
        </p>
        <p>
          投書には<strong>風見郵便局</strong>
          の消印。余白に「避難できた家の数は、局の日誌に残した」とある。
        </p>
        <p className="margin-note">放送時刻の記憶：02:14前後／公式停止時刻との矛盾あり</p>
      </>
    ),
  },
  "OBS-817": {
    id: "OBS-817",
    title: "A-17 自記気圧・降水観測表",
    date: "1998.08.17",
    level: 3,
    kind: "観測原簿",
    branch: "weather",
    required: true,
    body: (
      <>
        <div className="weather-table">
          <div>
            <span>時刻</span>
            <span>気圧</span>
            <span>降水</span>
            <span>備考</span>
          </div>
          <div>
            <span>02:11</span>
            <span>987.2</span>
            <span>18.0</span>
            <span>正常</span>
          </div>
          <div>
            <span>02:12</span>
            <span>986.9</span>
            <span>21.5</span>
            <span>針振れ</span>
          </div>
          <div className="missing-row">
            <span>02:13</span>
            <span>欠測</span>
            <span>欠測</span>
            <span>B-4切替</span>
          </div>
          <div>
            <span>02:14</span>
            <span>986.8</span>
            <span>—</span>
            <span>回線負荷</span>
          </div>
          <div>
            <span>02:18</span>
            <span>990.1</span>
            <span>0.0</span>
            <span>無人</span>
          </div>
          <div>
            <span>02:19</span>
            <span>—</span>
            <span>—</span>
            <span>電源断</span>
          </div>
        </div>
        <p>
          02:13の欄のみ別筆。紙面裏に「欠測ではない。B-4は何かを記録していた」とある。校正値の照会語は
          <strong>自記気圧計校正</strong>。
        </p>
      </>
    ),
  },
  "FLOOD-01": {
    id: "FLOOD-01",
    title: "柊沢増水域図 A-17",
    date: "1998.08.18",
    level: 3,
    kind: "災害資料",
    branch: "weather",
    required: true,
    body: (
      <>
        <p>
          増水は河川全域ではなく、観測所南塔を中心とする半径1.8kmに集中していた。通常の線状降水帯とは分布が異なる。
        </p>
        <div className="radius-diagram">
          <i />
          <i />
          <i />
          <b>南塔</b>
          <span>青色発光の目撃域</span>
        </div>
        <p>東斜面は浸水域外。住民投書の避難指示は、発生前に安全域を正確に選んでいる。</p>
      </>
    ),
  },
  "MAIL-19": {
    id: "MAIL-19",
    title: "風見郵便局 臨時配達日誌",
    date: "1998.08.18",
    level: 3,
    kind: "寄贈資料",
    branch: "weather",
    required: true,
    body: (
      <>
        <p>
          未明の避難誘導により柊沢北部の全戸を確認。02:14、防災無線の女性は「東斜面、旧採石道」と二度繰り返した。
        </p>
        <div className="ledger-lines">
          <span>確認済</span>
          <b>38世帯</b>
          <span>不在</span>
          <b>2世帯（旅行届あり）</b>
          <span>負傷</span>
          <b>0名</b>
        </div>
        <p>日誌欄外に青い雨粒の染み。照会時は事象名と局名を併記すること。</p>
      </>
    ),
  },
  "LEDGER-38": {
    id: "LEDGER-38",
    title: "避難確認簿・38世帯",
    date: "1998.08.18",
    level: 5,
    kind: "住民保護記録",
    branch: "convergence",
    required: true,
    evidence: "02:14の放送で38世帯が避難",
    body: (
      <>
        <p>
          異常降水照会と郵便局日誌の相互参照により復元。38世帯すべてが、役場の公式警報より11分早く東斜面へ移動していた。
        </p>
        <div className="evidence-seal">EVIDENCE W-38</div>
        <p>
          移動開始は02:14。観測所回線が公式記録どおり02:08に停止していたなら、この放送は成立しない。
        </p>
      </>
    ),
  },
  "STAFF-7": {
    id: "STAFF-7",
    title: "第七観測所 職員名簿",
    date: "1998.04.01",
    level: 2,
    kind: "人事記録",
    branch: "people",
    required: true,
    body: (
      <>
        <div className="staff-list">
          <div>
            <b>F-04</b>
            <span>主任観測員／大気共鳴研究</span>
          </div>
          <div>
            <b>K-02</b>
            <span>機器保守／通信</span>
          </div>
          <div>
            <b>O-11</b>
            <span>局地観測／8月17日休務</span>
          </div>
        </div>
        <p>
          個人名は別紙管理。F-04の欄に「家族連絡先：冬木澪」、K-02の欄に「巡回順は構内図の英字で記録」とある。
        </p>
      </>
    ),
  },
  "SHIFT-817": {
    id: "SHIFT-817",
    title: "F-04 夜間勤務記録",
    date: "1998.08.16–17",
    level: 3,
    kind: "勤務資料",
    branch: "people",
    required: true,
    body: (
      <>
        <div className="shift-table">
          <div>
            <span>00:00</span>
            <b>F-04 / K-02</b>
            <em>通常観測</em>
          </div>
          <div>
            <span>01:40</span>
            <b>K-02</b>
            <em>南塔点検後、退所</em>
          </div>
          <div>
            <span>01:55</span>
            <b>F-04</b>
            <em>単独勤務へ</em>
          </div>
          <div>
            <span>02:12</span>
            <b>F-04</b>
            <em>B-4異常、内線連絡</em>
          </div>
          <div>
            <span>02:13</span>
            <b>F-04</b>
            <em>記録途絶</em>
          </div>
        </div>
        <p>
          K-02の巡回順：北棟→南塔→送信室→東斜面→記録庫。構内図の回線符号へ置き換えると、5文字の計画名になる。
        </p>
      </>
    ),
  },
  "F04-CARD": {
    id: "F04-CARD",
    title: "職員識別票 F-04",
    date: "1996.04.02 発行",
    level: 3,
    kind: "人事資料",
    branch: "people",
    required: true,
    body: (
      <>
        <div className="id-card">
          <div className="id-silhouette" />
          <div>
            <small>METEOROLOGICAL STAFF</small>
            <h4>冬木 梢</h4>
            <p>ID F-04 / 主任観測員</p>
            <p>専門：微気圧振動・音響記録</p>
          </div>
        </div>
        <p>
          緊急連絡先は妹・冬木澪。識別票裏面には「M-07は私自身を被験者とする」と手書きされている。
        </p>
      </>
    ),
  },
  "K02-NOTE": {
    id: "K02-NOTE",
    title: "常盤要 私用保守メモ",
    date: "1998.08.17 回収",
    level: 4,
    kind: "個人資料",
    branch: "people",
    required: true,
    body: (
      <>
        <p>K-02は常盤要。01:40に退所後、梢から02:12に電話を受けている。</p>
        <blockquote>
          針が短・長の二種類で鳴っている。電話越しでも規則が分かった。旧式の通信と同じだ。符号表は資料室の
          <strong>旧式電信符号表</strong>を見ればいい。
        </blockquote>
        <p>メモ末尾：「梢は“計画名が読めたらF-04と組み合わせろ”と言った」</p>
      </>
    ),
  },
  "MIO-LETTER": {
    id: "MIO-LETTER",
    title: "冬木澪 宛未発送通知",
    date: "1998.08.21",
    level: 4,
    kind: "連絡記録",
    branch: "people",
    required: true,
    body: (
      <>
        <p>
          冬木澪様。姉・冬木梢職員は事故後、所在確認中です。私物の返還準備が整い次第ご連絡します。
        </p>
        <p className="redacted-note">
          未発送理由：M-07を個人記録と認めた場合、ASTER計画の開示が必要。白鳥所長判断により保留。
        </p>
        <p>
          通知の作成日より前に、内部の<strong>廃棄命令</strong>が起案されている。
        </p>
      </>
    ),
  },
  "EQ-B4": {
    id: "EQ-B4",
    title: "自記気圧計 B-4 仕様票",
    date: "1988.06.12",
    level: 2,
    kind: "機器台帳",
    branch: "machine",
    required: true,
    body: (
      <>
        <dl className="record-facts">
          <div>
            <dt>方式</dt>
            <dd>機械式記録針／毎分送り</dd>
          </div>
          <div>
            <dt>増設</dt>
            <dd>音響入力端子、南塔回線端子</dd>
          </div>
          <div>
            <dt>用途</dt>
            <dd>微気圧・試験信号の重畳記録</dd>
          </div>
        </dl>
        <p>
          平成9年、F-04の申請により試験改造。通常の気圧変動では発生しない短長二種の針振れを記録できる。
        </p>
        <p className="archive-reference">関連：B-4取扱補遺／02:13保守記録</p>
      </>
    ),
  },
  "MANUAL-4": {
    id: "MANUAL-4",
    title: "B-4取扱補遺「二値振動」",
    date: "1997.11.18",
    level: 3,
    kind: "技術資料",
    branch: "machine",
    required: true,
    body: (
      <>
        <p>
          試験端子へ入力された信号は、短振れ「・」と長振れ「－」として記録される。文字間は1目盛、語間は3目盛。
        </p>
        <p>
          復号には通信課標準の「旧式電信符号表」を使用すること。復号語は装置名ではなく
          <strong>計画名</strong>を示す。
        </p>
        <div className="warning-box">
          試験信号と大気共鳴が同期した場合、送信回線を開かないこと。
        </div>
      </>
    ),
  },
  "MAINT-613": {
    id: "MAINT-613",
    title: "緊急保守記録 02:13",
    date: "1998.08.17",
    level: 4,
    kind: "保守記録",
    branch: "machine",
    required: true,
    body: (
      <>
        <dl className="record-facts">
          <div>
            <dt>担当</dt>
            <dd>F-04（現地）／K-02（電話）</dd>
          </div>
          <div>
            <dt>対象</dt>
            <dd>自記気圧計 B-4</dd>
          </div>
          <div>
            <dt>症状</dt>
            <dd>大気入力のみで二値振動</dd>
          </div>
        </dl>
        <p>
          F-04はB-4を南塔回線へ接続。02:13:08より記録紙に<strong>針音</strong>
          が残る。電源監視盤上、落雷サージはこの時点で検出されていない。
        </p>
      </>
    ),
  },
  "TRACE-04": {
    id: "TRACE-04",
    title: "針音転写 04",
    date: "1998.08.17 02:13",
    level: 5,
    kind: "信号資料",
    branch: "machine",
    required: true,
    body: (
      <>
        <p>記録紙の損傷部を写真測量から復元。斜線は文字間、二重線は語端。符号表との照合が必要。</p>
        <div className="morse-strip" aria-label="短長信号">
          <span>・－</span>
          <i />
          <span>・・・</span>
          <i />
          <span>－</span>
          <i />
          <span>・</span>
          <i />
          <span>・－・</span>
        </div>
        <p className="margin-note">K-02注：「読めた語を、F-04と並べて索引へ」</p>
      </>
    ),
  },
  CODEBOOK: {
    id: "CODEBOOK",
    title: "旧式電信符号表・抜粋",
    date: "1972.03 改訂",
    level: 2,
    kind: "公開参考資料",
    branch: "machine",
    required: true,
    body: (
      <>
        <div className="codebook">
          <div>
            <b>A</b>
            <span>・－</span>
          </div>
          <div>
            <b>E</b>
            <span>・</span>
          </div>
          <div>
            <b>R</b>
            <span>・－・</span>
          </div>
          <div>
            <b>S</b>
            <span>・・・</span>
          </div>
          <div>
            <b>T</b>
            <span>－</span>
          </div>
          <div>
            <b>M</b>
            <span>－－</span>
          </div>
          <div>
            <b>O</b>
            <span>－－－</span>
          </div>
          <div>
            <b>I</b>
            <span>・・</span>
          </div>
        </div>
        <p>必要な符号だけを収録した公開用抜粋。信号列は左から読む。</p>
      </>
    ),
  },
  "ASTER-INDEX": {
    id: "ASTER-INDEX",
    title: "ASTER計画 索引票",
    date: "1997.09.04",
    level: 5,
    kind: "研究索引",
    branch: "machine",
    required: true,
    body: (
      <>
        <p>
          大気共鳴記録実験
          ASTER。微気圧変動に含まれる生体由来信号を、機械振動として保存・再生する試み。
        </p>
        <div className="document-grid">
          <span>責任者</span>
          <b>白鳥 道隆</b>
          <span>現地担当</span>
          <b>F-04</b>
          <span>被験記録</span>
          <b>M-07</b>
        </div>
        <p>最終実験の照会は、計画名と現地担当符号の二項目で行う。</p>
      </>
    ),
  },
  "POWER-LOG": {
    id: "POWER-LOG",
    title: "第七観測所 電源監視ログ",
    date: "1998.08.17",
    level: 4,
    kind: "設備記録",
    branch: "admin",
    required: true,
    body: (
      <>
        <div className="power-log">
          <div>
            <time>02:07</time>
            <span>正常</span>
            <b>全系統 100V</b>
          </div>
          <div>
            <time>02:08</time>
            <span>正常</span>
            <b>サージなし</b>
          </div>
          <div>
            <time>02:13</time>
            <span>負荷増</span>
            <b>南塔回線 +18%</b>
          </div>
          <div>
            <time>02:18</time>
            <span>正常</span>
            <b>サージなし</b>
          </div>
          <div className="danger">
            <time>02:19</time>
            <span>異常</span>
            <b>外部雷サージ／全断</b>
          </div>
        </div>
        <p>公式事故報告の「02:08落雷」と11分の差がある。ログは別系統の機械時計で記録。</p>
      </>
    ),
  },
  "ACC-REPORT": {
    id: "ACC-REPORT",
    title: "落雷事故報告書・確定版",
    date: "1998.08.18",
    level: 3,
    kind: "事故資料",
    branch: "admin",
    required: true,
    body: (
      <>
        <p>
          02:08、観測所に落雷。通信設備は即時停止し、02:14以降に観測された放送・信号は当所と無関係。主任観測員は落雷時に退避し、その後行方不明。
        </p>
        <dl className="record-facts">
          <div>
            <dt>起案者</dt>
            <dd>白鳥 道隆 所長</dd>
          </div>
          <div>
            <dt>起案時刻</dt>
            <dd>02:07</dd>
          </div>
          <div>
            <dt>確定時刻</dt>
            <dd>08月18日 09:30</dd>
          </div>
        </dl>
        <p>事象発生より前に起案されている。起案時刻の原稿を照会可能。</p>
      </>
    ),
  },
  "MINUTES-02": {
    id: "MINUTES-02",
    title: "事故対策会議 議事抄録",
    date: "1998.08.17 05:40",
    level: 4,
    kind: "会議資料",
    branch: "admin",
    required: true,
    body: (
      <>
        <p>
          白鳥所長：「ASTERの存在を切り離す。停電、放送、異常降水をすべて落雷の結果として整理する」
        </p>
        <p>記録担当：「電源ログは02:19です」</p>
        <p>白鳥所長：「報告書は既にある。時刻に記録を合わせる」</p>
        <p className="margin-note">添付原稿：02:07保存／改訂履歴欠落</p>
      </>
    ),
  },
  "DRAFT-0207": {
    id: "DRAFT-0207",
    title: "事故報告書・02:07原稿",
    date: "1998.08.17 02:07",
    level: 5,
    kind: "未決裁資料",
    branch: "admin",
    required: true,
    body: (
      <>
        <p>
          「02:08頃、落雷により通信停止。主任観測員は退避後に所在不明」——まだ発生していない事故が、ほぼ確定版と同じ文面で記載されている。
        </p>
        <div className="file-history">
          <span>作成</span>
          <b>SHIRATORI-M</b>
          <time>02:07:11</time>
          <span>複製</span>
          <b>REPORT_FINAL</b>
          <time>05:51:03</time>
        </div>
        <p>ファイルコメント：「落雷前の雛形。不要な時刻情報は後で削除」</p>
      </>
    ),
  },
  "ASTER-PROTOCOL": {
    id: "ASTER-PROTOCOL",
    title: "ASTER第七号 実施要綱",
    date: "1998.07.30",
    level: 7,
    kind: "機密研究資料",
    branch: "convergence",
    required: true,
    evidence: "ASTERは接触者の短期記憶を送信する",
    body: (
      <>
        <p>
          計画名と現地担当符号の照合により開示。ASTERは気圧を制御する装置ではない。共鳴域にいる被験者の直前最大六分間の
          <strong>知覚・発声記憶</strong>をB-4へ刻み、南塔から再生する。
        </p>
        <div className="evidence-seal">EVIDENCE A-F04</div>
        <p>被験者が装置に接触し続けなければ記録は成立しない。事故当夜のM-07被験者はF-04本人。</p>
      </>
    ),
  },
  "ACT-LOG": {
    id: "ACT-LOG",
    title: "B-4起動監査ログ",
    date: "1998.08.17 02:13",
    level: 7,
    kind: "機器監査",
    branch: "convergence",
    required: true,
    evidence: "02:13、F-04がB-4を起動",
    body: (
      <>
        <div className="terminal-log">
          <p>02:12:51 USER F-04 / LOCAL</p>
          <p>02:13:08 INPUT ATMOSPHERIC → MEMORY</p>
          <p>02:13:12 LINK SOUTH-TOWER OPEN</p>
          <p>02:13:31 SUBJECT M-07 / ACTIVE</p>
        </div>
        <div className="evidence-seal">EVIDENCE 0213-B4</div>
        <p>
          遠隔操作ではなく現地鍵が使われた。K-02は01:40に退所済みであり、起動者はF-04に限定される。
        </p>
      </>
    ),
  },
  "ALTER-LOG": {
    id: "ALTER-LOG",
    title: "事故記録 改訂指示",
    date: "1998.08.17 05:51",
    level: 8,
    kind: "監査復元",
    branch: "convergence",
    required: true,
    evidence: "白鳥所長が事故前原稿へ記録を合わせた",
    body: (
      <>
        <p>02:07原稿と議事抄録の照合により、削除された改訂履歴を復元。</p>
        <div className="terminal-log">
          <p>AUTHOR SHIRATORI-M</p>
          <p>REPLACE 02:19 → 02:08</p>
          <p>DELETE ASTER / M-07 / F-04 LOCAL ACCESS</p>
          <p>APPEND CAUSE: LIGHTNING</p>
        </div>
        <div className="evidence-seal">EVIDENCE PRE-REPORT</div>
        <p>
          白鳥所長は事故を予知したのではなく、予定されていた危険な試験を落雷事故として処理する原稿を事前に用意していた。
        </p>
      </>
    ),
  },
  "BROADCAST-LOG": {
    id: "BROADCAST-LOG",
    title: "南塔混信放送 復元記録",
    date: "1998.08.17 02:14",
    level: 8,
    kind: "放送資料",
    branch: "convergence",
    required: true,
    evidence: "記憶信号が38世帯を救った",
    body: (
      <>
        <div className="transcript">
          <p>
            <time>02:14:02</time>
            <span>川から離れて。東斜面、旧採石道へ。</span>
          </p>
          <p>
            <time>02:14:19</time>
            <span>三十八軒。郵便局の名簿なら全員分かる。</span>
          </p>
          <p>
            <time>02:14:41</time>
            <span>これは警報じゃない。私が今、見ているもの。</span>
          </p>
        </div>
        <div className="evidence-seal">EVIDENCE 38-0214</div>
        <p>ASTER要綱に照らすと、放送は録音ではなくF-04の短期記憶。住民名簿の戸数と完全一致する。</p>
      </>
    ),
  },
  "DISCARD-ORDER": {
    id: "DISCARD-ORDER",
    title: "M-07廃棄命令",
    date: "1998.08.18 01:10",
    level: 7,
    kind: "管理命令",
    branch: "admin",
    required: true,
    body: (
      <>
        <p>
          M-07を「機器雑音」に再分類し、被験者個人の記録ではないものとして廃棄する。命令者：白鳥道隆。
        </p>
        <p>
          理由欄：「個人記録と認定した場合、F-04の行動、ASTERの作動、避難放送の因果を保存する義務が生じる」
        </p>
        <p>
          処理担当K-02は命令に署名せず、媒体を<strong>夕凪現象</strong>資料群へ移している。
        </p>
      </>
    ),
  },
  YUNAGI: {
    id: "YUNAGI",
    title: "夕凪現象 技術注記",
    date: "1997.12.12",
    level: 6,
    kind: "技術資料",
    branch: "machine",
    required: true,
    body: (
      <>
        <p>
          大気の動きが局所的に停止した際、気圧記録に観測者の呼吸・発声周期と一致する揺らぎが現れる。ASTER班はこれを夕凪現象と仮称。
        </p>
        <p>
          再生情報は客観的映像ではなく、記録者が最後に知覚した時間。M-07の照会には計画名を併記する。
        </p>
        <div className="warning-box">感情の強い記憶ほど、降水域と放送域が拡大する可能性。</div>
      </>
    ),
  },
  "M07-A": {
    id: "M07-A",
    title: "M-07 残留信号 A",
    date: "1998.08.17 02:13–02:15",
    level: 9,
    kind: "記憶転記",
    branch: "convergence",
    required: true,
    body: (
      <>
        <div className="transcript">
          <p>
            <time>02:13:08</time>
            <span>こちら第七。白鳥さんの試験は止められなかった。</span>
          </p>
          <p>
            <time>02:13:31</time>
            <span>ASTERをB-4へ。私の記憶が流れるなら、せめて柊沢へ。</span>
          </p>
          <p>
            <time>02:14:02</time>
            <span>川から離れて。東斜面へ。</span>
          </p>
          <p>
            <time>02:14:57</time>
            <span>青い雨は装置の光じゃない。私が子どもの頃に見た朝の色。</span>
          </p>
        </div>
        <p>信号には客観記録と個人記憶が混在する。すべてを事実として扱ってはならない。</p>
      </>
    ),
  },
  "M07-B": {
    id: "M07-B",
    title: "M-07 残留信号 B",
    date: "1998.08.17 02:15–02:17",
    level: 9,
    kind: "記憶転記",
    branch: "convergence",
    required: true,
    body: (
      <>
        <div className="transcript">
          <p>
            <time>02:15:22</time>
            <span>常盤さん。記録を雑音にしないで。</span>
          </p>
          <p>
            <time>02:16:04</time>
            <span>私はここに残る。回線を閉じたら、最後の家に届かない。</span>
          </p>
          <p>
            <time>02:16:44</time>
            <span>澪へ。空はちゃんと朝になる。</span>
          </p>
          <p>
            <time>02:17:00</time>
            <span>見つけた人へ。私が正しかったことではなく、何が起きたかを残して。</span>
          </p>
        </div>
        <p>02:17以降は無信号。理論上限六分間に対し、記録は3分52秒。</p>
      </>
    ),
  },
  "BARO-CAL": {
    id: "BARO-CAL",
    title: "自記気圧計校正記録",
    date: "1998.08.10",
    level: 2,
    kind: "校正資料",
    branch: "optional",
    body: (
      <>
        <p>B-4の時刻誤差は月差±2秒以内。事故当夜の02:13、02:19は信頼できる。</p>
        <p>圧力値の急回復は気象現象ではなく、試験入力が気圧記録へ重畳された際の既知の挙動。</p>
      </>
    ),
  },
  "PHOTO-12": {
    id: "PHOTO-12",
    title: "写真箱12・表現資料",
    date: "1998.09 回収",
    level: 2,
    kind: "写真目録",
    branch: "optional",
    body: (
      <>
        <p>
          第七観測所の撤収時に回収された写真12枚。11枚は施設記録、1枚は冬木梢と妹の澪が青い傘を差している私写真。
        </p>
        <p className="handwritten">「雨の日は、空の色を持って帰れる」</p>
      </>
    ),
  },
  "VISITOR-04": {
    id: "VISITOR-04",
    title: "来館者ノート・平成16年",
    date: "2004.08.17",
    level: 2,
    kind: "来館資料",
    branch: "optional",
    body: (
      <>
        <p>
          記名「M.F.」——姉の記録はありませんでした。でも、展示されていたB-4の針が、私の名前を呼ぶように二度動きました。
        </p>
        <p>当時の展示担当はK-02こと常盤要。翌年、B-4は非公開収蔵へ移された。</p>
      </>
    ),
  },
  "FINAL-0": {
    id: "FINAL-0",
    title: "M-07 記録認定審査",
    date: "調査者提出",
    level: 10,
    kind: "最終審査",
    branch: "convergence",
    required: true,
    body: (
      <>
        <p>調査盤に提出された四つの判断は、機器ログ、勤務記録、住民記録、改訂履歴と矛盾しない。</p>
        <div className="final-findings">
          <p>
            <span>起動者</span>
            <b>冬木梢（F-04）</b>
          </p>
          <p>
            <span>事故原因</span>
            <b>ASTER共鳴試験</b>
          </p>
          <p>
            <span>放送内容</span>
            <b>梢の短期記憶</b>
          </p>
          <p>
            <span>改竄責任</span>
            <b>白鳥道隆 所長</b>
          </p>
        </div>
        <p>
          ただしM-07には、客観的な事故証拠と冬木梢個人の記憶が不可分に含まれる。公開すれば38世帯を救った事実を証明できる一方、彼女が妹へ残した私的な言葉も公開される。
        </p>
      </>
    ),
  },
};

export const routes: SearchRoute[] = [
  { terms: ["第七観測所", "第7観測所", "ミナセ第七観測所", "欠番07"], ids: ["R-007", "MAP-07"] },
  { terms: ["青い雨"], ids: ["W-817", "L-203"] },
  { terms: ["A-17", "A17"], ids: ["OBS-817", "FLOOD-01"] },
  { terms: ["風見郵便局"], ids: ["MAIL-19"] },
  { terms: ["青い雨 風見郵便局", "風見郵便局 青い雨"], ids: ["LEDGER-38"], cross: true },
  { terms: ["冬木梢", "F04個人名"], ids: ["STAFF-7", "F04-CARD"] },
  { terms: ["F-04", "F04"], ids: ["SHIFT-817"] },
  { terms: ["常盤要", "K-02", "K02"], ids: ["K02-NOTE"] },
  { terms: ["冬木澪", "澪"], ids: ["MIO-LETTER"] },
  { terms: ["B-4", "B4", "自記気圧計B-4"], ids: ["EQ-B4", "MANUAL-4"] },
  { terms: ["02:13", "2時13分"], ids: ["MAINT-613", "POWER-LOG"] },
  { terms: ["針音"], ids: ["TRACE-04"] },
  { terms: ["旧式電信符号表"], ids: ["CODEBOOK"] },
  { terms: ["ASTER", "アスター"], ids: ["ASTER-INDEX"] },
  {
    terms: ["ASTER F-04", "F-04 ASTER", "ASTER F04", "F04 ASTER"],
    ids: ["ASTER-PROTOCOL"],
    cross: true,
  },
  { terms: ["02:13 B-4", "B-4 02:13", "0213 B4", "B4 0213"], ids: ["ACT-LOG"], cross: true },
  { terms: ["落雷事故"], ids: ["ACC-REPORT", "MINUTES-02"] },
  { terms: ["02:07", "2時07分"], ids: ["DRAFT-0207"] },
  { terms: ["落雷前 02:07", "02:07 落雷前", "落雷前 0207"], ids: ["ALTER-LOG"], cross: true },
  {
    terms: ["38世帯 02:14", "02:14 38世帯", "38 0214", "0214 38"],
    ids: ["BROADCAST-LOG"],
    cross: true,
  },
  { terms: ["廃棄命令", "M-07廃棄命令"], ids: ["DISCARD-ORDER"] },
  { terms: ["夕凪現象", "夕凪"], ids: ["YUNAGI"] },
  {
    terms: ["M-07 ASTER", "ASTER M-07", "M07 ASTER", "ASTER M07"],
    ids: ["M07-A", "M07-B"],
    cross: true,
  },
  { terms: ["自記気圧計校正"], ids: ["BARO-CAL"] },
  { terms: ["写真箱12"], ids: ["PHOTO-12"] },
  { terms: ["来館者ノート"], ids: ["VISITOR-04"] },
];

export const hints = [
  "入口は一つではありません。観測所一覧、更新情報、設備公開のお知らせから、別々の調査線へ入れます。",
  "気象線では、事案コードと郵便局の日誌を別々に追ってください。二つの資料名を同時に検索する照合があります。",
  "人物線では、個人名と職員符号を区別してください。勤務記録は符号で管理されています。",
  "機器線の短長信号は、公開参考資料の符号表だけで解読できます。外部ツールは不要です。",
  "構内図の英字とK-02の巡回順も、針音と同じ5文字へ到達する別解です。",
  "管理線では、落雷の時刻を信じず、報告書の作成時刻と電源ログを並べてください。",
  "横断照合語は、異なる二資料にある語を空白で並べます。片方だけでは深部資料に届きません。",
  "終盤のM-07は、計画名と記録番号の組み合わせで照会します。",
  "最終資料は検索では開きません。調査記録内の『推理盤』で、四つの問いへ答えてください。",
];

export function normalize(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s\u3000・ー—―_/:：.\-\\]/g, "");
}

export function findRoute(query: string) {
  const normalized = normalize(query);
  return routes.find((route) => route.terms.some((term) => normalize(term) === normalized));
}
