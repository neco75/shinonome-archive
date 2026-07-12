import { BRANCH_META, type ArchiveRecord } from "../archive-data";

export function RecordCard({ record }: { record: ArchiveRecord }) {
  return (
    <article className={`record-card branch-${record.branch} level-${Math.min(record.level, 9)}`}>
      <header className="record-header">
        <div>
          <span className={`branch-badge ${record.branch}`}>
            {BRANCH_META[record.branch].label}
          </span>
          <h3>{record.title}</h3>
        </div>
        <div className="record-meta">
          <span>LEVEL {record.level}</span>
          <code>{record.id}</code>
        </div>
      </header>
      <div className="record-date">
        {record.kind}　記録日：{record.date}
      </div>
      <div className="record-body">{record.body}</div>
      {record.evidence && (
        <footer className="record-evidence">
          <span>調査盤へ登録</span>
          <b>{record.evidence}</b>
        </footer>
      )}
    </article>
  );
}
