# 東雲地方気象資料室

フィクションの Web 探索型 ARG（Alternative Reality Game）。  
プレイヤーは「東雲地方気象資料室」の公開システムを通じ、気象記録・施設台帳・行政文書を横断調査し、02:13 の欠番に隠された真相を解明する。

https://shinonome-archive.pages.dev/

## 概要

| 項目         | 内容                           |
| ------------ | ------------------------------ |
| ジャンル     | Web 探索型 ARG                 |
| 言語         | 日本語                         |
| データ永続化 | `localStorage`（サーバー不要） |
| 外部依存     | なし（API・ログイン・DB なし） |

### ディレクトリ構成

```
app/
├── page.tsx               # エントリーポイント（状態管理・レイアウト）
├── types.ts               # 共有型・定数
├── archive-data.tsx       # ゲームデータ（資料・ルート・ヒント）
├── globals.css            # グローバルスタイル
├── layout.tsx             # ルートレイアウト
└── components/
    ├── Modal.tsx          # 汎用モーダルラッパー
    ├── RecordCard.tsx     # 資料カード
    ├── Sidebar.tsx        # サイドバー
    ├── views/             # ページビュー（Home / About / Stations / News / Records）
    └── modals/            # モーダル（Notebook / Guide / Safety）
```

## 環境構築

### 必要なもの

- **Node.js** `>=22.13.0`

### セットアップ

```bash
# 依存のインストール
npm install

# 開発サーバーの起動（http://localhost:3000）
npm run dev
```

### その他のコマンド

```bash
npm run build         # プロダクションビルド
npm run lint          # ESLint による静的解析（Prettier 連携）
npm run format        # Prettier によるコードの自動整形
npm run format:check  # フォーマットのチェック
npm run test          # Vitest によるテストの実行（1回）
npm run test:watch    # Vitest によるテストの監視モード起動
```

## 自動化機能 (Lint / Format)

### 保存時の自動実行 (VS Code 用)

`.vscode/settings.json` の設定により、VS Code 上でファイルを保存した際、Prettier による自動整形および ESLint による自動修正 (`--fix`) が実行されます。

### コミット時の自動検証 (Git Hooks)

`husky` と `lint-staged` により、`git commit` の実行時、コミット対象（ステージングされたファイル）に対してのみ自動的に Lint チェックと Prettier によるフォーマットが走ります。ルールエラーがある場合はコミットが自動で中断されるため、不完全なコードの混入を防ぐことができます。
