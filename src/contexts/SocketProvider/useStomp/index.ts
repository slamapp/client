import type { CompatClient } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import { socketApi } from "~/service";
import type { APINotification } from "~/domainTypes/tobe";
import { useAuthContext } from "~/contexts/hooks";
import type { SendAuth, UseStomp } from "./type";
import { subscribe } from "./utils";

const useStomp: UseStomp = (token: string) => {
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { authProps, unshiftNotification } = useAuthContext();
  const {
    currentUser: { userId },
  } = authProps;

  const handleError = useCallback((e) => {
    console.log(e);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userId) {
      const newClient = socketApi.getCompatClient();
      newClient.connect(
        { Authorization: { token: `Bearer ${token}` } },
        () => {
          setIsConnected(true);
          setIsLoading(false);
          subscribe(newClient, `/user/${userId}/notification`, (body) => {
            console.log(body);
            unshiftNotification(body as APINotification);
          });
          subscribe(newClient, `/user/${`courtId`}/chat`, (body) => {
            console.log(body);
          });
        },
        handleError
      );

      setCompatClient(newClient);

      return () => newClient.disconnect();
    }
  }, [userId]);

  const sendAuth: SendAuth = (destination, body) => {
    console.log("SEND,Token", "destination:", destination, "body:", body);

    const bodyStringified = JSON.stringify(body);
    if (compatClient && token) {
      compatClient.send(destination, { token }, bodyStringified);
    }
  };

  return { isConnected, isLoading, sendAuth };
};

export default useStomp;
