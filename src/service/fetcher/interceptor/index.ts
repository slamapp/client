import type { AxiosInstance } from "axios";
import type { RequestTypeUnion } from "../type";
import { requestTypes } from "../type";
import { req, res } from "./getConfig";

export const setInterceptors = (
  instance: AxiosInstance,
  type: RequestTypeUnion
) => {
  switch (type) {
    case requestTypes.AUTH:
      instance.interceptors.request.use(
        (config) => req.onFulfilled({ config, isNeedToken: true }),
        req.onRejected
      );
      instance.interceptors.response.use(res.onFulfilled, res.onRejected);
      break;

    case requestTypes.AUTH_FILE:
      instance.interceptors.request.use(
        (config) =>
          req.onFulfilled({ config, isNeedToken: true, isFileData: true }),
        req.onRejected
      );
      instance.interceptors.response.use(res.onFulfilled, res.onRejected);
      break;

    default:
      instance.interceptors.request.use(
        (config) => req.onFulfilled({ config }),
        req.onRejected
      );
      instance.interceptors.response.use(res.onFulfilled, res.onRejected);
  }

  return instance;
};
