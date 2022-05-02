import type { APIUser } from "@domainTypes/tobe";
import { createContext } from "react";

export interface ContextProps {
  sendFollow: (body: { receiverId: APIUser["id"] }) => void;
  sendFollowCancel: (body: { receiverId: APIUser["id"] }) => void;
  sendLoudSpeaker: (body: {
    courtId: number;
    startTime: string;
    reservationId: number;
  }) => void;
}

export const Context = createContext<ContextProps>({} as ContextProps);
