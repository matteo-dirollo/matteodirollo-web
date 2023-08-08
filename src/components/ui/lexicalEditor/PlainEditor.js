import React, { useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import EmoticonPlugin from './plugins/EmoticonPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { editorConfig } from './themes/editorConfig';
// import './styles.css'
import { Box, useColorModeValue } from '@chakra-ui/react';
import ImagesPlugin from './plugins/ImagesPlugin';
import YouTubePlugin from './plugins/YoutubePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

function PlainEditor({ stateInstance }) {

  
  const [newEditorConfig] = useState({
    ...editorConfig,
    editable: false,
    editorState: stateInstance,
  });

  return (
    <LexicalComposer initialConfig={newEditorConfig}>
      <Box maxW='100%' className="editor-container">
        <Box sx={{'*':{color:useColorModeValue('gray.700', 'gray.100')}}} className="readonlyeditor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ImagesPlugin />
          <YouTubePlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <EmoticonPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </Box>
      </Box>
    </LexicalComposer>
  );
}

export default PlainEditor;
