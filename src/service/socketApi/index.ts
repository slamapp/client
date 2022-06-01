import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { SocketApi } from "./type";

const endPoint = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT as string;
const subfix = process.env.NEXT_PUBLIC_SERVICE_WS_SUB_FIX as string;
const socketUrl = `${endPoint + subfix}`;

const socketApi: SocketApi = {
  getWebSocket: () => new SockJS(socketUrl),
  getCompatClient: () => Stomp.over(socketApi.getWebSocket()),
};

export default socketApi;
