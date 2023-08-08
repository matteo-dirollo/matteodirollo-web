import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function ChangeEditorState({
  editorInstanceRef,
  stateInstance,
}) {
  const [editor] = useLexicalComposerContext();

  // add the editor instance to your ref in a plugin like this one
  // you could also add the editorState to the ref directly via
  // the OnChange plugin, as Lexical's docs suggest.
  // (you'd need the OnChange plugin to pick up each state update).

  // (you don't need the OnChange plugin when you use the
  // editor instance because it always has access to the
  // latest state via .getEditorState())

  editor.update(() => {
    editor.setEditorState(stateInstance);
  });

  if (editorInstanceRef.current === null) {
    editorInstanceRef.current = editor;
  }

  return null;
}
