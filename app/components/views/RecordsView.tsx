import { records } from "../../archive-data";
import type { Ending, View } from "../../types";
import { RecordCard } from "../RecordCard";

export interface RecordsViewProps {
  searched: string;
  resultIds: string[];
  message: string;
  ending: Ending;
  onSetEnding: (e: Ending) => void;
  onNavigate: (v: View) => void;
  onFocusSearch: () => void;
}

export function RecordsView({
  searched,
  resultIds,
  message,
  ending,
  onSetEnding,
  onNavigate,
  onFocusSearch,
}: RecordsViewProps) {
  return (
    <section className="results-page" id="search-results" tabIndex={-1}>
      <div className="results-heading">
        <div>
          <span className="eyebrow">SEARCH RESULT</span>
          <h2>「{searched}」の検索結果</h2>
        </div>
        <span className="result-count">{resultIds.length} 件</span>
      </div>

      <div
        className={`search-message ${resultIds.length ? "success" : "empty"}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>

      {resultIds.length ? (
        <div className="record-stack">
          {resultIds.map((id) => (
            <RecordCard key={id} record={records[id]} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-glyph">?</div>
          <h3>該当する公開記録がありません</h3>
          <p>
            最新資料だけでなく、観測所一覧、更新情報、人物・機器・行政の別系統を調べてください。
          </p>
          <button onClick={onFocusSearch}>検索欄へ戻る</button>
        </div>
      )}

      {/* エンディング選択（最終資料を発見かつ未選択のとき表示） */}
      {resultIds.includes("FINAL-0") && !ending && (
        <section className="decision-panel">
          <span className="eyebrow">RECORD POLICY</span>
          <h2>M-07の公開範囲を決定してください</h2>
          <p>
            事故証拠と冬木梢の私的記憶は分離できません。どちらの選択にも、残すものと失うものがあります。
          </p>
          <div>
            <button
              onClick={() => {
                onSetEnding("public");
                onNavigate("home");
              }}
            >
              <b>原記録を全面公開する</b>
              <span>38世帯を救った事実と改竄を公にする。妹への私的な声も公開される。</span>
            </button>
            <button
              onClick={() => {
                onSetEnding("protected");
                onNavigate("home");
              }}
            >
              <b>証拠提出・記憶は限定保全</b>
              <span>改竄証拠は監査へ渡すが、梢の声は一般公開しない。欠番の全容は残らない。</span>
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
