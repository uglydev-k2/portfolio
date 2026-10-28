import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([length, typeBuf, data, crc]);
}

function writePng(file, width, height, paint) {
  const rowBytes = width * 3 + 1;
  const raw = Buffer.alloc(rowBytes * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * rowBytes;
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = paint(x, y, width, height);
      const i = row + 1 + x * 3;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, png);
}

function inRoundRect(x, y, x0, y0, x1, y1, radius) {
  if (x < x0 || y < y0 || x >= x1 || y >= y1) return false;
  const r = radius;
  const left = x < x0 + r;
  const right = x >= x1 - r;
  const top = y < y0 + r;
  const bottom = y >= y1 - r;
  if (!(left || right) || !(top || bottom)) return true;
  const cx = left ? x0 + r : x1 - r;
  const cy = top ? y0 + r : y1 - r;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function mix(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

const bg = [14, 16, 24];
const bgDeep = [22, 26, 38];
const panel = [28, 33, 48];
const card = [36, 42, 61];
function screen(accent, draw) {
  return (x, y, w, h) => {
    const base = mix(bg, bgDeep, y / h);
    const hit = draw(x, y, w, h, accent);
    return hit ?? base;
  };
}

function bar(x, y, w, accent) {
  if (y < 56) return y < 4 ? accent : [18, 21, 32];
  if (x < 18 && y > 70 && y < 86) return accent;
  return null;
}

function harbor(x, y, w, h, accent) {
  const top = bar(x, y, w, accent);
  if (top) return top;
  if (x < w * 0.2 && y >= 56) return panel;
  const cards = [
    [0.26, 0.16, 0.3, 0.24],
    [0.6, 0.16, 0.32, 0.24],
    [0.26, 0.48, 0.66, 0.38],
  ];
  for (const [cx, cy, cw, ch] of cards) {
    if (inRoundRect(x, y, cx * w, cy * h, (cx + cw) * w, (cy + ch) * h, 16)) {
      if (y < cy * h + 8) return accent;
      return card;
    }
  }
  return null;
}

function storefront(x, y, w, h, accent) {
  const top = bar(x, y, w, accent);
  if (top) return top;
  const tiles = [
    [0.08, 0.18],
    [0.32, 0.18],
    [0.56, 0.18],
    [0.8, 0.18],
    [0.08, 0.56],
    [0.32, 0.56],
    [0.56, 0.56],
    [0.8, 0.56],
  ];
  for (const [cx, cy] of tiles) {
    if (inRoundRect(x, y, cx * w, cy * h, (cx + 0.16) * w, (cy + 0.3) * h, 14)) {
      if (y < cy * h + h * 0.16) return accent;
      return card;
    }
  }
  return null;
}

function rows(x, y, w, h, accent) {
  const top = bar(x, y, w, accent);
  if (top) return top;
  for (let i = 0; i < 6; i += 1) {
    const y0 = 0.16 * h + i * 0.12 * h;
    if (inRoundRect(x, y, 0.08 * w, y0, 0.92 * w, y0 + 0.09 * h, 12)) {
      if (x < 0.12 * w) return accent;
      return i % 2 === 0 ? card : panel;
    }
  }
  return null;
}

function editor(x, y, w, h, accent) {
  const top = bar(x, y, w, accent);
  if (top) return top;
  if (x < w * 0.24 && y >= 56) return panel;
  if (inRoundRect(x, y, 0.3 * w, 0.16 * h, 0.92 * w, 0.88 * h, 18)) {
    if (y < 0.16 * h + 10) return accent;
    return card;
  }
  return null;
}

function gallery(x, y, w, h, accent) {
  const top = bar(x, y, w, accent);
  if (top) return top;
  const tiles = [
    [0.06, 0.14, 0.28, 0.36],
    [0.37, 0.14, 0.27, 0.22],
    [0.67, 0.14, 0.27, 0.3],
    [0.37, 0.4, 0.27, 0.28],
    [0.06, 0.54, 0.28, 0.32],
    [0.67, 0.48, 0.27, 0.38],
    [0.37, 0.72, 0.27, 0.16],
  ];
  for (const [cx, cy, cw, ch] of tiles) {
    if (inRoundRect(x, y, cx * w, cy * h, (cx + cw) * w, (cy + ch) * h, 12)) {
      return y % 40 < 8 ? accent : card;
    }
  }
  return null;
}

function panels(x, y, w, h, accent) {
  const top = bar(x, y, w, accent);
  if (top) return top;
  const blocks = [
    [0.06, 0.16, 0.28, 0.7],
    [0.37, 0.16, 0.28, 0.7],
    [0.68, 0.16, 0.26, 0.7],
  ];
  for (const [cx, cy, cw, ch] of blocks) {
    if (inRoundRect(x, y, cx * w, cy * h, (cx + cw) * w, (cy + ch) * h, 18)) {
      if (y < cy * h + 12) return accent;
      return card;
    }
  }
  return null;
}

function portrait(x, y, w, h) {
  const base = mix([14, 62, 64], [16, 19, 21], y / h);
  const body = inRoundRect(x, y, w * 0.28, h * 0.46, w * 0.72, h * 0.92, 90);
  if (body) return y < h * 0.54 ? [184, 236, 232] : [11, 110, 112];
  const cx = w * 0.5;
  const headY = h * 0.34;
  const headR = w * 0.17;
  const dx = x - cx;
  const dy = y - headY;
  if (dx * dx + dy * dy < headR * headR) return [244, 228, 214];
  return base;
}

function writePdf(file) {
  const lines = [
    { text: "Daniel Bassaw", size: 28, gap: 40 },
    { text: "Frontend Developer", size: 16, gap: 28 },
    { text: "Tema, Greater Accra, Ghana", size: 14, gap: 36 },
    { text: "This is a placeholder CV.", size: 12, gap: 22 },
    { text: "Replace public/cv.pdf with your own file.", size: 12, gap: 0 },
  ];
  let content = "BT\n72 700 Td\n";
  lines.forEach((line, index) => {
    if (index > 0) content += `0 -${line.gap === 0 ? 22 : lines[index - 1].gap} Td\n`;
    content += `/F1 ${line.size} Tf\n(${line.text}) Tj\n`;
  });
  content += "ET";

  const objects = [
    "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n",
    "2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n",
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n",
    `4 0 obj<</Length ${Buffer.byteLength(content)}>>stream\n${content}endstream\nendobj\n`,
    "5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n",
  ];

  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(body));
    body += object;
  }
  const xrefStart = Buffer.byteLength(body);
  let xref = `xref\n0 ${objects.length + 1}\n`;
  xref += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  const trailer = `trailer<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF\n`;
  writeFileSync(file, body + xref + trailer);
}

const root = new URL("..", import.meta.url).pathname;
const accents = {
  harbor: [129, 140, 248],
  market: [52, 211, 153],
  transit: [251, 191, 36],
  notes: [125, 211, 252],
  aperture: [244, 114, 182],
  clinic: [167, 139, 250],
};

const shots = [
  ["public/projects/harbor.png", accents.harbor, harbor],
  ["public/projects/kente-market.png", accents.market, storefront],
  ["public/projects/tema-transit.png", accents.transit, rows],
  ["public/projects/noteleaf.png", accents.notes, editor],
  ["public/projects/aperture.png", accents.aperture, gallery],
  ["public/projects/clinic-queue.png", accents.clinic, panels],
];

for (const [file, accent, draw] of shots) {
  writePng(`${root}${file}`, 1280, 800, screen(accent, draw));
  console.log(file);
}

writePng(`${root}public/portrait.png`, 800, 1000, portrait);
console.log("public/portrait.png");
writePdf(`${root}public/cv.pdf`);
console.log("public/cv.pdf");
