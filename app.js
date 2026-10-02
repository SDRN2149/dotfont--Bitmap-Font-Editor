const LATIN_UPPER = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const LATIN_LOWER = Array.from("abcdefghijklmnopqrstuvwxyz");
const DIGITS = Array.from("0123456789");
const PRINTABLE_ASCII = Array.from({length: 95}, (_, i) => String.fromCodePoint(0x20 + i));
const ASCII_SYMBOLS = PRINTABLE_ASCII.filter(ch => !/[A-Za-z0-9]/.test(ch) && ch !== " ");
const LATIN1_SUPPLEMENT = Array.from({length: 0xFF - 0xA1 + 1}, (_, i) => String.fromCodePoint(0xA1 + i))
  .filter(ch => ch.codePointAt(0) !== 0xAD);
const LATIN_EXTENDED_A = Array.from({length: 0x017F - 0x0100 + 1}, (_, i) => String.fromCodePoint(0x0100 + i));
const LATIN_EXTENDED_B = Array.from({length: 0x024F - 0x0180 + 1}, (_, i) => String.fromCodePoint(0x0180 + i));
const DEFAULT_GLYPHS = [" ", ...LATIN_UPPER, ...LATIN_LOWER, ...DIGITS, ...ASCII_SYMBOLS];

const state = {
  gridSize: 12,
  currentGlyph: "A",
  glyphs: {},
  advances: {},
  spacings: {},
  mouseDown: false,
  drawValue: 1,
  showGrid: true,
  showGuides: true,
  guides: {
    top: 2,
    bottom: 10,
    left: 2,
    right: 10
  },
  ligatures: {},
  enableLigatures: true,
  fontMeta: {
    familyName: "DotFont",
    styleName: "Regular",
    unitsPerEm: 1000,
    fileName: "DotFont-Regular"
  },
  glyphLabels: {},
  clipboard: null
};

const canvas = document.getElementById("glyphCanvas");
const ctx = canvas.getContext("2d");
const previewCanvas = document.getElementById("previewCanvas");
const pctx = previewCanvas.getContext("2d");
canvas.style.touchAction = "none";

const glyphList = document.getElementById("glyphList");
const currentGlyphLabel = document.getElementById("currentGlyphLabel");
const gridSizeSelect = document.getElementById("gridSize");
const letterSpacingInput = document.getElementById("letterSpacing");
const glyphInkWidthReadout = document.getElementById("glyphInkWidth");
const glyphAdvanceReadout = document.getElementById("glyphAdvanceReadout");
const liveInkWidth = document.getElementById("liveInkWidth");
const liveSpacing = document.getElementById("liveSpacing");
const liveAdvance = document.getElementById("liveAdvance");
const previewInput = document.getElementById("previewInput");
const showGridCheckbox = document.getElementById("showGrid");
const showGuidesCheckbox = document.getElementById("showGuides");
const guideTopInput = document.getElementById("guideTop");
const guideBottomInput = document.getElementById("guideBottom");
const guideLeftInput = document.getElementById("guideLeft");
const guideRightInput = document.getElementById("guideRight");
const enableLigaturesCheckbox = document.getElementById("enableLigatures");
const ligatureSequenceInput = document.getElementById("ligatureSequence");
const ligatureGlyphInput = document.getElementById("ligatureGlyph");
const ligatureList = document.getElementById("ligatureList");
const fontFamilyNameInput = document.getElementById("fontFamilyName");
const fontStyleNameInput = document.getElementById("fontStyleName");
const unitsPerEmSelect = document.getElementById("unitsPerEm");
const fontFileNameInput = document.getElementById("fontFileName");
const exportStatus = document.getElementById("exportStatus");
const currentCodepoint = document.getElementById("currentCodepoint");
const currentUnicodeName = document.getElementById("currentUnicodeName");
const unicodeInput = document.getElementById("unicodeInput");
const rangeStartInput = document.getElementById("rangeStart");
const rangeEndInput = document.getElementById("rangeEnd");
const unicodeFeedback = document.getElementById("unicodeFeedback");
const glyphSearchInput = document.getElementById("glyphSearch");
const deleteGlyphBtn = document.getElementById("deleteGlyphBtn");
const copyGlyphBtn = document.getElementById("copyGlyphBtn");
const pasteGlyphBtn = document.getElementById("pasteGlyphBtn");
const projectFileStatus = document.getElementById("projectFileStatus");
const addLatin1Btn = document.getElementById("addLatin1Btn");
const addLatinExtABtn = document.getElementById("addLatinExtABtn");
const addLatinExtBBtn = document.getElementById("addLatinExtBBtn");
const glyphSetFeedback = document.getElementById("glyphSetFeedback");

function emptyGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function resizeGrid(oldGrid, newSize) {
  const next = emptyGrid(newSize);
  const oldSize = oldGrid.length;

  // Find the actual ink bounds, not the old grid bounds.
  let minX = oldSize;
  let minY = oldSize;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < oldSize; y++) {
    for (let x = 0; x < oldSize; x++) {
      if (!oldGrid[y]?.[x]) continue;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  // Blank glyph: just return an empty resized grid.
  if (maxX < 0 || maxY < 0) {
    return next;
  }

  const inkWidth = maxX - minX + 1;
  const inkHeight = maxY - minY + 1;

  // Center the actual glyph shape inside the new grid.
  const targetLeft = Math.floor((newSize - inkWidth) / 2);
  const targetTop = Math.floor((newSize - inkHeight) / 2);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!oldGrid[y]?.[x]) continue;

      const nx = targetLeft + (x - minX);
      const ny = targetTop + (y - minY);

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < newSize &&
        ny < newSize
      ) {
        next[ny][nx] = oldGrid[y][x];
      }
    }
  }

  return next;
}

