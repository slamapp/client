import { createContext } from "react";
import type {
  APICourt,
  APIFavorite,
  APINotification,
  APIUser,
} from "~/domainTypes/tobe";
import type { DataProps } from "./reducer";

export interface ContextProps {
  authProps: DataProps;

  setCurrentUser: (data: {
    user: APIUser;
    notifications: APINotification[];
  }) => void;
  getCurrentUser: () => Promise<void>;
  logout: () => void;
  updateMyProfile: (
    editedUserProfile: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >
  ) => Promise<void>;
  updateMyProfileImage: (editedProfileImageFile: FormData) => Promise<void>;
  deleteMyProfileImage: () => Promise<void>;
  createFavorite: (courtId: APICourt["id"]) => Promise<void>;
  deleteFavorite: (favoriteId: APIFavorite["id"]) => Promise<void>;
  unshiftNotification: (notification: APINotification) => void;
  getMyFavorites: () => Promise<void>;
  getMyReservations: () => Promise<void>;
  readAllNotifications: () => Promise<void>;
  getMoreNotifications: () => Promise<void>;
  authProviderInit: () => Promise<void>;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
