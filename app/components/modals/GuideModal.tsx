import { hints } from "../../archive-data";
import { Modal } from "../Modal";

export interface GuideModalProps {
  open: boolean;
  onClose: () => void;
  hintLevel: number;
  onSetHintLevel: (updater: number | ((prev: number) => number)) => void;
  searchHistory: string[];
  onSearchFromHistory: (term: string) => void;
}

export function GuideModal({
  open,
  onClose,
  hintLevel,
  onSetHintLevel,
  searchHistory,
  onSearchFromHistory,
}: GuideModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <section
        className="modal guide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="閉じる">
          ×
        </button>
        <span className="eyebrow">SEARCH GUIDE</span>
        <h2 id="guide-title">調査の進め方</h2>

        <ol className="guide-steps">
          <li>
            <div>
              <b>複数の入口を使う</b>
              <span>施設・時刻・人物・機器を並行して調査します。</span>
            </div>
          </li>
          <li>
            <div>
              <b>資料を照合する</b>
              <span>別資料で一致する二語を空白で並べます。</span>
            </div>
          </li>
          <li>
            <div>
              <b>時系列を疑う</b>
              <span>公式説明より、作成時刻と機械ログを優先します。</span>
            </div>
          </li>
          <li>
            <div>
              <b>結論を提出する</b>
              <span>深部証拠を集め、推理盤で因果関係を組み立てます。</span>
            </div>
          </li>
        </ol>

        <div className="hint-box">
          <div>
            <b>
              段階式ヒント {hintLevel + 1} / {hints.length}
            </b>
            <button onClick={() => onSetHintLevel(0)}>最初に戻す</button>
          </div>
          <p>{hints[hintLevel]}</p>
          <button
            disabled={hintLevel >= hints.length - 1}
            onClick={() => onSetHintLevel((level) => Math.min(level + 1, hints.length - 1))}
          >
            次のヒントを見る
          </button>
        </div>

        {searchHistory.length > 0 && (
          <div className="search-history">
            <b>この端末の検索履歴</b>
            <div>
              {searchHistory.map((item) => (
                <button key={item} onClick={() => onSearchFromHistory(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </Modal>
  );
}
