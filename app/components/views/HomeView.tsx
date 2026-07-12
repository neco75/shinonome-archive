import { RefObject } from "react";
import type { Ending, NotebookTab, View } from "../../types";

export interface HomeViewProps {
  ending: Ending;
  today: Date | null;
  onNavigate: (view: View) => void;
  onOpenNotebook: (tab: NotebookTab) => void;
  onSetQuery: (q: string) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

export function HomeView({
  ending,
  today,
  onNavigate,
  onOpenNotebook,
  onSetQuery,
  searchInputRef,
}: HomeViewProps) {
  return (
    <>
      {/* エンディングバナー（クリア後のみ表示） */}
      {ending && (
        <section className={`ending-banner ${ending}`}>
          <span>{ending === "public" ? "PUBLIC RECORD" : "PROTECTED RECORD"}</span>
          <h2>
            {ending === "public"
              ? "第七観測所の欠番は公開台帳へ戻りました"
              : "M-07は限定保全記録に指定されました"}
          </h2>
          <p>
            {ending === "public"
              ? "冬木梢が38世帯を救った事実と、白鳥所長による改竄が公開されています。私的な記憶も同じ記録に残ります。"
              : "事故証拠は監査部へ提出され、冬木梢の私的な声は一般公開されません。欠番には保全記録の存在だけが記載されます。"}
          </p>
        </section>
      )}

      {/* メインビジュアル */}
      <section className="hero-notice">
        <div className="notice-date">
          <b>{today ? String(today.getDate()).padStart(2, "0") : "--"}</b>
          <span>
            {today ? today.toLocaleString("en-US", { month: "short" }).toUpperCase() : "---"}
            <br />
            {today ? today.getFullYear() : "----"}
          </span>
        </div>
        <div>
          <span className="eyebrow">DIGITAL ARCHIVE</span>
          <h2>過去の気象を、地域の記憶へ。</h2>
          <p>
            観測原簿、施設台帳、機器資料、住民寄贈資料を横断して公開しています。同じ出来事でも、資料種別によって記録内容が異なる場合があります。
          </p>
        </div>
      </section>

      {/* 調査の入口 */}
      <section className="entry-grid">
        <article>
          <span>01</span>
          <h3>施設から探す</h3>
          <p>観測所一覧には移管理由が不明な欠番があります。</p>
          <button onClick={() => onNavigate("stations")}>観測所一覧</button>
        </article>
        <article>
          <span>02</span>
          <h3>時刻から探す</h3>
          <p>平成10年度資料の02:13に、複数系統の欠測があります。</p>
          <button onClick={() => onNavigate("news")}>欠測のお知らせ</button>
        </article>
        <article>
          <span>03</span>
          <h3>寄贈元から探す</h3>
          <p>旧風見郵便局から災害時の日誌が寄贈されました。</p>
          <button onClick={() => onNavigate("news")}>寄贈記録</button>
        </article>
        <article>
          <span>04</span>
          <h3>機器から探す</h3>
          <p>自記気圧計B-4の仕様票と取扱補遺を公開しました。</p>
          <button
            onClick={() => {
              onSetQuery("B-4");
              searchInputRef.current?.focus();
            }}
          >
            検索欄へ
          </button>
        </article>
      </section>

      {/* 新着情報（抜粋） */}
      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">INFORMATION</span>
            <h2>更新情報</h2>
          </div>
          <button onClick={() => onNavigate("news")}>一覧を見る</button>
        </div>
        <div className="news-list">
          <article>
            <time>2026.07.07</time>
            <span>資料公開</span>
            <p>水無瀬郡A-17関連資料を4区分へ分けて公開しました。</p>
          </article>
          <article>
            <time>2026.06.21</time>
            <span>参考資料</span>
            <p>通信課所蔵「旧式電信符号表」の公開用抜粋を索引化しました。</p>
          </article>
          <article>
            <time>2026.05.30</time>
            <span>保守情報</span>
            <p>旧観測網で02:13から02:19までの記録不整合を確認しています。</p>
          </article>
        </div>
      </section>

      {/* 相互参照の説明 */}
      <section className="archive-intro">
        <div>
          <span className="eyebrow">CROSS REFERENCE</span>
          <h2>相互参照検索</h2>
          <p>
            深部資料には単独の索引語がありません。異なる資料で一致する人物符号・時刻・機器番号など、二つの語を空白で並べると照合できます。
          </p>
          <button onClick={() => onOpenNotebook("timeline")}>時系列整理を開く</button>
        </div>
        <div className="cross-example" aria-hidden="true">
          <div>
            <span>資料A</span>
            <i>人物符号</i>
          </div>
          <b>＋</b>
          <div>
            <span>資料B</span>
            <i>計画名</i>
          </div>
          <strong>照合</strong>
        </div>
      </section>
    </>
  );
}
