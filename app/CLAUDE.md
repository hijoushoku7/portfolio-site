# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

エンジニア個人のポートフォリオサイト。自己紹介、制作物(プロジェクト)、技術スタックを掲載する。

**デザインはユーザー自身が行う方針。** レイアウト・配色・タイポグラフィ・コンポーネントのスタイリングなど、ビジュアルデザインを自発的に提案・実装しないこと。ユーザーが明示的に指示した場合のみデザイン変更を行う。それ以外は構造・コンテンツの組み込み・機能面に専念する。

## 技術スタック

- [Astro](https://docs.astro.build) (v6) — 静的サイトフレームワーク。ページは `app/src/pages/` に配置
- React (v19) — `@astrojs/react` 経由。Astroのアイランドアーキテクチャでインタラクティブなコンポーネントに使用
- TypeScript — `app/tsconfig.json` は `astro/tsconfigs/strict` を継承

## コマンド

すべて `app/` ディレクトリ内で実行:

| コマンド             | 内容                                      |
| -------------------- | ----------------------------------------- |
| `npm install`         | 依存関係のインストール                    |
| `npm run dev`          | ローカル開発サーバーを起動 (`localhost:4321`) |
| `npm run build`        | 本番用ビルドを `app/dist/` に出力          |
| `npm run preview`      | 本番ビルドをローカルでプレビュー           |
| `npm run astro ...`    | Astro CLIコマンドを実行 (例: `astro check`) |

## 構成

- `app/src/pages/` — ファイルベースルーティング。`.astro` ファイル1つがルート1つに対応
- `app/src/layouts/` — 共通レイアウト(例: `Layout.astro` が `<head>`/`<body>` の共通部分をラップ)
- `app/src/components/` — `.astro` および Reactコンポーネント
- `app/src/assets/` — Astroのアセットパイプラインで処理される画像・SVG
- `app/public/` — そのまま配信される静的ファイル(favicon等)

現状はAstroのスターターテンプレートのまま(`Welcome.astro`、スターターの `index.astro` 等)で、実際のポートフォリオ内容はまだ実装されていない。
