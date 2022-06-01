import type { CompatClient } from "@stomp/stompjs";

export interface SocketApi {
  getWebSocket: () => WebSocket;
  getCompatClient: () => CompatClient;
}
