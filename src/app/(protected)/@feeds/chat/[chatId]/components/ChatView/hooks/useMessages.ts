import { useEffect, useEffectEvent, useState } from 'react';
import { socketService } from '@/app/(protected)/@feeds/chat/[chatId]/services/Socket.service';
import type { TMessage } from '../models/chatView.model';
import type { TNullable } from '@/core/models/utility.model';

const useMessages = (chatId: number, socketUrl: string, accessToken: TNullable<string>) => {
  const [state, setState] = useState<TMessage[]>([]);

  const handleResponse = useEffectEvent((data: TMessage) => {
    setState([data]);
  });

  useEffect(() => {
    const { socket } = socketService(socketUrl);

    socket.emit('subscribe', { chatId, accessToken });
    socket.on('chat_response', handleResponse);

    return () => {
      socket.off('chat_response', handleResponse);
      socket.emit('unsubscribe', { chatId, accessToken });
    };
  }, [chatId, socketUrl, accessToken]);

  return { state };
};

export { useMessages };
