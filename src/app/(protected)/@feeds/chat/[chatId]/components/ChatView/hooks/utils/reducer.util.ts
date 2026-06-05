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
        isLoading: false,
        items: action.payload.items,
        hasMore: action.payload.hasMore
      };
    default:
      return state;
  }
};

export { reducer };
