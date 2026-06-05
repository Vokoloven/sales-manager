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
import { useMessagesVirtualizer } from './useMessagesVirtualizer';
import { reducer } from './utils/reducer.util';
import type { TMessagesInitialData } from '../models/chatView.model';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef } from 'react';

const useMessagesInfinite = ({ items, hasMore }: TMessagesInitialData, chatId: string) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [...items],
    hasMore,
    isLoading: false
  });

  const pageRef = useRef(1);
  const scrollRef = useRef<TNullable<ComponentRef<'div'>>>(null);
  const scrollMetricsRef = useRef<TNullable<{ scrollTop: number; scrollHeight: number }>>(null);
  const isInitialScrollDone = useRef(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { virtualItems, paddingTop, paddingBottom, measureRef } = useMessagesVirtualizer(
    state.items,
    scrollRef
  );

  useLayoutEffect(() => {
    if (!isInitialScrollDone.current && scrollRef.current && state.items.length > 0) {
      isInitialScrollDone.current = true;
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.items.length]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    const metrics = scrollMetricsRef.current;
    if (!el || !metrics) return;

    el.scrollTop = metrics.scrollTop + (el.scrollHeight - metrics.scrollHeight);
    scrollMetricsRef.current = null;
  }, [state.items]);

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

  // useEffectEvent reads fresh state/loadMore on every call without needing deps
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
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setShowScrollButton(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      setIsSending(true);
      const sendResult = await sendMessageAction({ chatId: Number(chatId), content: text });

      if (sendResult.success) {
        const messagesResult = await getPaginatedMessagesAction(chatId, 1);
        if (messagesResult.success) {
          pageRef.current = messagesResult.data.pageNumber;
          dispatch({
            type: ACTION.replaceData,
            payload: {
              items: [...messagesResult.data.items].reverse(),
              hasMore: messagesResult.data.pageNumber < messagesResult.data.totalPages
            }
          });
          requestAnimationFrame(() => {
            scrollToBottom();
          });
        }
      }

      setIsSending(false);
    },
    [chatId, scrollToBottom]
  );

  return {
    items: state.items,
    isLoading: state.isLoading,
    isSending,
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
