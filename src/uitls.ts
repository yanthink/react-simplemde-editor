// @ts-ignore
import {EmojiType} from 'yt-emoji-picker/dist/uitls';

export function createShortnamesFromStrategy(strategy: { [unnicode: string]: EmojiType }): string[] {
  return Object.keys(strategy)
    .sort((a, b) => {
      if (strategy[a].order < strategy[b].order) {
        return -1;
      }
      if (strategy[a].order === strategy[b].order) {
        return 0;
      }
      return 1;
    })
    .map(key => strategy[key].shortname);
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
  return {left: left, top: top};
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
