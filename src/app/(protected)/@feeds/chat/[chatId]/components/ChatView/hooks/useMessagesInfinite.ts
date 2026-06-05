import {
  useCallback,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import {
  getPaginatedMessagesAction,
  sendMessageAction
} from '@/app/(protected)/@feeds/chat/[chatId]/actions/message.action';
import {
  ACTION,
  LOAD_MORE_THRESHOLD,
  SCROLL_BOTTOM_THRESHOLD
} from '../constants/chatView.constant';
import { useMessages } from './useMessages';
import { useMessagesVirtualizer } from './useMessagesVirtualizer';
import { reducer } from './utils/reducer.util';
import type { TMessagesInitialData, TMessage } from '../models/chatView.model';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef } from 'react';

const useMessagesInfinite = (
  { items, hasMore }: TMessagesInitialData,
  chatId: string,
  socketUrl: string,
  accessToken: TNullable<string>
) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [...items],
    hasMore,
    isLoading: false,
    isSending: false
  });

  const pageRef = useRef(1);
  const scrollRef = useRef<TNullable<ComponentRef<'div'>>>(null);
  const scrollMetricsRef = useRef<TNullable<{ scrollTop: number; scrollHeight: number }>>(null);
  const shouldScrollToBottomRef = useRef(false);
  const isInitialScrollDone = useRef(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { virtualizer, virtualItems, paddingTop, paddingBottom, measureRef } =
    useMessagesVirtualizer(state.items, scrollRef);

  const { state: socketState } = useMessages(Number(chatId), socketUrl, accessToken);

  useEffect(() => {
    if (!socketState.length) return;

    const message = socketState[0];
    shouldScrollToBottomRef.current = true;
    dispatch({ type: ACTION.appendItem, payload: message });
    dispatch({ type: ACTION.setSending, payload: false });
  }, [socketState]);

  useLayoutEffect(() => {
    if (!isInitialScrollDone.current && state.items.length > 0) {
      isInitialScrollDone.current = true;
      virtualizer.scrollToIndex(state.items.length - 1, { align: 'end' });
    }
  }, [state.items.length, virtualizer]);

  useLayoutEffect(() => {
    if (shouldScrollToBottomRef.current) {
      shouldScrollToBottomRef.current = false;
      virtualizer.scrollToIndex(state.items.length - 1, { align: 'end' });
      return;
    }

    const el = scrollRef.current;
    const metrics = scrollMetricsRef.current;
    if (!el || !metrics) return;

    el.scrollTop = metrics.scrollTop + (el.scrollHeight - metrics.scrollHeight);
    scrollMetricsRef.current = null;
  }, [state.items, virtualizer]);

  const loadMore = useCallback(async () => {
    const el = scrollRef.current;
    if (!el) return;

    scrollMetricsRef.current = { scrollTop: el.scrollTop, scrollHeight: el.scrollHeight };
    dispatch({ type: ACTION.setLoading, payload: true });

    const result = await getPaginatedMessagesAction(chatId, pageRef.current + 1);

    if (result.success) {
      pageRef.current = result.data.pageNumber;
      dispatch({
        type: ACTION.prependData,
        payload: {
          items: [...result.data.items].reverse(),
          hasMore: result.data.pageNumber < result.data.totalPages
        }
      });
    } else {
      dispatch({ type: ACTION.setLoading, payload: false });
    }
  }, [chatId]);

  const handleScroll = useEffectEvent(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.scrollTop < LOAD_MORE_THRESHOLD && state.hasMore && !state.isLoading) {
      void loadMore();
    }

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollButton(distanceFromBottom > SCROLL_BOTTOM_THRESHOLD);
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    virtualizer.scrollToIndex(state.items.length - 1, { align: 'end' });
    setShowScrollButton(false);
  }, [virtualizer, state.items.length]);

  const sendMessage = useCallback(
    (text: string) => {
      const optimisticMessage: TMessage = {
        id: String(Date.now()),
        content: text,
        isBot: false,
        created: new Date().toISOString(),
        chatId: Number(chatId),
        accountId: 0
      };

      shouldScrollToBottomRef.current = true;
      dispatch({ type: ACTION.setSending, payload: true });
      dispatch({ type: ACTION.appendItem, payload: optimisticMessage });
      void sendMessageAction({ chatId: Number(chatId), content: text });
    },
    [chatId]
  );

  return {
    items: state.items,
    isLoading: state.isLoading,
    isSending: state.isSending,
    scrollRef,
    virtualItems,
    paddingTop,
    paddingBottom,
    measureRef,
    sendMessage,
    showScrollButton,
    scrollToBottom
  };
};

export { useMessagesInfinite };
