# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

エンジニア個人のポートフォリオサイト。自己紹介、制作物(プロジェクト)、技術スタックを掲載する。

**デザインはユーザー自身が行う方針。** レイアウト・配色・タイポグラフィ・コンポーネントのスタイリングなど、ビジュアルデザインを自発的に提案・実装しないこと。ユーザーが明示的に指示した場合のみデザイン変更を行う。それ以外は構造・コンテンツの組み込み・機能面に専念する。

## 進め方

**ユーザーがどのような実装かを理解するまでは、コードの実装を始めないこと。** まず実装方針・アプローチ・変更内容を説明し、ユーザーがそれを理解・納得したことを確認してから、実際のコード実装に着手する。いきなりコードを書き始めないこと。

## 技術スタック

- [Astro](https://docs.astro.build) (v7) — 静的サイトフレームワーク。ページは `src/pages/` に配置
- React (v19) — `@astrojs/react` 経由。Astroのアイランドアーキテクチャでインタラクティブなコンポーネントに使用
- TypeScript — `tsconfig.json` は `astro/tsconfigs/strict` を継承
- Node.js — `>=22.12.0`

## コマンド

すべてプロジェクトルートで実行:

| コマンド             | 内容                                      |
| -------------------- | ----------------------------------------- |
| `npm install`         | 依存関係のインストール                    |
| `npm run dev`          | ローカル開発サーバーを起動 (`localhost:4321`) |
| `npm run build`        | 本番用ビルドを `dist/` に出力              |
| `npm run preview`      | 本番ビルドをローカルでプレビュー           |
| `npm run astro ...`    | Astro CLIコマンドを実行 (例: `astro check`) |

## 構成

- `src/pages/` — ファイルベースルーティング。`.astro` ファイル1つがルート1つに対応(現状は `index.astro` のみ)
- `src/layouts/` — 共通レイアウト(`Layout.astro` が `<head>`/`<body>` の共通部分をラップ)
- `src/components/` — `.astro` および Reactコンポーネント。`Main.astro` がページ全体の骨格と掲載データ(プロジェクト・所属・活動・スキル)を保持し、`Nav.astro` がナビゲーションとソーシャルリンク(`socials` 配列)を管理
- `src/assets/` — Astroのアセットパイプラインで処理される画像・SVG
- `public/` — そのまま配信される静的ファイル(favicon、背景画像、`works/` 配下の制作物スクリーンショット等)

## Git運用

**`git push` する際は、コミットした後にプルリクエストを送る方針とする。** 直接デフォルトブランチへ push せず、作業用ブランチでコミット → push → プルリクエストを作成する流れで進める。
