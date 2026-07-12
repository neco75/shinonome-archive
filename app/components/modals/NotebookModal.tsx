import { FormEvent } from "react";
import { BOARD_EVIDENCE, BRANCH_META, records, type Branch } from "../../archive-data";
import type { BoardAnswers, NotebookTab } from "../../types";
import { TIMELINE } from "../../types";
import { Modal } from "../Modal";

export interface NotebookModalProps {
  open: boolean;
  onClose: () => void;
  notebookTab: NotebookTab;
  onSetNotebookTab: (tab: NotebookTab) => void;
  branchProgress: { branch: Branch; found: number; total: number }[];
  boardEvidenceFound: number;
  discovered: string[];
  discoveredSet: Set<string>;
  boardAnswers: BoardAnswers;
  boardReady: boolean;
  caseSolved: boolean;
  boardFeedback: string;
  onOpenRecord: (id: string) => void;
  onSubmitBoard: (e: FormEvent) => void;
  onSetBoardAnswers: (answers: BoardAnswers) => void;
}

export function NotebookModal({
  open,
  onClose,
  notebookTab,
  onSetNotebookTab,
  branchProgress,
  boardEvidenceFound,
  discovered,
  discoveredSet,
  boardAnswers,
  boardReady,
  caseSolved,
  boardFeedback,
  onOpenRecord,
  onSubmitBoard,
  onSetBoardAnswers,
}: NotebookModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <section
        className="modal notebook expanded"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notebook-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="閉じる">
          ×
        </button>
        <span className="eyebrow">INVESTIGATION LOG</span>
        <h2 id="notebook-title">調査記録</h2>

        {/* タブ */}
        <div className="notebook-tabs" role="tablist">
          <button
            className={notebookTab === "files" ? "active" : ""}
            onClick={() => onSetNotebookTab("files")}
          >
            発見資料
          </button>
          <button
            className={notebookTab === "timeline" ? "active" : ""}
            onClick={() => onSetNotebookTab("timeline")}
          >
            時系列
          </button>
          <button
            className={notebookTab === "board" ? "active" : ""}
            onClick={() => onSetNotebookTab("board")}
          >
            推理盤{" "}
            <span>
              {boardEvidenceFound}/{BOARD_EVIDENCE.length}
            </span>
          </button>
        </div>

        {/* 発見資料タブ */}
        {notebookTab === "files" && (
          <div className="notebook-files">
            <div className="branch-summary">
              {branchProgress.map(({ branch, found, total }) => (
                <div key={branch}>
                  <span className={`branch-dot ${branch}`} />
                  <b>{BRANCH_META[branch].short}</b>
                  <em>
                    {found}/{total}
                  </em>
                </div>
              ))}
            </div>
            {discovered.length ? (
              <div className="notebook-list">
                {discovered
                  .filter((id) => records[id])
                  .map((id, index) => (
                    <button key={id} onClick={() => onOpenRecord(id)}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <b>{records[id].title}</b>
                        <small>
                          {BRANCH_META[records[id].branch].label} / {records[id].id}
                        </small>
                      </div>
                      <i>開く</i>
                    </button>
                  ))}
              </div>
            ) : (
              <div className="notebook-empty">
                <p>まだ資料を発見していません。</p>
                <span>観測所一覧・更新情報・設備公開から好きな入口を選べます。</span>
              </div>
            )}
          </div>
        )}

        {/* 時系列タブ */}
        {notebookTab === "timeline" && (
          <div className="timeline-board">
            <p>発見した資料だけが時系列へ反映されます。同じ出来事の前後関係を比較してください。</p>
            {TIMELINE.map((event) => {
              const found = discoveredSet.has(event.id);
              return (
                <div className={found ? "found" : "unknown"} key={event.id}>
                  <time>{found ? event.time : "??:??"}</time>
                  <span>{found ? event.text : "未発見の記録"}</span>
                  {found && <button onClick={() => onOpenRecord(event.id)}>資料</button>}
                </div>
              );
            })}
          </div>
        )}

        {/* 推理盤タブ */}
        {notebookTab === "board" && (
          <form className="case-board" onSubmit={onSubmitBoard}>
            <div className="evidence-slots">
              {BOARD_EVIDENCE.map((id, index) => {
                const found = discoveredSet.has(id);
                return (
                  <button
                    type="button"
                    key={id}
                    className={found ? "filled" : "empty"}
                    onClick={() => found && onOpenRecord(id)}
                  >
                    <span>証拠 {index + 1}</span>
                    <b>{found ? records[id].evidence : "未照合"}</b>
                  </button>
                );
              })}
            </div>
            <div className={`board-lock ${boardReady ? "unlocked" : ""}`}>
              <b>{boardReady ? "推理提出が可能です" : "横断証拠を4件集めてください"}</b>
              <p>最終資料に答えは書かれていません。複数資料と矛盾しない説明を選びます。</p>
            </div>
            <div className="deduction-grid">
              <label>
                ASTERを起動した人物
                <select
                  value={boardAnswers.operator}
                  onChange={(e) => onSetBoardAnswers({ ...boardAnswers, operator: e.target.value })}
                  disabled={!boardReady}
                >
                  <option value="">選択してください</option>
                  <option value="k02">常盤要（K-02）</option>
                  <option value="f04">冬木梢（F-04）</option>
                  <option value="auto">無人の自動運転</option>
                </select>
              </label>
              <label>
                青い雨と異常信号の原因
                <select
                  value={boardAnswers.cause}
                  onChange={(e) => onSetBoardAnswers({ ...boardAnswers, cause: e.target.value })}
                  disabled={!boardReady}
                >
                  <option value="">選択してください</option>
                  <option value="lightning">02:08の落雷事故</option>
                  <option value="flood">河川増水による故障</option>
                  <option value="aster">ASTER共鳴試験</option>
                </select>
              </label>
              <label>
                02:14に放送されたもの
                <select
                  value={boardAnswers.signal}
                  onChange={(e) => onSetBoardAnswers({ ...boardAnswers, signal: e.target.value })}
                  disabled={!boardReady}
                >
                  <option value="">選択してください</option>
                  <option value="recording">事前録音された警報</option>
                  <option value="memory">梢の短期記憶信号</option>
                  <option value="weather">気象データの自動音声</option>
                </select>
              </label>
              <label>
                事故記録を改竄した主体
                <select
                  value={boardAnswers.cover}
                  onChange={(e) => onSetBoardAnswers({ ...boardAnswers, cover: e.target.value })}
                  disabled={!boardReady}
                >
                  <option value="">選択してください</option>
                  <option value="tokiwa">常盤要</option>
                  <option value="system">資料室の自動処理</option>
                  <option value="shiratori">白鳥道隆 所長</option>
                </select>
              </label>
            </div>
            <button className="submit-deduction" type="submit" disabled={!boardReady || caseSolved}>
              {caseSolved ? "記録認定済み" : "推理を提出する"}
            </button>
            {boardFeedback && (
              <p className="board-feedback" role="status">
                {boardFeedback}
              </p>
            )}
          </form>
        )}
      </section>
    </Modal>
  );
}
