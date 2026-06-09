import { ACTION } from '../../constants/chatView.constant';
import type { TAction, TState } from '../../models/chatView.model';

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case ACTION.setLoading:
      return { ...state, isLoading: action.payload };
    case ACTION.prependData:
      return {
        ...state,
        isLoading: false,
        items: [...action.payload.items, ...state.items],
        hasMore: action.payload.hasMore
      };
    case ACTION.replaceData:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        hasMore: action.payload.hasMore
      };
    case ACTION.appendItem:
      if (state.items.some((item) => item.id === action.payload.id)) {
        return { ...state, isSending: false };
      }
      return { ...state, items: [...state.items, action.payload] };
    case ACTION.setSending:
      return { ...state, isSending: action.payload };
    default:
      return state;
  }
};

export { reducer };
