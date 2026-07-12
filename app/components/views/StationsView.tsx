import { STATIONS } from "../../types";

export function StationsView() {
  return (
    <section className="static-page">
      <span className="eyebrow">OBSERVATORIES</span>
      <h2>観測所一覧</h2>
      <p className="lead">東雲地方気象資料室が記録を保管する旧地域観測所の一覧です。</p>
      <div className="station-list">
        {STATIONS.map((row) => (
          <div key={row[0]}>
            <code>{row[0]}</code>
            <b>{row[1]}</b>
            <span>{row[2]}</span>
            <em>{row[3]}</em>
          </div>
        ))}
        {/* 欠番 */}
        <div className="station-missing">
          <code>07</code>
          <b>記録区分変更</b>
          <span>水無瀬郡</span>
          <em>欠番</em>
        </div>
        <div>
          <code>08</code>
          <b>白萩盆地観測所</b>
          <span>白萩町</span>
          <em>2001廃止</em>
        </div>
      </div>
      <p className="index-clue">
        07番の旧称は「第七観測所」として照会可能です。欠番資料には複数の調査線があります。
      </p>
    </section>
  );
}
