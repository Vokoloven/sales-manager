const ITEM_GAP = 12;

const ACTION = {
  setLoading: 'setLoading',
  prependData: 'prependData',
  replaceData: 'replaceData',
  appendItem: 'appendItem',
  setSending: 'setSending'
} as const;

const SCROLL_BOTTOM_THRESHOLD = 150;

const LOAD_MORE_THRESHOLD = 80;

export { ITEM_GAP, ACTION, SCROLL_BOTTOM_THRESHOLD, LOAD_MORE_THRESHOLD };
