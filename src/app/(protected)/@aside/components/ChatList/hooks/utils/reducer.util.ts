import { ACTION } from '../../constants/chatListVirtual.constant';
import type { TAction, TState } from '../../models/chatListVirtual.model';

const reducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case ACTION.setLoading:
      return { ...state, isLoading: action.payload };
    case ACTION.appendData:
      return {
        ...state,
        isLoading: false,
        items: [...state.items, ...action.payload.items],
        hasMore: action.payload.hasMore
      };
    case ACTION.reset:
      return { items: action.payload.items, hasMore: action.payload.hasMore, isLoading: false };
    default:
      return state;
  }
};

export { reducer };
