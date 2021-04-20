// import { EditorState } from "@codemirror/basic-setup";
import { EditorView } from "@codemirror/view";
import { indentMore, indentLess } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine} from "@codemirror/view"
import {Extension, EditorState} from "@codemirror/state"
import {history, historyKeymap} from "@codemirror/history"
import {foldGutter} from "@codemirror/fold"
import {indentOnInput} from "@codemirror/language"
import {lineNumbers} from "@codemirror/gutter"
import {defaultKeymap} from "@codemirror/commands"
import {bracketMatching} from "@codemirror/matchbrackets"
import {closeBrackets, closeBracketsKeymap} from "@codemirror/closebrackets"
import {highlightSelectionMatches, selectNextOccurrence} from "@codemirror/search"
import {commentKeymap} from "@codemirror/comment"
import {rectangularSelection} from "@codemirror/rectangular-selection"
import {defaultHighlightStyle} from "@codemirror/highlight"

// // default keyMap
// {key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: cursorSyntaxLeft, shift: selectSyntaxLeft},
// {key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: cursorSyntaxRight, shift: selectSyntaxRight},

// {key: "Alt-ArrowUp", run: moveLineUp},
// {key: "Shift-Alt-ArrowUp", run: copyLineUp},

// {key: "Alt-ArrowDown", run: moveLineDown},
// {key: "Shift-Alt-ArrowDown", run: copyLineDown},

// {key: "Escape", run: simplifySelection},

// {key: "Alt-l", run: selectLine},
// {key: "Mod-i", run: selectParentSyntax, preventDefault: true},

// {key: "Mod-[", run: indentLess},
// {key: "Mod-]", run: indentMore},
// {key: "Mod-Alt-\\", run: indentSelection},

// {key: "Shift-Mod-k", run: deleteLine},

// {key: "Shift-Mod-\\", run: cursorMatchingBracket}

const tabBinding = {key: "Tab", run: indentMore, shift: indentLess}
const cmdD = { key: "Mod-d", run: selectNextOccurrence, preventDefault: true }

const km = keymap.of([
	...closeBracketsKeymap,
	// ...defaultKeymap,
	// ...searchKeymap,
	...historyKeymap,
	...commentKeymap,
	tabBinding,
	cmdD
])

const basicSetup: Extension = [
  lineNumbers(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  defaultHighlightStyle.fallback,
  bracketMatching(),
  closeBrackets(),
  rectangularSelection(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  km
]

console.log(km, defaultKeymap);

let state = EditorState.create({ doc: `const {readFile} = require("fs");
readFile("package.json", "utf8", (err, data) => {
console.log(data);
});
`, extensions: [
        basicSetup,
        // oneDark,
        // keymap.of([defaultTabBinding]),
        javascript(),
        //  linter(esLint(new Linter)),
        //  StreamLanguage.define(javascript),
    ] });
window.view = new EditorView({ state, parent: document.querySelector("#editor") });
