let texts = getTextLists();
let raw = getVars("message") || "";

// Normalization function: removes punctuation, spaces, parentheses (and their contents),
// makes comparison case-insensitive, and keeps only the core text.
function normalize(s) {
  return s
    .replace(/（.*?）|\(.*?\)/g, "")  // remove text inside parentheses
    .replace(/[.,\/#!$%\^&\*;:{}=\-`~()。…，？；　\s「」『』【】]/g, "") // strip punctuation/spaces
    .toLowerCase()
    .trim();
}

let query = normalize(raw);
let found = false;

// search through all lyric lines
for (let list of texts) {
  for (let i = 0; i < list.length - 1; i++) {
    let cur = normalize(list[i]);
    if (!cur) continue;

    // flexible matching: exact or substring either direction
    if (cur === query || cur.includes(query) || query.includes(cur)) {
      setVars("reply", list[i + 1]);
      found = true;
      break;
    }
  }
  if (found) break;
}