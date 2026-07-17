import EditorActions from "./EditorActions";
import Textarea from "./Textarea";

function Editor({ inputContent, setInputContent, setOutput1, setOutput2 }) {
  return (
    <section className="editor u-mb-9">
      <EditorActions
        setInputContent={setInputContent}
        setOutput1={setOutput1}
        setOutput2={setOutput2}
      />
      <Textarea content={inputContent} onContentChange={setInputContent} />
    </section>
  );
}

export default Editor;
