// @ts-ignore
import escape from "escape-string-regexp";
// @ts-ignore
import { Textcomplete } from 'textcomplete';
// @ts-ignore
import CodemirrorEditor from 'textcomplete.codemirror';
// @ts-ignore
import EmojiPicker from 'yt-emoji-picker';
// @ts-ignore
import emojiToolkit from 'emoji-toolkit';
// @ts-ignore
import strategy from 'emoji-toolkit/emoji.json';
import { createEmojiDataFromStrategy } from './utils';
import './emoji.css';

const emojiData = createEmojiDataFromStrategy(strategy);

export default {
  emojiToolkit,
  emojiData,
  EmojiPicker,
  escape,
  Textcomplete,
  CodemirrorEditor,
};
