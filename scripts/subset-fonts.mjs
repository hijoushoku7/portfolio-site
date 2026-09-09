// src/ に出てくる文字だけを含む woff2 を生成する。
// 出力名にコンテンツハッシュを入れるので、nginx 側で長期キャッシュしても安全。
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC_TTF = 'fonts';
const OUT_WOFF2 = 'public/fonts/generated'; // 配信される
const OUT_CSS = 'src/generated/fonts.css';  // ビルド時にインラインされる

const FACES = [
	{ ttf: 'DotGothic16-Regular.ttf', family: 'DotGothic16', weight: 400,
	  cssVar: '--font-dotgothic16', fallback: `'Courier New', monospace` },
	{ ttf: 'ZenKakuGothicNew-Regular.ttf', family: 'Zen Kaku Gothic New', weight: 400,
	  cssVar: '--font-zen-kaku', fallback: `system-ui, sans-serif` },
	{ ttf: 'ZenKakuGothicNew-Bold.ttf', family: 'Zen Kaku Gothic New', weight: 700 },
];

// src/ の全テキスト + ASCII・かな・全角記号。コードやコメントの文字も混ざるが超集合なので害はない
function collectChars() {
	const files = readdirSync('src', { recursive: true, withFileTypes: true })
		.filter((d) => d.isFile() && /\.(astro|ts|tsx|js|jsx|md)$/.test(d.name))
		.map((d) => join(d.parentPath, d.name));
	const ranges = [[0x20, 0x7e], [0x3000, 0x30ff], [0xff00, 0xff60]];
	let base = '';
	for (const [lo, hi] of ranges) for (let c = lo; c <= hi; c++) base += String.fromCodePoint(c);
	const text = files.map((f) => readFileSync(f, 'utf8')).join('') + base;
	return [...new Set(text)].sort().join('');
}

const chars = collectChars();
mkdirSync(OUT_WOFF2, { recursive: true });
mkdirSync('src/generated', { recursive: true });
const charsFile = 'src/generated/chars.txt';
writeFileSync(charsFile, chars);

const keep = new Set();
let css = '';
for (const face of FACES) {
	const ttf = join(SRC_TTF, face.ttf);
	const hash = createHash('sha256')
		.update(readFileSync(ttf)).update(chars)
		.digest('hex').slice(0, 8);
	const name = `${face.ttf.replace(/\.ttf$/, '')}.${hash}.woff2`;
	keep.add(name);
	const out = join(OUT_WOFF2, name);

	if (!readdirSync(OUT_WOFF2).includes(name)) {
		execFileSync('pyftsubset', [ttf,
			`--text-file=${charsFile}`,
			'--flavor=woff2',
			'--layout-features=kern,liga,palt,vert,vrt2',
			`--output-file=${out}`,
		], { stdio: 'inherit' });
	}
	css += `@font-face{font-family:'${face.family}';src:url('/fonts/generated/${name}') format('woff2');font-weight:${face.weight};font-style:normal;font-display:swap}\n`;
}
css += `:root{${FACES.filter((f) => f.cssVar)
	.map((f) => `${f.cssVar}:'${f.family}',${f.fallback}`).join(';')}}\n`;

writeFileSync(OUT_CSS, css);
for (const f of readdirSync(OUT_WOFF2)) if (!keep.has(f)) rmSync(join(OUT_WOFF2, f)); // 古いハッシュを掃除
console.log(`[fonts] ${chars.length} chars -> ${FACES.length} files`);
