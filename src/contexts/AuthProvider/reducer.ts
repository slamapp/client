import type { Reducer } from "react";
import type { Reservation } from "~/domainTypes";
import type { APINotification, APIUser, APIFavorite } from "~/domainTypes/tobe";
import type { ActionUnion } from "./actionTypes";

export interface DataProps {
  currentUser: {
    userId: APIUser["id"] | null;
    email: APIUser["email"] | null;
    profileImage: APIUser["profileImage"] | null;
    role: APIUser["role"] | null;
    description: APIUser["description"] | null;
    nickname: APIUser["nickname"] | null;
    favorites: (Pick<APIFavorite, "createdAt" | "updatedAt"> & {
      favoriteId: APIFavorite["id"];
      courtId: APIFavorite["court"]["id"];
      courtName: APIFavorite["court"]["name"];
      latitude: APIFavorite["court"]["latitude"];
      longitude: APIFavorite["court"]["longitude"];
    })[];
    notifications: APINotification[];
    notificationLastId?: APINotification["id"] | null;
    reservations: Reservation[];
  };
  isLoading: boolean;
}

export const initialData = {
  currentUser: {
    userId: null,
    email: null,
    profileImage: null,
    role: null,
    description: null,
    nickname: null,
    favorites: [],
    notifications: [],
    notificationLastId: undefined,
    reservations: [],
  },
  isLoading: true,
};

export const reducer: Reducer<DataProps, ActionUnion> = (prevState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER": {
      const { user, notifications } = action.payload;
      const {
        id,
        nickname,
        email,
        positions,
        proficiency,
        profileImage,
        role,
        description,
      } = user;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          userId: id,
          nickname,
          notifications: [...notifications],
          email,
          positions,
          proficiency,
          profileImage,
          role,
          description,
          notificationLastId:
            notifications[notifications.length - 1]?.id || null,
        },
      };
    }
    case "CLEAR_CURRENT_USER": {
      return {
        ...prevState,
        ...initialData,
      };
    }
    case "LOADING_ON": {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: true,
      };
    }
    case "LOADING_OFF": {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: false,
      };
    }
    case "UPDATE_MY_PROFILE": {
      const { nickname, positions, proficiency, description } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          nickname,
          positions,
          proficiency,
          description,
        },
      };
    }
    case "SET_MY_PROFILE_IMAGE": {
      const { profileImage } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          profileImage,
        },
      };
    }
    case "GET_MY_FAVORITES": {
      const { favorites } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          favorites: [...favorites],
        },
      };
    }
    case "CREATE_FAVORITE": {
      const { favorite } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          favorites: [...prevState.currentUser.favorites, favorite],
        },
      };
    }
    case "DELETE_FAVORITE": {
      const { deletedFavoriteId } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          favorites: prevState.currentUser.favorites.filter(
            ({ favoriteId }) => favoriteId !== deletedFavoriteId
          ),
        },
      };
    }
    case "SET_MY_RESERVATIONS": {
      const { reservations } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          reservations: [...reservations],
        },
      };
    }
    case "UNSHIFT_NOTIFICATION": {
      const { notification } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          notifications: [notification, ...prevState.currentUser.notifications],
        },
      };
    }
    case "CONCAT_NOTIFICATIONS": {
      const { notifications, lastId } = action.payload;

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          notifications: [
            ...prevState.currentUser.notifications,
            ...notifications,
          ],
          notificationLastId: notifications.length !== 0 ? lastId : null,
        },
      };
    }
    case "READ_ALL_NOTIFICATIONS": {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          notifications: [
            ...prevState.currentUser.notifications.map((notification) => ({
              ...notification,
              isRead: true,
            })),
          ],
        },
      };
    }
    default: {
      return { ...prevState };
    }
  }
};
