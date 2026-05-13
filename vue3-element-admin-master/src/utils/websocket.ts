/**
 * 通用 WebSocket 通信功能
 * 默认连接地址：ws://192.168.1.1:8888/websocket
 */
export const DEFAULT_WEBSOCKET_URL = "ws://192.168.1.1:8888/websocket";

export type WebSocketMessageData = string | ArrayBufferLike | Blob | ArrayBufferView;

type WebSocketEventType = "open" | "message" | "close" | "error";

type EventHandler<T = any> = (event: T) => void;

export interface WebSocketOptions {
  url?: string;
  protocols?: string | string[];
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  onOpen?: EventHandler<Event>;
  onMessage?: EventHandler<MessageEvent>;
  onClose?: EventHandler<CloseEvent>;
  onError?: EventHandler<Event>;
}

export interface WebSocketClient {
  connect: () => void;
  close: (code?: number, reason?: string) => void;
  send: (data: WebSocketMessageData) => void;
  sendJson: (data: unknown) => void;
  isConnected: () => boolean;
  getReadyState: () => number;
  on: <T extends Event>(event: WebSocketEventType, handler: EventHandler<T>) => void;
  off: <T extends Event>(event: WebSocketEventType, handler: EventHandler<T>) => void;
}

export function createWebSocket(options: WebSocketOptions = {}): WebSocketClient {
  if (typeof window === "undefined") {
    throw new Error("WebSocket 仅可在浏览器环境中使用");
  }

  const {
    url = DEFAULT_WEBSOCKET_URL,
    protocols,
    reconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = Infinity,
    onOpen,
    onMessage,
    onClose,
    onError,
  } = options;

  let socket: WebSocket | null = null;
  let reconnectAttempts = 0;
  let manuallyClosed = false;
  const listeners: Record<WebSocketEventType, Set<EventHandler>> = {
    open: new Set(),
    message: new Set(),
    close: new Set(),
    error: new Set(),
  };

  const emit = <T extends Event>(eventType: WebSocketEventType, event: T) => {
    listeners[eventType].forEach((handler) => (handler as EventHandler<T>)(event));
  };

  const buildWebSocket = () => {
    if (!window.WebSocket) {
      throw new Error("当前浏览器不支持 WebSocket");
    }

    socket = protocols ? new WebSocket(url, protocols) : new WebSocket(url);

    socket.onopen = (event) => {
      reconnectAttempts = 0;
      emit("open", event);
      onOpen?.(event);
    };

    socket.onmessage = (event) => {
      emit("message", event);
      onMessage?.(event);
    };

    socket.onclose = (event) => {
      emit("close", event);
      onClose?.(event);

      if (!manuallyClosed && reconnect && reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts += 1;
        setTimeout(() => buildWebSocket(), reconnectInterval);
      }
    };

    socket.onerror = (event) => {
      emit("error", event);
      onError?.(event);
    };
  };

  const connect = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return;
    }
    manuallyClosed = false;
    buildWebSocket();
  };

  const close = (code?: number, reason?: string) => {
    manuallyClosed = true;
    if (socket) {
      socket.close(code, reason);
    }
  };

  const send = (data: WebSocketMessageData) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket 未连接，无法发送消息");
    }
    socket.send(data);
  };

  const sendJson = (data: unknown) => {
    send(JSON.stringify(data));
  };

  const isConnected = () => socket?.readyState === WebSocket.OPEN;

  const getReadyState = () => socket?.readyState ?? WebSocket.CLOSED;

  const on = <T extends Event>(event: WebSocketEventType, handler: EventHandler<T>) => {
    listeners[event].add(handler as EventHandler);
  };

  const off = <T extends Event>(event: WebSocketEventType, handler: EventHandler<T>) => {
    listeners[event].delete(handler as EventHandler);
  };

  return {
    connect,
    close,
    send,
    sendJson,
    isConnected,
    getReadyState,
    on,
    off,
  };
}