function ensureGlyph(char) {
  if (!state.glyphs[char]) {
    state.glyphs[char] = emptyGrid(state.gridSize);
  }
  if (!state.advances[char]) {
    state.advances[char] = state.gridSize;
  }
  if (!state.spacings || typeof state.spacings[char] !== "number") {
    if (!state.spacings) state.spacings = {};
    state.spacings[char] = 1;
  }
}

function init() {
  const saved = localStorage.getItem("dotfont-unicode-project");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      Object.assign(state, data);
    } catch {}
  }

  if (!state.guides) {
    state.guides = {
      top: Math.max(0, Math.floor(state.gridSize * 0.17)),
      bottom: Math.min(state.gridSize, Math.ceil(state.gridSize * 0.83)),
      left: Math.max(0, Math.floor(state.gridSize * 0.17)),
      right: Math.min(state.gridSize, Math.ceil(state.gridSize * 0.83))
    };
  }
  if (typeof state.showGuides !== "boolean") state.showGuides = true;
  if (!state.ligatures) state.ligatures = {};
  if (typeof state.enableLigatures !== "boolean") state.enableLigatures = true;
  if (!state.fontMeta) {
    state.fontMeta = {
      familyName: "DotFont",
      styleName: "Regular",
      unitsPerEm: 1000,
      fileName: "DotFont-Regular"
    };
  }
  if (!state.glyphLabels) state.glyphLabels = {};
  if (!state.spacings) state.spacings = {};

  DEFAULT_GLYPHS.forEach(ensureGlyph);
  ensureGlyph(state.currentGlyph);
  gridSizeSelect.value = String(state.gridSize);
  showGridCheckbox.checked = state.showGrid;
  showGuidesCheckbox.checked = state.showGuides;
  enableLigaturesCheckbox.checked = state.enableLigatures;
  fontFamilyNameInput.value = state.fontMeta.familyName || "DotFont";
  fontStyleNameInput.value = state.fontMeta.styleName || "Regular";
  unitsPerEmSelect.value = String(state.fontMeta.unitsPerEm || 1000);
  fontFileNameInput.value = state.fontMeta.fileName || "DotFont-Regular";
  syncGuideInputs();
  renderAll();
}

function save() {
  localStorage.setItem("dotfont-unicode-project", JSON.stringify({
    gridSize: state.gridSize,
    currentGlyph: state.currentGlyph,
    glyphs: state.glyphs,
    advances: state.advances,
    spacings: state.spacings,
    showGrid: state.showGrid,
    showGuides: state.showGuides,
    guides: state.guides,
    ligatures: state.ligatures,
    enableLigatures: state.enableLigatures,
    fontMeta: state.fontMeta,
    glyphLabels: state.glyphLabels
  }));
}

function renderAll() {
  renderGlyphList();
  currentGlyphLabel.textContent = displayChar(state.currentGlyph);
  currentCodepoint.textContent = codepointLabel(state.currentGlyph);
  currentUnicodeName.textContent = unicodeFriendlyName(state.currentGlyph);
  pasteGlyphBtn.disabled = !state.clipboard;
  letterSpacingInput.value = Math.max(1, Number(state.spacings[state.currentGlyph] ?? 1));
  updateMetricReadout();
  drawEditor();
  renderLigatureList();
  drawPreview();
  save();
}

