import { get } from 'lodash';
// @ts-ignore
import { EmojiType } from 'yt-emoji-picker/dist/uitls';

export function createEmojiDataFromStrategy(strategy: { [unnicode: string]: EmojiType }): string[] {
  const categorysOrder = {
    people: 100000,
    nature: 200000,
    food: 300000,
    activity: 400000,
    travel: 500000,
    objects: 600000,
    symbols: 700000,
    flags: 800000,
  };

  const emojiData: EmojiType[] = [];

  Object.keys(strategy)
    .sort((a, b) => {
      const aOrder = get(categorysOrder, strategy[a].category, 0) + get(strategy[a], 'order', 0);
      const bOrder = get(categorysOrder, strategy[b].category, 0) + get(strategy[b], 'order', 0);

      if (aOrder < bOrder) {
        return -1;
      }

      if (aOrder === bOrder) {
        return 0;
      }

      return 1;
    })
    .forEach(key => {
      try {
        const emoji = strategy[key];
        const { shortname } = emoji;
        const keyword = shortname.replace(/:/g, '');

        if (!get(categorysOrder, emoji.category, 0)) {
          return;
        }

        if (emoji.category === 'modifier') {
          return;
        }

        if (emoji.category === 'regional') {
          emoji.category = 'symbols';
        }

        // https://github.com/joypixels/emojione/issues/617
        const notFoundIcons: string[] = [];

        if (notFoundIcons.includes(shortname)) {
          return;
        }

        emoji._key = key;

        emoji.keywords.push(emoji.name);
        if (!emoji.keywords.includes(keyword)) {
          emoji.keywords.push(keyword);
        }

        // 肤色处理
        emojiData.push(emoji);
      } catch (e) {
        //
      }
    });

  return emojiData;
}

export function getPositions(dom: HTMLElement) {
  let left = dom.offsetLeft,
    top = dom.offsetTop + dom.scrollTop,
    current = dom.offsetParent;

  while (current !== null) {
    // @ts-ignore
    left += current.offsetLeft;
    // @ts-ignore
    top += current.offsetTop;
    // @ts-ignore
    current = current.offsetParent;
  }
  return { left: left, top: top };
}

export function isParentElement(childElement: any, parentElement: any) {
  while (childElement.tagName.toUpperCase() !== 'BODY') {
    if (childElement == parentElement) {
      return true;
    }
    // @ts-ignore
    childElement = childElement.parentNode;
  }
  return false;
}
