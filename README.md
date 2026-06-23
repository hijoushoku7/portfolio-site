# portfolio-site

エンジニア個人のポートフォリオサイト。自己紹介・制作物（Works）・所属（Affiliation）・活動（Activities）・技術スタック（Skills）を 1 ページにまとめた静的サイトです。

## 技術スタック

- [Astro](https://docs.astro.build) v7 — 静的サイトフレームワーク
- [React](https://react.dev) v19 — `@astrojs/react` 経由でインタラクティブな部分に使用
- TypeScript — `astro/tsconfigs/strict` を継承
- Node.js — `>=22.12.0`

## セットアップ

```sh
npm install
npm run dev
```

開発サーバーが `http://localhost:4321` で起動します。

## コマンド

すべてプロジェクトルートで実行します。

| コマンド            | 内容                                          |
| ------------------- | --------------------------------------------- |
| `npm install`       | 依存関係のインストール                        |
| `npm run dev`       | 開発サーバーを起動（`localhost:4321`）        |
| `npm run build`     | 本番用ビルドを `dist/` に出力                  |
| `npm run preview`   | 本番ビルドをローカルでプレビュー              |
| `npm run astro ...` | Astro CLI を実行（例: `npm run astro check`） |

## ディレクトリ構成

```text
/
├── public/             # そのまま配信される静的ファイル
│   ├── mainBackground.png, paper.png  # 背景画像
│   └── works/          # 制作物のスクリーンショット
├── src/
│   ├── assets/         # アセットパイプラインで処理される画像・SVG
│   ├── components/     # Astro / React コンポーネント
│   │   ├── Main.astro      # ページ全体の骨格・コンテンツデータ
│   │   ├── Nav.astro       # ナビゲーション・ソーシャルリンク
│   │   ├── Hero.astro      # ファーストビュー
│   │   ├── Section.astro   # 各セクションの共通ラッパー
│   │   ├── ProjectCard.astro / Modal.astro  # Works のカードと詳細モーダル
│   │   ├── SkillBlock.astro # Skills の各技術ブロック
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro     # <head>/<body> の共通レイアウト
│   └── pages/
│       └── index.astro      # ルート（ファイルベースルーティング）
├── astro.config.mjs
└── package.json
```

## コンテンツの編集

掲載内容（プロジェクト・所属・活動・スキル）は `src/components/Main.astro` 冒頭のスクリプト部にデータ配列としてまとめています。テキストや画像パスを差し替えることで内容を更新できます。

ソーシャルリンク（GitHub・Mail）は `src/components/Nav.astro` の `socials` 配列で管理しています。

## ビルド

```sh
npm run build
```

成果物は `dist/` に出力されます。任意の静的ホスティング（Cloudflare Pages 等）にそのままデプロイできます。