function codepointLabel(ch) {
  if (!ch) return "";
  return `U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;
}

function displayChar(ch) {
  if (ch === " ") return "␠";
  if (ch === "\n") return "↵";
  return ch || "?";
}

function unicodeFriendlyName(ch) {
  const cp = ch?.codePointAt(0);
  if (cp == null) return "";
  if (ch === " ") return "SPACE";
  if (cp >= 0x41 && cp <= 0x5A) return `LATIN CAPITAL LETTER ${ch}`;
  if (cp >= 0x61 && cp <= 0x7A) return `LATIN SMALL LETTER ${ch.toUpperCase()}`;
  if (cp >= 0x30 && cp <= 0x39) return `DIGIT ${ch}`;
  if (cp >= 0xE000 && cp <= 0xF8FF) return "PRIVATE USE AREA";
  if (cp >= 0xF0000 && cp <= 0xFFFFD) return "SUPPLEMENTARY PRIVATE USE AREA-A";
  if (cp >= 0x100000 && cp <= 0x10FFFD) return "SUPPLEMENTARY PRIVATE USE AREA-B";
  return "UNICODE GLYPH";
}

function parseCodepointInput(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const m = raw.match(/^(?:U\+|0x)([0-9A-Fa-f]{1,6})$/i);
  if (m) {
    const cp = parseInt(m[1], 16);
    if (cp >= 0 && cp <= 0x10FFFF && !(cp >= 0xD800 && cp <= 0xDFFF)) return cp;
    return null;
  }
  return Array.from(raw)[0]?.codePointAt(0) ?? null;
}

function charFromInput(value) {
  const cp = parseCodepointInput(value);
  if (cp == null) return null;
  try { return String.fromCodePoint(cp); } catch { return null; }
}

function setUnicodeFeedback(message, error=false) {
  unicodeFeedback.textContent = message;
  unicodeFeedback.style.color = error ? "#a33a32" : "var(--muted)";
}


function glyphSortCategory(char) {
  const cp = char.codePointAt(0);

  if (cp >= 0x41 && cp <= 0x5A) return 0;      // A-Z
  if (cp >= 0x61 && cp <= 0x7A) return 1;      // a-z
  if (cp >= 0x30 && cp <= 0x39) return 2;      // digits
  if (cp === 0x20) return 3;                   // space
  if (cp >= 0x21 && cp <= 0x7E) return 4;      // basic punctuation/symbols
  if (cp >= 0xA1 && cp <= 0xFF) return 5;      // Latin-1 supplement
  if (cp >= 0x0100 && cp <= 0x017F) return 6;  // Latin Extended-A
  if (cp >= 0x0180 && cp <= 0x024F) return 7;  // Latin Extended-B
  if (cp >= 0xE000 && cp <= 0xF8FF) return 9;  // PUA
  return 8;
}

function renderGlyphList() {
  glyphList.innerHTML = "";
  const q = (glyphSearchInput?.value || "").trim().toUpperCase();
  const chars = Object.keys(state.glyphs).sort((a, b) => glyphSortCategory(a) - glyphSortCategory(b) || a.codePointAt(0) - b.codePointAt(0));
  for (const char of chars) {
    const cp = codepointLabel(char);
    if (q && !char.toUpperCase().includes(q) && !cp.includes(q) && !unicodeFriendlyName(char).includes(q)) continue;
    const btn = document.createElement("button");
    btn.className = "glyph-btn" + (char === state.currentGlyph ? " active" : "");
    btn.title = `${cp} · ${unicodeFriendlyName(char)}`;
    const glyph = document.createElement("span");
    glyph.className = "key-char";
    glyph.textContent = displayChar(char);
    const cpSpan = document.createElement("span");
    cpSpan.className = "cp-label";
    cpSpan.textContent = cp;
    btn.append(glyph, cpSpan);
    btn.addEventListener("click", ()=>{ state.currentGlyph=char; renderAll(); });
    glyphList.appendChild(btn);
  }
}

function addUnicodeGlyph(value) {
  const ch = charFromInput(value);
  if (!ch) { setUnicodeFeedback("올바른 문자 또는 U+코드를 입력해줘.", true); return false; }
  ensureGlyph(ch);
  state.currentGlyph = ch;
  setUnicodeFeedback(`${codepointLabel(ch)} ${displayChar(ch)} 추가됨`);
  renderAll();
  return true;
}

function addUnicodeRange(startValue, endValue) {
  const start = parseCodepointInput(startValue);
  const end = parseCodepointInput(endValue);
  if (start == null || end == null || end < start) { setUnicodeFeedback("Unicode 범위를 확인해줘.", true); return; }
  if (end - start > 511) { setUnicodeFeedback("한 번에 최대 512개 글리프까지만 추가할 수 있어.", true); return; }
  let count=0;
  for (let cp=start; cp<=end; cp++) {
    if (cp >= 0xD800 && cp <= 0xDFFF) continue;
    ensureGlyph(String.fromCodePoint(cp)); count++;
  }
  state.currentGlyph = String.fromCodePoint(start);
  setUnicodeFeedback(`${codepointLabel(String.fromCodePoint(start))}–${codepointLabel(String.fromCodePoint(end))} · ${count}개 추가`);
  renderAll();
}


function setGlyphSetFeedback(message) {
  if (glyphSetFeedback) glyphSetFeedback.textContent = message;
}

function addGlyphSet(chars, label = "글리프 세트") {
  const validChars = [...new Set(chars)].filter(Boolean);
  if (!validChars.length) return;

  let added = 0;
  let firstAdded = null;

  for (const ch of validChars) {
    const existed = Boolean(state.glyphs[ch]);
    ensureGlyph(ch);

    if (!existed) {
      added++;
      if (!firstAdded) firstAdded = ch;
    }
  }

  glyphSearchInput.value = "";
  state.currentGlyph = firstAdded || validChars[0];

  const total = validChars.length;
  setGlyphSetFeedback(
    added > 0
      ? `${label}: ${added}개 새 글리프 추가 · ${displayChar(state.currentGlyph)} 선택됨`
      : `${label}: 이미 ${total}개 글리프가 모두 추가되어 있어 · ${displayChar(state.currentGlyph)} 선택됨`
  );

  renderAll();

  // Make the newly selected glyph visible in the library.
  requestAnimationFrame(() => {
    const active = glyphList.querySelector(".glyph-btn.active");
    active?.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
}

function addGlyphRangeSet(start, end, label) {
  const chars = [];
  for (let cp = start; cp <= end; cp++) {
    if (cp >= 0xD800 && cp <= 0xDFFF) continue;
    chars.push(String.fromCodePoint(cp));
  }
  addGlyphSet(chars, label);
}

function sortedLigatureEntries() {
  return Object.entries(state.ligatures)
    .filter(([seq, target]) => seq && target)
    .sort((a, b) => Array.from(b[0]).length - Array.from(a[0]).length);
}

function applyLigaturesToString(text) {
  if (!state.enableLigatures) return Array.from(text);

  const chars = Array.from(text);
  const entries = sortedLigatureEntries();
  const out = [];
  let i = 0;

  while (i < chars.length) {
    let matched = false;

    for (const [sequence, target] of entries) {
      const seqChars = Array.from(sequence);
      if (!seqChars.length) continue;

      let ok = true;
      for (let j = 0; j < seqChars.length; j++) {
        if (chars[i + j] !== seqChars[j]) {
          ok = false;
          break;
        }
      }

      if (ok) {
        out.push(target);
        i += seqChars.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      out.push(chars[i]);
      i += 1;
    }
  }

  return out;
}

function renderLigatureList() {
  if (!ligatureList) return;
  ligatureList.innerHTML = "";

  const entries = sortedLigatureEntries();

  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "hint";
    empty.textContent = "아직 합자 규칙이 없어. 예: fi → ﬁ, -> → →";
    ligatureList.appendChild(empty);
    return;
  }

  entries.forEach(([sequence, target]) => {
    const row = document.createElement("div");
    row.className = "ligature-item";

    const seq = document.createElement("span");
    seq.className = "ligature-seq";
    seq.textContent = sequence;

    const arrow = document.createElement("span");
    arrow.className = "ligature-arrow";
    arrow.textContent = "→";

    const tgt = document.createElement("span");
    tgt.className = "ligature-target";
    tgt.textContent = target;

    const del = document.createElement("button");
    del.className = "ligature-delete";
    del.type = "button";
    del.textContent = "삭제";
    del.addEventListener("click", () => {
      delete state.ligatures[sequence];
      renderAll();
    });

    row.append(seq, arrow, tgt, del);
    ligatureList.appendChild(row);
  });
}

function addLigatureRule() {
  const sequence = ligatureSequenceInput.value;
  const target = charFromInput(ligatureGlyphInput.value);

  if (!sequence.trim() || !target) return;

  ensureGlyph(target);
  state.ligatures[sequence] = target;

  ligatureSequenceInput.value = "";
  ligatureGlyphInput.value = "";
  state.currentGlyph = target;
  renderAll();
}


function getGlyphBounds(char) {
  const grid = state.glyphs[char];
  if (!grid) return null;

  let minX = state.gridSize;
  let maxX = -1;
  let minY = state.gridSize;
  let maxY = -1;

  for (let y = 0; y < state.gridSize; y++) {
    for (let x = 0; x < state.gridSize; x++) {
      if (!grid[y]?.[x]) continue;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < 0) return null;

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}

function getGlyphInkWidth(char) {
  const bounds = getGlyphBounds(char);
  if (!bounds) {
    // Space and blank glyphs still need a visible advance.
    return char === " " ? Math.max(1, Math.round(state.gridSize * 0.5)) : 0;
  }
  return bounds.width;
}

function getGlyphSpacing(char) {
  return Math.max(1, Number(state.spacings?.[char] ?? 1));
}

function getGlyphAdvanceCells(char) {
  const inkWidth = getGlyphInkWidth(char);
  const spacing = getGlyphSpacing(char);
  return Math.max(1, inkWidth + spacing);
}

function getGlyphLeftOffset(char) {
  const bounds = getGlyphBounds(char);
  return bounds ? bounds.minX : 0;
}

function updateMetricReadout() {
  const ch = state.currentGlyph;
  const inkWidth = getGlyphInkWidth(ch);
  const spacing = getGlyphSpacing(ch);
  const advance = getGlyphAdvanceCells(ch);

  glyphInkWidthReadout.textContent = `${inkWidth}칸`;
  glyphAdvanceReadout.textContent = `${advance}칸`;

  liveInkWidth.textContent = `${inkWidth}칸`;
  liveSpacing.textContent = `${spacing}칸`;
  liveAdvance.textContent = `${advance}칸`;
}

function drawPreview() {
  const text = previewInput.value || "";
  pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  pctx.fillStyle = "#ffffff";
  pctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

  const scale = 8;
  const top = 36;
  let cursorX = 24;

  pctx.fillStyle = "#1e1e1b";

  const previewGlyphs = applyLigaturesToString(text);

  for (const ch of previewGlyphs) {
    const grid = state.glyphs[ch];
    const advance = getGlyphAdvanceCells(ch);
    const leftOffset = getGlyphLeftOffset(ch);

    if (!grid) {
      cursorX += advance * scale;
      continue;
    }

    for (let y = 0; y < state.gridSize; y++) {
      for (let x = 0; x < state.gridSize; x++) {
        if (grid[y][x]) {
          pctx.fillRect(cursorX + (x - leftOffset) * scale, top + y * scale, scale, scale);
        }
      }
    }
    cursorX += advance * scale;
  }
}



function drawEditor() {
  const size = state.gridSize;
  const cell = canvas.width / size;
  const grid = state.glyphs[state.currentGlyph] || emptyGrid(size);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1e1e1b";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y]?.[x]) {
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }

  if (state.showGrid) {
    ctx.strokeStyle = "#ddd7cc";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);

    for (let i = 0; i <= size; i++) {
      const p = Math.round(i * cell) + 0.5;

      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(canvas.width, p);
      ctx.stroke();
    }
  }

  if (state.showGuides) {
    const { top, bottom, left, right } = state.guides;

    ctx.save();
    ctx.lineWidth = 3;

    ctx.strokeStyle = "rgba(50, 105, 200, 0.9)";
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(0, top * cell);
    ctx.lineTo(canvas.width, top * cell);
    ctx.stroke();

    ctx.strokeStyle = "rgba(200, 70, 60, 0.95)";
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(0, bottom * cell);
    ctx.lineTo(canvas.width, bottom * cell);
    ctx.stroke();

    ctx.strokeStyle = "rgba(40, 150, 95, 0.9)";
    ctx.setLineDash([10, 8]);

    ctx.beginPath();
    ctx.moveTo(left * cell, 0);
    ctx.lineTo(left * cell, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(right * cell, 0);
    ctx.lineTo(right * cell, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "rgba(40, 150, 95, 0.05)";
    ctx.fillRect(
      left * cell,
      top * cell,
      Math.max(0, right - left) * cell,
      Math.max(0, bottom - top) * cell
    );

    ctx.restore();
  }
}

function pointerCell(e) {
  const rect = canvas.getBoundingClientRect();

  const x = Math.floor(
    ((e.clientX - rect.left) / rect.width) * state.gridSize
  );
  const y = Math.floor(
    ((e.clientY - rect.top) / rect.height) * state.gridSize
  );

  return { x, y };
}

function paintAt(e) {
  const { x, y } = pointerCell(e);

  if (
    x < 0 ||
    y < 0 ||
    x >= state.gridSize ||
    y >= state.gridSize
  ) return;

  ensureGlyph(state.currentGlyph);
  state.glyphs[state.currentGlyph][y][x] = state.drawValue;

  updateMetricReadout();
  drawEditor();
  drawPreview();
  save();
}

canvas.addEventListener("mousedown", e => {
  if (e.button !== 0) return;

  state.mouseDown = true;

  const { x, y } = pointerCell(e);
  const current =
    state.glyphs[state.currentGlyph]?.[y]?.[x] || 0;

  state.drawValue = current ? 0 : 1;
  paintAt(e);
});

canvas.addEventListener("mousemove", e => {
  if (!state.mouseDown) return;
  paintAt(e);
});

window.addEventListener("mouseup", () => {
  state.mouseDown = false;
});

canvas.addEventListener("mouseleave", () => {
  state.mouseDown = false;
});

canvas.addEventListener(
  "touchstart",
  e => {
    e.preventDefault();

    const touch = e.touches[0];
    if (!touch) return;

    const fakeEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY
    };

    state.mouseDown = true;

    const { x, y } = pointerCell(fakeEvent);
    const current =
      state.glyphs[state.currentGlyph]?.[y]?.[x] || 0;

    state.drawValue = current ? 0 : 1;
    paintAt(fakeEvent);
  },
  { passive: false }
);

canvas.addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
    if (!state.mouseDown) return;

    const touch = e.touches[0];
    if (!touch) return;

    paintAt({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  },
  { passive: false }
);

canvas.addEventListener(
  "touchend",
  e => {
    e.preventDefault();
    state.mouseDown = false;
  },
  { passive: false }
);

function clampGuideValues() {
  const max = state.gridSize;

  state.guides.top = Math.max(0, Math.min(max - 1, Number(state.guides.top) || 0));
  state.guides.bottom = Math.max(1, Math.min(max, Number(state.guides.bottom) || max));
  state.guides.left = Math.max(0, Math.min(max - 1, Number(state.guides.left) || 0));
  state.guides.right = Math.max(1, Math.min(max, Number(state.guides.right) || max));

  if (state.guides.bottom <= state.guides.top) {
    state.guides.bottom = Math.min(max, state.guides.top + 1);
  }

  if (state.guides.right <= state.guides.left) {
    state.guides.right = Math.min(max, state.guides.left + 1);
  }
}

function syncGuideInputs() {
  clampGuideValues();

  guideTopInput.max = String(Math.max(0, state.gridSize - 1));
  guideBottomInput.max = String(state.gridSize);
  guideLeftInput.max = String(Math.max(0, state.gridSize - 1));
  guideRightInput.max = String(state.gridSize);

  guideTopInput.value = state.guides.top;
  guideBottomInput.value = state.guides.bottom;
  guideLeftInput.value = state.guides.left;
  guideRightInput.value = state.guides.right;
}

function setGuide(key, value) {
  state.guides[key] = Number(value);
  clampGuideValues();
  syncGuideInputs();
  drawEditor();
  save();
}

showGuidesCheckbox.addEventListener("change", e => {
  state.showGuides = e.target.checked;
  drawEditor();
  save();
});

guideTopInput.addEventListener("input", e => setGuide("top", e.target.value));
guideBottomInput.addEventListener("input", e => setGuide("bottom", e.target.value));
guideLeftInput.addEventListener("input", e => setGuide("left", e.target.value));
guideRightInput.addEventListener("input", e => setGuide("right", e.target.value));

document.getElementById("resetGuidesBtn").addEventListener("click", () => {
  const size = state.gridSize;

  state.guides = {
    top: Math.max(0, Math.floor(size * 0.17)),
    bottom: Math.min(size, Math.ceil(size * 0.83)),
    left: Math.max(0, Math.floor(size * 0.17)),
    right: Math.min(size, Math.ceil(size * 0.83))
  };

  syncGuideInputs();
  drawEditor();
  save();
});


function cloneGrid(grid) {
  return grid.map(row => [...row]);
}

function copyCurrentGlyph() {
  ensureGlyph(state.currentGlyph);

  state.clipboard = {
    gridSize: state.gridSize,
    grid: cloneGrid(state.glyphs[state.currentGlyph]),
    spacing: getGlyphSpacing(state.currentGlyph)
  };

  pasteGlyphBtn.disabled = false;

  copyGlyphBtn.classList.remove("copy-flash");
  void copyGlyphBtn.offsetWidth;
  copyGlyphBtn.classList.add("copy-flash");
}

function fitGridToCurrentSize(sourceGrid, sourceSize) {
  if (sourceSize === state.gridSize) {
    return cloneGrid(sourceGrid);
  }

  const next = emptyGrid(state.gridSize);
  const min = Math.min(sourceSize, state.gridSize);

  for (let y = 0; y < min; y++) {
    for (let x = 0; x < min; x++) {
      next[y][x] = sourceGrid[y]?.[x] ? 1 : 0;
    }
  }

  return next;
}

function pasteToCurrentGlyph() {
  if (!state.clipboard) return;

  ensureGlyph(state.currentGlyph);

  state.glyphs[state.currentGlyph] = fitGridToCurrentSize(
    state.clipboard.grid,
    state.clipboard.gridSize
  );

  state.spacings[state.currentGlyph] = Math.max(
    1,
    Number(state.clipboard.spacing || 1)
  );

  letterSpacingInput.value = state.spacings[state.currentGlyph];
  updateMetricReadout();
  renderAll();
}

copyGlyphBtn.addEventListener("click", copyCurrentGlyph);
pasteGlyphBtn.addEventListener("click", pasteToCurrentGlyph);

window.addEventListener("keydown", e => {
  const target = e.target;
  const isTextField =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement;

  if (isTextField) return;

  const modifier = e.metaKey || e.ctrlKey;

  if (modifier && e.key.toLowerCase() === "c") {
    e.preventDefault();
    copyCurrentGlyph();
  }

  if (modifier && e.key.toLowerCase() === "v") {
    e.preventDefault();
    pasteToCurrentGlyph();
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
  state.glyphs[state.currentGlyph] = emptyGrid(state.gridSize);
  updateMetricReadout();
  renderAll();
});

document.getElementById("invertBtn").addEventListener("click", () => {
  const grid = state.glyphs[state.currentGlyph];
  state.glyphs[state.currentGlyph] = grid.map(row => row.map(v => v ? 0 : 1));
  updateMetricReadout();
  renderAll();
});

document.getElementById("shiftLeftBtn").addEventListener("click", () => shift(-1, 0));
document.getElementById("shiftRightBtn").addEventListener("click", () => shift(1, 0));
document.getElementById("shiftUpBtn").addEventListener("click", () => shift(0, -1));
document.getElementById("shiftDownBtn").addEventListener("click", () => shift(0, 1));

gridSizeSelect.addEventListener("change", e => {
  const nextSize = Number(e.target.value);
  for (const ch of Object.keys(state.glyphs)) {
    state.glyphs[ch] = resizeGrid(state.glyphs[ch], nextSize);
    if ((state.advances[ch] ?? state.gridSize) > nextSize) {
      state.advances[ch] = nextSize;
    }
  }
  const oldSize = state.gridSize;

  const guideWidth = Math.max(1, state.guides.right - state.guides.left);
  const guideHeight = Math.max(1, state.guides.bottom - state.guides.top);

  const centeredLeft = Math.floor((nextSize - guideWidth) / 2);
  const centeredTop = Math.floor((nextSize - guideHeight) / 2);

  state.guides = {
    top: centeredTop,
    bottom: centeredTop + guideHeight,
    left: centeredLeft,
    right: centeredLeft + guideWidth
  };

  state.gridSize = nextSize;
  clampGuideValues();
  syncGuideInputs();
  renderAll();
});

letterSpacingInput.addEventListener("input", e => {
  const value = Math.max(1, Math.min(16, Number(e.target.value) || 1));
  state.spacings[state.currentGlyph] = value;
  updateMetricReadout();
  drawPreview();
  save();
});

previewInput.addEventListener("input", drawPreview);

showGridCheckbox.addEventListener("change", e => {
  state.showGrid = e.target.checked;
  drawEditor();
  save();
});



const FONTFLUX_MODULE_URL = "https://esm.sh/font-flux-js?bundle";
let _fontFluxModule = null;

async function loadFontFluxModule() {
  if (_fontFluxModule) return _fontFluxModule;
  _fontFluxModule = await import(FONTFLUX_MODULE_URL);
  return _fontFluxModule;
}

function sanitizeFileName(name) {
  return (name || "DotFont-Regular")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-") || "DotFont-Regular";
}

function updateFontMetaFromUI() {
  state.fontMeta.familyName = fontFamilyNameInput.value.trim() || "DotFont";
  state.fontMeta.styleName = fontStyleNameInput.value.trim() || "Regular";
  state.fontMeta.unitsPerEm = Number(unitsPerEmSelect.value) || 1000;
  state.fontMeta.fileName = sanitizeFileName(fontFileNameInput.value);
  save();
}

function setExportStatus(message, kind = "") {
  exportStatus.textContent = message;
  exportStatus.className = "export-status" + (kind ? " " + kind : "");
}

function downloadArrayBuffer(buffer, filename, mime = "application/octet-stream") {
  const blob = new Blob([buffer], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function safeGlyphName(char) {
  if (char === " ") return "space";
  if (/^[A-Za-z0-9]$/.test(char)) {
    if (/^[A-Z]$/.test(char)) return "uni" + char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
    return char;
  }
  return "uni" + Array.from(char)
    .map(c => c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"))
    .join("_");
}

function getMetricConfig() {
  updateFontMetaFromUI();

  const unitsPerEm = Number(state.fontMeta.unitsPerEm) || 1000;
  const cellUnit = unitsPerEm / state.gridSize;
  const baselineRow = Number(state.guides.bottom);
  const ascender = Math.round(baselineRow * cellUnit);
  const descender = -Math.round((state.gridSize - baselineRow) * cellUnit);

  return { unitsPerEm, cellUnit, baselineRow, ascender, descender };
}

function gridToContours(grid, metrics) {
  const { cellUnit, baselineRow } = metrics;
  const contours = [];

  let leftOffset = state.gridSize;
  for (let y = 0; y < state.gridSize; y++) {
    for (let x = 0; x < state.gridSize; x++) {
      if (grid?.[y]?.[x]) leftOffset = Math.min(leftOffset, x);
    }
  }
  if (leftOffset === state.gridSize) leftOffset = 0;

  for (let y = 0; y < state.gridSize; y++) {
    for (let x = 0; x < state.gridSize; x++) {
      if (!grid?.[y]?.[x]) continue;

      const x0 = Math.round((x - leftOffset) * cellUnit);
      const x1 = Math.round((x - leftOffset + 1) * cellUnit);
      const yTop = Math.round((baselineRow - y) * cellUnit);
      const yBottom = Math.round((baselineRow - (y + 1)) * cellUnit);

      contours.push([
        { x: x0, y: yBottom, onCurve: true },
        { x: x1, y: yBottom, onCurve: true },
        { x: x1, y: yTop, onCurve: true },
        { x: x0, y: yTop, onCurve: true }
      ]);
    }
  }

  return contours;
}

function ensureLigatureTargetsExist() {
  for (const [, target] of Object.entries(state.ligatures)) {
    ensureGlyph(target);
  }
}

async function buildFontFluxFont() {
  const mod = await loadFontFluxModule();
  const FontFlux = mod.FontFlux || mod.default?.FontFlux || mod.default;
  if (!FontFlux?.create) throw new Error("FontFlux.create API not found");

  updateFontMetaFromUI();
  ensureLigatureTargetsExist();

  const m = getMetricConfig();

  const font = FontFlux.create({
    family: state.fontMeta.familyName,
    style: state.fontMeta.styleName,
    unitsPerEm: m.unitsPerEm,
    ascender: m.ascender,
    descender: m.descender
  });

  // Character-mapped glyphs.
  for (const [ch, grid] of Object.entries(state.glyphs)) {
    const cpChar = Array.from(ch)[0];
    if (!cpChar) continue;

    const advanceCells = getGlyphAdvanceCells(ch);
    const advanceWidth = Math.max(1, Math.round(advanceCells * m.cellUnit));

    font.addGlyph({
      name: safeGlyphName(cpChar),
      unicode: cpChar.codePointAt(0),
      advanceWidth,
      contours: gridToContours(grid, m)
    });
  }

  // Actual GSUB Lookup Type 4 ligatures.
  // Long sequences first, which is the expected order for overlapping rules.
  const ligatures = sortedLigatureEntries();

  for (const [sequence, target] of ligatures) {
    const components = Array.from(sequence);
    if (components.length < 2) continue;

    // A ligature can only reference glyphs that exist in the font.
    if (!components.every(ch => state.glyphs[ch])) continue;
    if (!state.glyphs[target]) continue;

    font.addSubstitution({
      type: "ligature",
      feature: "liga",
      substitution: {
        components: components.map(safeGlyphName),
        ligature: safeGlyphName(target)
      }
    });
  }

  return font;
}

async function exportFont(format) {
  try {
    setExportStatus(`${format.toUpperCase()} 생성 중…`, "busy");

    const font = await buildFontFluxFont();
    const report = font.validate?.();

    if (report && report.valid === false) {
      console.warn("FontFlux validation warnings/errors:", report);
    }

    const buffer = font.export({ format });
    const ext = format === "ttf" ? "ttf" : "otf";
    const mime = format === "ttf" ? "font/ttf" : "font/otf";

    downloadArrayBuffer(
      buffer,
      `${sanitizeFileName(state.fontMeta.fileName)}.${ext}`,
      mime
    );

    const ligaCount = sortedLigatureEntries()
      .filter(([seq, target]) =>
        Array.from(seq).length >= 2 &&
        Array.from(seq).every(ch => state.glyphs[ch]) &&
        state.glyphs[target]
      ).length;

    setExportStatus(`${ext.toUpperCase()} 완료 · liga ${ligaCount}개 내장`, "ok");
  } catch (error) {
    console.error(error);
    setExportStatus(`${format.toUpperCase()} 생성 실패`, "error");
    alert(
      `${format.toUpperCase()} 생성에 실패했어.\n` +
      `처음 내보낼 때는 FontFlux JS를 불러오기 위해 인터넷 연결이 필요해.\n\n` +
      (error?.message || error)
    );
  }
}

fontFamilyNameInput.addEventListener("input", updateFontMetaFromUI);
fontStyleNameInput.addEventListener("input", updateFontMetaFromUI);
unitsPerEmSelect.addEventListener("change", updateFontMetaFromUI);
fontFileNameInput.addEventListener("input", updateFontMetaFromUI);

document.getElementById("exportOTFBtn").addEventListener("click", () => exportFont("otf"));
document.getElementById("exportTTFBtn").addEventListener("click", () => exportFont("ttf"));

document.getElementById("addAsciiBtn").addEventListener("click", () =>
  addGlyphSet(PRINTABLE_ASCII, "ASCII 전체")
);

document.getElementById("addLatinBtn").addEventListener("click", () =>
  addGlyphSet([...LATIN_UPPER, ...LATIN_LOWER], "기본 라틴")
);

document.getElementById("addNumbersBtn").addEventListener("click", () =>
  addGlyphSet(DIGITS, "숫자 0–9")
);

document.getElementById("addSymbolsBtn").addEventListener("click", () =>
  addGlyphSet([" ", ...ASCII_SYMBOLS], "기호·문장부호")
);

document.getElementById("addPuaBtn").addEventListener("click", () =>
  addGlyphRangeSet(0xE000, 0xE00F, "PUA 16자")
);

addLatin1Btn.addEventListener("click", () =>
  addGlyphRangeSet(0x00A1, 0x00FF, "Latin-1 Supplement")
);

addLatinExtABtn.addEventListener("click", () =>
  addGlyphRangeSet(0x0100, 0x017F, "Latin Extended-A")
);

addLatinExtBBtn.addEventListener("click", () =>
  addGlyphRangeSet(0x0180, 0x024F, "Latin Extended-B")
);
document.getElementById("clearProjectGlyphsBtn").addEventListener("click", () => {
  if (!confirm("모든 글리프를 비울까? 프로젝트 설정과 ligature는 유지돼.")) return;
  state.glyphs = {}; state.spacings = {}; state.advances = {};
  ensureGlyph("A"); state.currentGlyph = "A"; renderAll();
});
document.getElementById("addUnicodeBtn").addEventListener("click", () => { if(addUnicodeGlyph(unicodeInput.value)) unicodeInput.value=""; });
unicodeInput.addEventListener("keydown", e => { if(e.key==="Enter") { e.preventDefault(); if(addUnicodeGlyph(unicodeInput.value)) unicodeInput.value=""; } });
document.getElementById("addRangeBtn").addEventListener("click", () => addUnicodeRange(rangeStartInput.value, rangeEndInput.value));
glyphSearchInput.addEventListener("input", renderGlyphList);
deleteGlyphBtn.addEventListener("click", () => {
  const keys = Object.keys(state.glyphs);
  if (keys.length <= 1) return;

  const doomed = state.currentGlyph;
  const cp = doomed.codePointAt(0);
  const code = `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
  const label = doomed === " " ? "Space" : doomed;

  const ok = window.confirm(
    `${code} ${label} 글리프를 프로젝트에서 제거할까요?\n\n` +
    `이 작업은 글리프 슬롯 자체를 삭제해. 픽셀만 비우려면 '내용 지우기'를 사용해.`
  );

  if (!ok) return;

  const i = keys.indexOf(doomed);

  delete state.glyphs[doomed];
  delete state.spacings[doomed];
  delete state.advances[doomed];
  delete state.glyphLabels?.[doomed];

  const remaining = Object.keys(state.glyphs);
  state.currentGlyph =
    remaining[Math.max(0, Math.min(i - 1, remaining.length - 1))] ||
    remaining[0];

  renderAll();
});

