"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  BOARD_EVIDENCE,
  REQUIRED_IDS,
  STORAGE_KEY,
  findRoute,
  normalize,
  records,
  routes,
} from "./archive-data";
import { Sidebar } from "./components/Sidebar";
import { GuideModal } from "./components/modals/GuideModal";
import { NotebookModal } from "./components/modals/NotebookModal";
import { SafetyModal } from "./components/modals/SafetyModal";
import { AboutView } from "./components/views/AboutView";
import { HomeView } from "./components/views/HomeView";
import { NewsView } from "./components/views/NewsView";
import { RecordsView } from "./components/views/RecordsView";
import { StationsView } from "./components/views/StationsView";
import {
  CORRECT_BOARD,
  INITIAL_BOARD_ANSWERS,
  TRACKED_BRANCHES,
  type BoardAnswers,
  type Ending,
  type NotebookTab,
  type View,
} from "./types";

// ─── メインコンポーネント ──────────────────────────────────────────────────────
//
// このファイルの責務は「状態管理・副作用・アクション定義・ページレイアウト」のみ。
// 各ビジュアル要素は components/ 以下のコンポーネントに委譲する。

export default function Home() {
  // ── State ─────────────────────────────────────────────────────────────────

  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("");
  const [resultIds, setResultIds] = useState<string[]>([]);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showNotebook, setShowNotebook] = useState(false);
  const [notebookTab, setNotebookTab] = useState<NotebookTab>("files");
  const [showGuide, setShowGuide] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [ending, setEnding] = useState<Ending>(null);
  const [loaded, setLoaded] = useState(false);
  const [boardAnswers, setBoardAnswers] = useState<BoardAnswers>(INITIAL_BOARD_ANSWERS);
  const [boardFeedback, setBoardFeedback] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  // ── Persistence ────────────────────────────────────────────────────────────

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (Array.isArray(saved?.discovered))
          setDiscovered(saved.discovered.filter((id: string) => records[id]));
        if (Array.isArray(saved?.searchHistory)) setSearchHistory(saved.searchHistory.slice(0, 8));
        if (saved?.ending === "public" || saved?.ending === "protected") setEnding(saved.ending);
      } catch {
        // Invalid local state is ignored; the archive remains usable.
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ discovered, searchHistory, ending }));
  }, [discovered, searchHistory, ending, loaded]);

  // ── Derived state ──────────────────────────────────────────────────────────

  /** Set 版 discovered。`includes` の O(n) を `.has` の O(1) に改善。 */
  const discoveredSet = useMemo(() => new Set(discovered), [discovered]);

  const requiredFound = useMemo(
    () => REQUIRED_IDS.filter((id) => discoveredSet.has(id)).length,
    [discoveredSet],
  );
  const progress = Math.round((requiredFound / REQUIRED_IDS.length) * 100);
  const boardEvidenceFound = BOARD_EVIDENCE.filter((id) => discoveredSet.has(id)).length;
  const boardReady = boardEvidenceFound === BOARD_EVIDENCE.length;
  const caseSolved = discoveredSet.has("FINAL-0");

  /** クライアント側でのみ確定する今日の日付。ハイドレーション不一致を避けるため loaded 後に確定。 */
  const today = loaded ? new Date() : null;

  const branchProgress = useMemo(
    () =>
      TRACKED_BRANCHES.map((branch) => {
        const branchIds = REQUIRED_IDS.filter((id) => records[id]?.branch === branch);
        return {
          branch,
          found: branchIds.filter((id) => discoveredSet.has(id)).length,
          total: branchIds.length,
        };
      }),
    [discoveredSet],
  );

  // ── Actions ────────────────────────────────────────────────────────────────

  function navigate(next: View) {
    setView(next);
    setShowNotebook(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openRecord(id: string) {
    setResultIds([id]);
    setSearched(records[id].title);
    setMessage("発見済み記録を開いています。");
    navigate("records");
  }

  function openNotebook(tab: NotebookTab = "files") {
    setNotebookTab(tab);
    setShowNotebook(true);
  }

  function runSearch(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setMessage("検索語を入力してください。");
      return;
    }

    setSearched(trimmed);
    setSearchHistory((current) =>
      [trimmed, ...current.filter((item) => normalize(item) !== normalize(trimmed))].slice(0, 8),
    );
    setView("records");

    const route = findRoute(trimmed);
    if (route) {
      setResultIds(route.ids);
      setDiscovered((current) => Array.from(new Set([...current, ...route.ids])));
      setMessage(
        route.cross
          ? `相互参照に一致し、${route.ids.length}件の深部資料を復元しました。`
          : `${route.ids.length}件の記録が見つかりました。`,
      );
      window.setTimeout(() => document.getElementById("search-results")?.focus(), 0);
      return;
    }

    const partial = routes.some((routeItem) =>
      routeItem.terms.some((term) => {
        const known = normalize(term);
        const entered = normalize(trimmed);
        return entered.length >= 2 && (known.includes(entered) || entered.includes(known));
      }),
    );
    setResultIds([]);
    setMessage(
      partial
        ? "索引語の一部が一致しました。資料にある完全な固有名詞、または二つの照合語を入力してください。"
        : "公開索引に一致する記録はありません。仮説を変え、別系統の資料と照合してください。",
    );
  }

  function submitBoard(event: FormEvent) {
    event.preventDefault();
    if (!boardReady) {
      setBoardFeedback("横断証拠が不足しています。4つの照合枠をすべて埋めてください。");
      return;
    }
    const keys = Object.keys(CORRECT_BOARD) as Array<keyof BoardAnswers>;
    const score = keys.filter((key) => boardAnswers[key] === CORRECT_BOARD[key]).length;
    if (score < 4) {
      setBoardFeedback(
        `4項目中${score}項目は資料と整合します。時刻、現地鍵、記憶信号、改訂履歴をもう一度並べてください。`,
      );
      return;
    }
    setDiscovered((current) => Array.from(new Set([...current, "FINAL-0"])));
    setResultIds(["FINAL-0"]);
    setSearched("調査盤・記録認定審査");
    setMessage("推理が全資料と整合しました。最終審査資料を開示します。");
    setBoardFeedback("");
    navigate("records");
  }

  function resetProgress() {
    if (!window.confirm("この端末に保存された全調査記録と結末を消去しますか？")) return;
    setDiscovered([]);
    setEnding(null);
    setResultIds([]);
    setSearched("");
    setQuery("");
    setSearchHistory([]);
    setBoardAnswers(INITIAL_BOARD_ANSWERS);
    setBoardFeedback("");
    localStorage.removeItem(STORAGE_KEY);
    navigate("home");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className={ending ? `site ending-${ending}` : "site"}>
      {/* ユーティリティバー */}
      <div className="utility-bar">
        <div className="utility-inner">
          <span>東雲県 デジタル資料公開基盤</span>
          <div>
            <button onClick={() => setShowGuide(true)}>資料検索の使い方</button>
            <button onClick={() => setShowSafety(true)}>このサイトについて</button>
          </div>
        </div>
      </div>

      {/* ヘッダー */}
      <header className="site-header">
        <button className="brand" onClick={() => navigate("home")} aria-label="資料室トップへ">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            <b>東雲地方気象資料室</b>
            <small>SHINONOME REGIONAL METEOROLOGICAL ARCHIVE</small>
          </span>
        </button>
        <div className="header-status">
          <span className="status-dot" />
          <span>公開資料システム</span>
          <b>{caseSolved ? "再審査中" : "正常"}</b>
        </div>
      </header>

      {/* ナビゲーション */}
      <nav className="primary-nav" aria-label="主要メニュー">
        <div>
          <button className={view === "home" ? "active" : ""} onClick={() => navigate("home")}>
            資料室トップ
          </button>
          <button className={view === "about" ? "active" : ""} onClick={() => navigate("about")}>
            資料室について
          </button>
          <button
            className={view === "stations" ? "active" : ""}
            onClick={() => navigate("stations")}
          >
            観測所一覧
          </button>
          <button className={view === "news" ? "active" : ""} onClick={() => navigate("news")}>
            更新情報
          </button>
          <button className="notebook-nav" onClick={() => openNotebook("files")}>
            調査記録 <span>{discovered.length}</span>
          </button>
        </div>
      </nav>

      {/* 検索バー */}
      <section className="search-band" aria-label="資料検索">
        <div className="search-band-inner">
          <div>
            <span className="eyebrow">ARCHIVE SEARCH</span>
            <h1>観測資料を検索</h1>
            <p>地名、人物、時刻、機器番号。異なる資料の語は空白で照合できます。</p>
          </div>
          <form className="search-form" onSubmit={runSearch}>
            <label htmlFor="archive-search">検索語</label>
            <div>
              <input
                ref={searchInput}
                id="archive-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例：観測所名、記録時刻、二つの照合語"
                autoComplete="off"
              />
              <button type="submit">資料を検索</button>
            </div>
            <small>
              単語を拾うだけでなく、複数資料で一致する人物・時刻・番号を組み合わせてください。
            </small>
          </form>
        </div>
      </section>

      {/* ページ本体（サイドバー + コンテンツエリア） */}
      <div className="page-shell">
        <Sidebar
          progress={progress}
          requiredFound={requiredFound}
          boardEvidenceFound={boardEvidenceFound}
          boardReady={boardReady}
          caseSolved={caseSolved}
          branchProgress={branchProgress}
          onOpenNotebook={openNotebook}
          onOpenGuide={() => setShowGuide(true)}
        />

        <div className="content-area">
          {view === "home" && (
            <HomeView
              ending={ending}
              today={today}
              onNavigate={navigate}
              onOpenNotebook={openNotebook}
              onSetQuery={setQuery}
              searchInputRef={searchInput}
            />
          )}
          {view === "about" && <AboutView />}
          {view === "stations" && <StationsView />}
          {view === "news" && <NewsView />}
          {view === "records" && (
            <RecordsView
              searched={searched}
              resultIds={resultIds}
              message={message}
              ending={ending}
              onSetEnding={setEnding}
              onNavigate={navigate}
              onFocusSearch={() => searchInput.current?.focus()}
            />
          )}
        </div>
      </div>

      {/* フッター */}
      <footer className="site-footer">
        <div>
          <button className="footer-brand" onClick={() => navigate("home")}>
            東雲地方気象資料室
          </button>
          <p>観測記録は、作成者と時刻を確認してご利用ください。</p>
        </div>
        <div>
          <button onClick={() => setShowGuide(true)}>検索の使い方</button>
          <button onClick={() => setShowSafety(true)}>安全と作品情報</button>
          <button onClick={resetProgress}>調査記録を消去</button>
        </div>
        <small>© 2026 Shinonome Regional Meteorological Archive</small>
      </footer>

      {/* モーダル群 */}
      <NotebookModal
        open={showNotebook}
        onClose={() => setShowNotebook(false)}
        notebookTab={notebookTab}
        onSetNotebookTab={setNotebookTab}
        branchProgress={branchProgress}
        boardEvidenceFound={boardEvidenceFound}
        discovered={discovered}
        discoveredSet={discoveredSet}
        boardAnswers={boardAnswers}
        boardReady={boardReady}
        caseSolved={caseSolved}
        boardFeedback={boardFeedback}
        onOpenRecord={openRecord}
        onSubmitBoard={submitBoard}
        onSetBoardAnswers={setBoardAnswers}
      />

      <GuideModal
        open={showGuide}
        onClose={() => setShowGuide(false)}
        hintLevel={hintLevel}
        onSetHintLevel={setHintLevel}
        searchHistory={searchHistory}
        onSearchFromHistory={(item) => {
          setQuery(item);
          setShowGuide(false);
          searchInput.current?.focus();
        }}
      />

      <SafetyModal open={showSafety} onClose={() => setShowSafety(false)} />
    </main>
  );
}
