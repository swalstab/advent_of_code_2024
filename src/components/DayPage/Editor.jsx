import EditorActions from "./EditorActions";
import Textarea from "./Textarea";

function Editor({ inputContent, setInputContent }) {
  return (
    <section className="editor u-mb-9">
      <EditorActions setInputContent={setInputContent} />
      <Textarea content={inputContent} onContentChange={setInputContent} />
    </section>
  );
}

export default Editor;
