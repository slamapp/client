import type { CompatClient, messageCallbackType } from "@stomp/stompjs";

type ParsedCallback = (parsedBody: { [x: string]: any }) => void;

export const subscribe = (
  compatClient: CompatClient,
  destination: string,
  parsedCallback: ParsedCallback
) => compatClient.subscribe(destination, getParsedCallback(parsedCallback));

const getParsedCallback =
  (parsedCallback: ParsedCallback): messageCallbackType =>
  ({ body }) => {
    const defaultParsed = {};
    try {
      const parsedBody = JSON.parse(body);
      console.log("::SUBSCRIBE::", parsedBody);
      parsedCallback(parsedBody);
    } catch (error) {
      console.error(error);
      parsedCallback(defaultParsed);
    }
  };
