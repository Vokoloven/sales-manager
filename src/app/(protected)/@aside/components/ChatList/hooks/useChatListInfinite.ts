import { useCallback, useEffect, useReducer, useRef } from 'react';
import { getPaginatedChatsAction } from '@/app/(protected)/@aside/actions/chat.action';
import { ACTION } from '../constants/chatListVirtual.constant';
import { useChatListVirtualizer } from './useChatListVirtualizer';
import { reducer } from './utils/reducer.util';
import type { TChatListInitialData } from '../models/chatListVirtual.model';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef } from 'react';

const useChatListInfinite = ({ items, hasMore }: TChatListInitialData) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [...items],
    hasMore,
    isLoading: false
  });

  const pageRef = useRef(1);
  const scrollRef = useRef<TNullable<ComponentRef<'div'>>>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    dispatch({
      type: ACTION.reset,
      payload: { items: [...items], hasMore: hasMore }
    });
    pageRef.current = 1;
  }, [items, dispatch]);

  const { virtualItems, paddingTop, paddingBottom, measureRef, isLastItem } =
    useChatListVirtualizer(state.items, scrollRef);

  const loadMore = useCallback(async () => {
    dispatch({ type: ACTION.setLoading, payload: true });
    const nextPage = pageRef.current + 1;
    try {
      const result = await getPaginatedChatsAction(nextPage);
      if (result.success) {
        pageRef.current = nextPage;
        dispatch({
          type: ACTION.appendData,
          payload: {
            items: result.data.items,
            hasMore: result.data.pageNumber < result.data.totalPages
          }
        });
      } else {
        dispatch({ type: ACTION.setLoading, payload: false });
      }
    } catch {
      dispatch({ type: ACTION.setLoading, payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLastItem && state.hasMore && !state.isLoading) {
      void loadMore();
    }
  }, [isLastItem, state.hasMore, state.isLoading, loadMore]);

  return {
    items: state.items,
    isLoading: state.isLoading,
    scrollRef,
    virtualItems,
    paddingTop,
    paddingBottom,
    measureRef
  };
};

export { useChatListInfinite };