enableLigaturesCheckbox.addEventListener("change", e => {
  state.enableLigatures = e.target.checked;
  drawPreview();
  save();
});

document.getElementById("addLigatureBtn").addEventListener("click", addLigatureRule);

ligatureSequenceInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addLigatureRule();
});

ligatureGlyphInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addLigatureRule();
});


function buildProjectPayload() {
  return {
    format: "dotfont-project",
    formatVersion: 1,
    appVersion: "10.5",
    name: state.fontMeta?.familyName || "DotFont Project",
    gridSize: state.gridSize,
    currentGlyph: state.currentGlyph,
    glyphs: state.glyphs,
    advances: state.advances,
    spacings: state.spacings,
    showGrid: state.showGrid,
    showGuides: state.showGuides,
    guides: state.guides,
    ligatures: state.ligatures,
    enableLigatures: state.enableLigatures,
    fontMeta: state.fontMeta,
    glyphLabels: state.glyphLabels
  };
}

function projectFileName() {
  const base =
    state.fontMeta?.familyName ||
    state.fontMeta?.fileName ||
    "DotFont-Project";

  return `${sanitizeFileName(base)}.dotfont`;
}

function setProjectFileStatus(message, error = false) {
  if (!projectFileStatus) return;
  projectFileStatus.textContent = message;
  projectFileStatus.style.color = error ? "#a33a32" : "var(--muted)";
}

