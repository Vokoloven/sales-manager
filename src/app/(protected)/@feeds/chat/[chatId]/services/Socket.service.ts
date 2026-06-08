import { Manager } from 'socket.io-client';
import { API_URL } from '@/core/constants/apiURL.constant';

class SocketService {
  private readonly manager;

  public constructor(baseUrl: string) {
    this.manager = new Manager(baseUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      transports: ['websocket']
    }).socket(API_URL.messageNamespace);
  }

  public get socket() {
    return this.manager;
  }
}

const socketService = (baseUrl: string) => new SocketService(baseUrl);

export { socketService };
