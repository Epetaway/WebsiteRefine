// A small, dependency-free syntax highlighter for the case study's code excerpts.
// It only has to colour comments, strings, keywords, numbers and XML structure for
// three languages; anything it doesn't recognise stays plain, selectable text.

export type TokenKind = "comment" | "string" | "keyword" | "number" | "tag" | "attr" | "plain";
export type Token = { kind: TokenKind; text: string };
export type CodeLanguage = "ts" | "kotlin" | "xml";

const KEYWORDS: Record<Exclude<CodeLanguage, "xml">, Set<string>> = {
  ts: new Set([
    "async", "await", "break", "case", "catch", "const", "continue", "default", "else", "export",
    "false", "for", "from", "function", "if", "import", "in", "let", "new", "null", "of", "return",
    "switch", "throw", "true", "try", "type", "typeof", "undefined", "while",
  ]),
  kotlin: new Set([
    "class", "companion", "data", "else", "enum", "false", "for", "fun", "if", "in", "null",
    "object", "override", "private", "return", "suspend", "true", "val", "var", "when", "while",
  ]),
};

const CODE_PATTERN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|\b(\d[\d_]*(?:\.\d+)?L?)\b|\b([A-Za-z_]\w*)\b/g;

const XML_PATTERN = /(<!--[\s\S]*?-->)|(<\/?[\w:.-]+)|([\w:.-]+)(?==)|("[^"]*")|(\/?>)/g;

function push(tokens: Token[], kind: TokenKind, text: string) {
  if (!text) return;
  const last = tokens[tokens.length - 1];
  if (last && last.kind === kind) last.text += text;
  else tokens.push({ kind, text });
}

export function highlight(code: string, language: CodeLanguage): Token[] {
  const tokens: Token[] = [];
  const pattern = new RegExp(language === "xml" ? XML_PATTERN : CODE_PATTERN);
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(code)) !== null) {
    const index = match.index;
    push(tokens, "plain", code.slice(cursor, index));
    const [text] = match;
    let kind: TokenKind = "plain";
    if (language === "xml") {
      if (match[1]) kind = "comment";
      else if (match[2] || match[5]) kind = "tag";
      else if (match[3]) kind = "attr";
      else if (match[4]) kind = "string";
    } else if (match[1]) kind = "comment";
    else if (match[2]) kind = "string";
    else if (match[3]) kind = "number";
    else if (match[4] && KEYWORDS[language].has(match[4])) kind = "keyword";
    push(tokens, kind, text);
    cursor = index + text.length;
  }
  push(tokens, "plain", code.slice(cursor));
  return tokens;
}