document.getElementById("exportBtn").addEventListener("click", () => {
  try {
    const payload = buildProjectPayload();
    const blob = new Blob(
      [JSON.stringify(payload, null, 2)],
      { type: "application/vnd.dotfont+json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = projectFileName();
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setProjectFileStatus(`${a.download} 저장 완료`);
  } catch (error) {
    console.error(error);
    setProjectFileStatus("프로젝트 파일 저장 실패", true);
  }
});

document.getElementById("importInput").addEventListener("change", async e => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data.gridSize || !data.glyphs || typeof data.glyphs !== "object") {
      throw new Error("Invalid DotFont project");
    }

    state.gridSize = Number(data.gridSize) || 12;
    state.glyphs = data.glyphs || {};
    state.advances = data.advances || {};
    state.spacings = data.spacings || {};
    state.showGrid = typeof data.showGrid === "boolean" ? data.showGrid : true;
    state.showGuides = typeof data.showGuides === "boolean" ? data.showGuides : true;
    state.guides = data.guides || state.guides;
    state.ligatures = data.ligatures || {};
    state.enableLigatures =
      typeof data.enableLigatures === "boolean" ? data.enableLigatures : true;
    state.fontMeta = data.fontMeta || state.fontMeta;
    state.glyphLabels = data.glyphLabels || {};

    const glyphKeys = Object.keys(state.glyphs);
    state.currentGlyph =
      data.currentGlyph && state.glyphs[data.currentGlyph]
        ? data.currentGlyph
        : (glyphKeys[0] || "A");

    if (!glyphKeys.length) {
      ensureGlyph("A");
      state.currentGlyph = "A";
    } else {
      glyphKeys.forEach(ensureGlyph);
    }

    gridSizeSelect.value = String(state.gridSize);
    showGridCheckbox.checked = state.showGrid;
    showGuidesCheckbox.checked = state.showGuides;
    enableLigaturesCheckbox.checked = state.enableLigatures;

    fontFamilyNameInput.value = state.fontMeta.familyName || "DotFont";
    fontStyleNameInput.value = state.fontMeta.styleName || "Regular";
    unitsPerEmSelect.value = String(state.fontMeta.unitsPerEm || 1000);
    fontFileNameInput.value = state.fontMeta.fileName || "DotFont-Regular";

    glyphSearchInput.value = "";
    syncGuideInputs();
    renderAll();

    setProjectFileStatus(`${file.name} 불러오기 완료`);
  } catch (error) {
    console.error(error);
    setProjectFileStatus("올바른 DotFont 프로젝트 파일이 아니야.", true);
    alert("올바른 .dotfont 프로젝트 파일이 아니야.");
  }

  e.target.value = "";
});

init();
