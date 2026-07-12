import { BOARD_EVIDENCE, BRANCH_META, REQUIRED_IDS } from "../archive-data";
import type { Branch } from "../archive-data";
import type { NotebookTab } from "../types";

export interface SidebarProps {
  progress: number;
  requiredFound: number;
  boardEvidenceFound: number;
  boardReady: boolean;
  caseSolved: boolean;
  branchProgress: { branch: Branch; found: number; total: number }[];
  onOpenNotebook: (tab: NotebookTab) => void;
  onOpenGuide: () => void;
}

export function Sidebar({
  progress,
  requiredFound,
  boardEvidenceFound,
  boardReady,
  caseSolved,
  branchProgress,
  onOpenNotebook,
  onOpenGuide,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* 気象ウィジェット */}
      <section className="weather-now">
        <span className="eyebrow">ARCHIVE WEATHER</span>
        <div className="weather-icon" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="temperature">
          17.8<sup>°C</sup>
        </div>
        <b>薄曇</b>
        <dl>
          <div>
            <dt>気圧</dt>
            <dd>1012.4 hPa</dd>
          </div>
          <div>
            <dt>風向</dt>
            <dd>東北東</dd>
          </div>
          <div>
            <dt>更新</dt>
            <dd>02:12</dd>
          </div>
        </dl>
        <p className="sensor-note">旧観測網の02:13以降に欠測あり</p>
      </section>

      {/* 資料復元率 */}
      <section className="progress-card">
        <div className="progress-heading">
          <span>主要資料復元率</span>
          <b>{progress}%</b>
        </div>
        <div className="progress-track">
          <i style={{ width: `${progress}%` }} />
        </div>
        <p>
          {requiredFound} / {REQUIRED_IDS.length} 件
        </p>
        <button onClick={() => onOpenNotebook("files")}>資料と調査線を見る</button>
      </section>

      {/* 調査線の進捗 */}
      <section className="branch-progress">
        <b>調査線</b>
        {branchProgress.map(({ branch, found, total }) => (
          <button key={branch} onClick={() => onOpenNotebook("files")}>
            <span className={`branch-dot ${branch}`} />
            <span>{BRANCH_META[branch].short}</span>
            <em>
              {found}/{total}
            </em>
          </button>
        ))}
      </section>

      {/* 推理盤ステータス */}
      <section className={`board-status ${boardReady ? "ready" : ""}`}>
        <span className="eyebrow">CASE BOARD</span>
        <b>
          横断証拠 {boardEvidenceFound} / {BOARD_EVIDENCE.length}
        </b>
        <p>
          {boardReady
            ? "推理盤へ結論を提出できます。"
            : "異なる調査線を照合すると証拠枠が埋まります。"}
        </p>
        <button onClick={() => onOpenNotebook("board")}>
          {caseSolved ? "認定内容を見る" : "推理盤を開く"}
        </button>
      </section>

      {/* ヒント */}
      <section className="side-help">
        <b>行き詰まった場合</b>
        <p>一つの最新資料だけを追わず、別の調査線へ移ってください。</p>
        <button onClick={onOpenGuide}>段階式ヒント</button>
      </section>
    </aside>
  );
}
