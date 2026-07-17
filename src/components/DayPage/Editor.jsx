import EditorActions from "./EditorActions";
import Textarea from "./Textarea";

function Editor({ inputContent, dispatch }) {
  return (
    <section className="editor u-mb-9">
      <EditorActions dispatch={dispatch} />
      <Textarea content={inputContent} dispatch={dispatch} />
    </section>
  );
}

export default Editor;
