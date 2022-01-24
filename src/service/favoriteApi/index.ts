import { request, authRequest, authFileRequest } from "../fetcher";
import { Api } from "./type";

const favoriteAPI: Api = {
  getMyFavorites: <R>() => authRequest.get<R, R>("/favorites"),

  createMyFavorite: <R>(courtId: number) =>
    authRequest.post<R, R>("/favorites", { courtId }),

  deleteMyFavorite: <R>(favoriteId: number) =>
    authRequest.delete<R, R>(`/favorites/${favoriteId}`),
};

export default favoriteAPI;
