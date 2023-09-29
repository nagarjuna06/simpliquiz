import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-ada";
import "ace-builds/src-noconflict/mode-apache_conf";
import "ace-builds/src-noconflict/mode-applescript";
import "ace-builds/src-noconflict/mode-asciidoc";
import "ace-builds/src-noconflict/mode-assembly_x86";
import "ace-builds/src-noconflict/mode-autohotkey";
import "ace-builds/src-noconflict/mode-batchfile";
import "ace-builds/src-noconflict/mode-c9search";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-cirru";
import "ace-builds/src-noconflict/mode-clojure";
import "ace-builds/src-noconflict/mode-cobol";
import "ace-builds/src-noconflict/mode-coffee";
import "ace-builds/src-noconflict/mode-coldfusion";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-curly";
import "ace-builds/src-noconflict/mode-dart";
import "ace-builds/src-noconflict/mode-django";
import "ace-builds/src-noconflict/mode-d";
import "ace-builds/src-noconflict/mode-dockerfile";
import "ace-builds/src-noconflict/mode-dot";
import "ace-builds/src-noconflict/mode-drools";
import "ace-builds/src-noconflict/mode-eiffel";
import "ace-builds/src-noconflict/mode-ejs";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-elm";
import "ace-builds/src-noconflict/mode-erlang";
import "ace-builds/src-noconflict/mode-forth";
import "ace-builds/src-noconflict/mode-fortran";
import "ace-builds/src-noconflict/mode-ftl";
import "ace-builds/src-noconflict/mode-gcode";
import "ace-builds/src-noconflict/mode-gherkin";
import "ace-builds/src-noconflict/mode-gitignore";
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/mode-gobstones";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-groovy";
import "ace-builds/src-noconflict/mode-haml";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/mode-haskell_cabal";
import "ace-builds/src-noconflict/mode-haskell";
import "ace-builds/src-noconflict/mode-haxe";
import "ace-builds/src-noconflict/mode-hjson";
import "ace-builds/src-noconflict/mode-html_elixir";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-html_ruby";
import "ace-builds/src-noconflict/mode-ini";
import "ace-builds/src-noconflict/mode-io";
import "ace-builds/src-noconflict/mode-jack";
import "ace-builds/src-noconflict/mode-jade";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-jsoniq";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-jsp";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-julia";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/mode-less";
import "ace-builds/src-noconflict/mode-liquid";
import "ace-builds/src-noconflict/mode-lisp";
import "ace-builds/src-noconflict/mode-logiql";
import "ace-builds/src-noconflict/mode-lsl";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/mode-luapage";
import "ace-builds/src-noconflict/mode-lucene";
import "ace-builds/src-noconflict/mode-makefile";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-mask";
import "ace-builds/src-noconflict/mode-matlab";
import "ace-builds/src-noconflict/mode-maze";
import "ace-builds/src-noconflict/mode-mel";
import "ace-builds/src-noconflict/mode-mushcode";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-nix";
import "ace-builds/src-noconflict/mode-nsis";
import "ace-builds/src-noconflict/mode-objectivec";
import "ace-builds/src-noconflict/mode-ocaml";
import "ace-builds/src-noconflict/mode-pascal";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-pgsql";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-powershell";
import "ace-builds/src-noconflict/mode-praat";
import "ace-builds/src-noconflict/mode-prolog";
import "ace-builds/src-noconflict/mode-properties";
import "ace-builds/src-noconflict/mode-protobuf";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-razor";
import "ace-builds/src-noconflict/mode-rdoc";
import "ace-builds/src-noconflict/mode-rhtml";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/mode-rst";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-scad";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-scheme";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-sjs";
import "ace-builds/src-noconflict/mode-smarty";
import "ace-builds/src-noconflict/mode-snippets";
import "ace-builds/src-noconflict/mode-soy_template";
import "ace-builds/src-noconflict/mode-space";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-sqlserver";
import "ace-builds/src-noconflict/mode-stylus";
import "ace-builds/src-noconflict/mode-svg";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-tcl";
import "ace-builds/src-noconflict/mode-tex";
import "ace-builds/src-noconflict/mode-textile";
import "ace-builds/src-noconflict/mode-toml";
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/mode-twig";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-vala";
import "ace-builds/src-noconflict/mode-vbscript";
import "ace-builds/src-noconflict/mode-velocity";
import "ace-builds/src-noconflict/mode-verilog";
import "ace-builds/src-noconflict/mode-vhdl";
import "ace-builds/src-noconflict/mode-wollok";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-xquery";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-abap";
import "ace-builds/src-noconflict/mode-abc";
import "ace-builds/src-noconflict/mode-actionscript";
import "ace-builds/src-noconflict/mode-text";
import { Languages } from "./languagesList";
import { useState } from "react";
import { toast } from "react-toastify";

const ReactAceEditor = (props) => {
  const { code, readOnly, list = false, preview = false } = props;
  const { coding = "", language = "text" } = code;
  const [getLanguage, setLanguage] = useState(language);
  const [getCoding, setCoding] = useState(coding);
  const handleLanguageInput = (e) => {
    if (Languages.includes(e.target.value)) {
      setLanguage(e.target.value);
    } else {
      toast.error("This language not exist!");
    }
  };
  const handleCoding = (value) => {
    setCoding(value);
  };
  return (
    <>
      {list && (
        <div>
          <input
            type="text"
            name="language"
            list="languageList"
            placeholder="search language"
            onBlur={handleLanguageInput}
            required
          />
          <input type="hidden" name="coding" value={getCoding} required />
          <datalist id="languageList">
            {Languages.map((language) => (
              <option key={language} value={language} />
            ))}
          </datalist>
        </div>
      )}
      <div className="react-ace-code">
        <div className="language-name">
          <span>{getLanguage}</span>
        </div>
        <AceEditor
          name="coding"
          placeholder="Write Code Here"
          width="100%"
          height="100%"
          className="my-ace-editor"
          minLines={list ? 8 : preview ? 7 : 5}
          maxLines={15}
          mode={getLanguage}
          theme="dracula"
          showGutter={true}
          highlightActiveLine={false}
          value={getCoding + (!readOnly ? "\n" : "")}
          onChange={handleCoding}
          readOnly={!readOnly}
          showPrintMargin={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          enableBasicAutocompletion={true}
        />
      </div>
    </>
  );
};

export default ReactAceEditor;
