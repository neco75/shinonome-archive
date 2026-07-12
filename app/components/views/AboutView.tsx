export function AboutView() {
  return (
    <section className="static-page">
      <span className="eyebrow">ABOUT US</span>
      <h2>東雲地方気象資料室について</h2>
      <p className="lead">
        資料を単一の物語へ整理せず、作成主体ごとの原記録として保存します。記録間の矛盾も、地域史を検証するための重要な情報です。
      </p>
      <div className="about-grid">
        <article>
          <b>観測原簿</b>
          <span>数値・時刻・欠測</span>
          <p>機械記録と観測員の手書き原簿。</p>
        </article>
        <article>
          <b>施設台帳</b>
          <span>建物・機器・職員符号</span>
          <p>廃止施設と移管機器を含みます。</p>
        </article>
        <article>
          <b>行政記録</b>
          <span>報告・決裁・改訂履歴</span>
          <p>公開版と原稿の差異を保存します。</p>
        </article>
        <article>
          <b>寄贈資料</b>
          <span>住民・郵便・私文書</span>
          <p>公的記録に残らない地域の観測です。</p>
        </article>
      </div>
      <div className="policy-note">
        <h3>検索上の注意</h3>
        <p>
          同じ出来事に複数の呼称がある場合、作成当時の資料名で索引されています。二資料の照合が必要な深部資料もあります。
        </p>
      </div>
    </section>
  );
}
