export const getIsDevPlayground = () => {
  const hostName =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    hostName !== "playground.lexical.dev" &&
    hostName !== "lexical-playground.vercel.app"
  );
};

export const DEFAULT_SETTINGS = {
  disableBeforeInput: false,
  emptyEditor: getIsDevPlayground(),
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isCollab: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: true,
};
