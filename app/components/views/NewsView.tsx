export function NewsView() {
  return (
    <section className="static-page">
      <span className="eyebrow">INFORMATION</span>
      <h2>更新情報</h2>
      <div className="news-page-list">
        <article>
          <time>2026.07.07</time>
          <h3>A-17関連資料を公開しました</h3>
          <p>
            平成10年8月17日の異常降水照会、観測原簿、柊沢増水域図を別索引で公開しました。事案コードから照会できます。
          </p>
        </article>
        <article>
          <time>2026.06.21</time>
          <h3>公開参考資料を追加しました</h3>
          <p>
            通信記録の読解に使用されていた「旧式電信符号表」の抜粋を追加しました。資料名で検索してください。
          </p>
        </article>
        <article>
          <time>2026.05.30</time>
          <h3>旧観測網の時刻不整合</h3>
          <p>
            02:13から02:19の間で、気圧原簿、電源ログ、事故報告書の時刻が一致しません。原資料は個別に索引されています。
          </p>
        </article>
        <article>
          <time>2026.04.12</time>
          <h3>旧風見郵便局からの寄贈</h3>
          <p>柊沢地区の災害時配達日誌を受け入れました。寄贈元の施設名で照会できます。</p>
        </article>
        <article>
          <time>2026.03.02</time>
          <h3>自記気圧計B-4を収蔵庫へ移動</h3>
          <p>試験改造されたB-4の仕様票、取扱補遺、校正記録を順次公開します。</p>
        </article>
      </div>
    </section>
  );
}
