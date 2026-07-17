import EditorActions from "./EditorActions";
import Textarea from "./Textarea";

function Editor() {
  return (
    <section className="editor u-mb-9">
      <EditorActions />
      <Textarea />
    </section>
  );
}

export default Editor;
