import { indentMore, indentLess } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
// import { javascript } from "@codemirror/lang-javascript";
import { EditorView, keymap, highlightSpecialChars, drawSelection, highlightActiveLine } from "@codemirror/view"
import { Extension, EditorState } from "@codemirror/state"
import { history, historyKeymap } from "@codemirror/history"
import { foldGutter } from "@codemirror/fold"
import { indentOnInput } from "@codemirror/language"
import { lineNumbers } from "@codemirror/gutter"
import { bracketMatching } from "@codemirror/matchbrackets"
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets"
import { highlightSelectionMatches, selectNextOccurrence } from "@codemirror/search"
import { commentKeymap } from "@codemirror/comment"
import { rectangularSelection } from "@codemirror/rectangular-selection"
import { defaultHighlightStyle } from "@codemirror/highlight"
import { defaultKeymap } from "@codemirror/commands"
// import { basicSetup } from "@codemirror/basic-setup"


const tabBinding = {key: "Tab", run: indentMore, shift: indentLess}
const cmdD = { key: "Mod-d", run: selectNextOccurrence, preventDefault: true }

const km = keymap.of([
	...closeBracketsKeymap,
	...defaultKeymap,
	// ...searchKeymap,
	...historyKeymap,
	...commentKeymap,
	tabBinding,
	cmdD
])

const setup: Extension = [
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
  rectangularSelection(), // shift+alt+click and drag
  highlightActiveLine(),
  highlightSelectionMatches(),
  km
]

class CodeMirror extends HTMLElement {
	state: any = undefined;
	view: any = undefined;

	constructor() {
		super();

		// properties
		// this.attachShadow({ mode: "open" });

		this.state = EditorState.create({ 
			doc: ``, 
			extensions: [
		        setup, // setup
		        html(),
			]
		});
	}

	// lifecycle
	connectedCallback() { 
		this.view = new EditorView({ state: this.state, parent: this });
	}

}

window.customElements.define("code-mirror", CodeMirror);

// window.addEventListener("load", () => {
// 	window.customElements.define("code-mirror", CodeMirror);
// })









