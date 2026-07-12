// ─── アプリ共通の型と定数 ──────────────────────────────────────────────────────
//
// archive-data に依存しない型・定数はここで定義し、各コンポーネントから import する。
// archive-data 固有の型（ArchiveRecord / Branch）は archive-data から直接 import すること。

import type { Branch } from "./archive-data";

// ── 型 ──────────────────────────────────────────────────────────────────────────

export type View = "home" | "about" | "stations" | "news" | "records";
export type NotebookTab = "files" | "timeline" | "board";
export type Ending = "public" | "protected" | null;
export type BoardAnswers = {
  operator: string;
  cause: string;
  signal: string;
  cover: string;
};

// ── 定数 ─────────────────────────────────────────────────────────────────────────

export const TRACKED_BRANCHES: Branch[] = ["weather", "people", "machine", "admin", "convergence"];

export const INITIAL_BOARD_ANSWERS: BoardAnswers = {
  operator: "",
  cause: "",
  signal: "",
  cover: "",
};

export const CORRECT_BOARD: BoardAnswers = {
  operator: "f04",
  cause: "aster",
  signal: "memory",
  cover: "shiratori",
};

export const TIMELINE = [
  { time: "01:40", id: "SHIFT-817", text: "K-02が点検を終えて退所" },
  { time: "02:07", id: "DRAFT-0207", text: "白鳥所長が落雷事故報告を作成" },
  { time: "02:13", id: "ACT-LOG", text: "F-04がB-4と南塔回線を起動" },
  { time: "02:14", id: "BROADCAST-LOG", text: "記憶信号による避難放送" },
  { time: "02:18", id: "ACC-REPORT", text: "確定報告書上の通信停止後" },
  { time: "02:19", id: "POWER-LOG", text: "実際の雷サージと全電源断" },
];

export const STATIONS = [
  ["01", "東雲中央測候所", "東雲市", "現用"],
  ["02", "海凪沿岸観測所", "海凪町", "現用"],
  ["03", "鐘守山岳観測所", "鐘守村", "1999廃止"],
  ["04", "柊沢雨量観測所", "水無瀬郡", "2008移設"],
  ["05", "日暮高層風観測所", "日暮町", "1995廃止"],
  ["06", "水無瀬第一観測所", "水無瀬郡", "2001廃止"],
];
