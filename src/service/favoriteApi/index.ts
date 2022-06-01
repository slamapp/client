import { request, authRequest, authFileRequest } from "../fetcher";
import type { FavoriteApi } from "./type";

const favoriteAPI: FavoriteApi = {
  getMyFavorites: () => authRequest.get("/favorites"),

  createMyFavorite: (courtId) => authRequest.post("/favorites", { courtId }),

  deleteMyFavorite: (favoriteId) =>
    authRequest.delete(`/favorites/${favoriteId}`),
};

export default favoriteAPI;
