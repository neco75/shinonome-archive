import { Modal } from "../Modal";

export function SafetyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose}>
      <section
        className="modal safety"
        role="dialog"
        aria-modal="true"
        aria-labelledby="safety-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="閉じる">
          ×
        </button>
        <span className="eyebrow">ABOUT THIS EXPERIENCE</span>
        <h2 id="safety-title">安全と作品情報</h2>
        <p>
          「東雲地方気象資料室」はフィクションのWeb探索型ARGです。登場する自治体、施設、人物、災害、計画はすべて架空です。
        </p>
        <ul>
          <li>サイト内だけで最後まで遊べます。外部への連絡や訪問は不要です。</li>
          <li>個人情報入力、ダウンロード、ソースコード解析は不要です。</li>
          <li>進捗はこの端末のブラウザ内だけに保存されます。</li>
          <li>突然の大音量、点滅、時間制限、進行不能はありません。</li>
        </ul>
        <button className="safety-continue" onClick={onClose}>
          資料室へ戻る
        </button>
      </section>
    </Modal>
  );
}
