import type { APICourt, APIFavorite, APIUser } from "~/domainTypes/tobe";
import type { ApiPromise } from "~/service/type";

export interface FavoriteApi {
  getMyFavorites: () => ApiPromise<{
    favorites: {
      courtId: APIFavorite["court"]["id"];
      courtName: APIFavorite["court"]["name"];
      createdAt: string;
      updatedAt: string;
      favoriteId: APIFavorite["id"];
      latitude: APIFavorite["court"]["latitude"];
      longitude: APIFavorite["court"]["longitude"];
    }[];
  }>;
  createMyFavorite: (courtId: APICourt["id"]) => ApiPromise<{
    favoriteId: APIFavorite["id"];
    courtId: APIFavorite["court"]["id"];
    courtName: APIFavorite["court"]["name"];
    createdAt: string;
    updatedAt: string;
    userId: APIUser["id"];
  }>;
  deleteMyFavorite: (
    favoriteId: APIFavorite["id"]
  ) => ApiPromise<{ favoriteId: APIFavorite["id"] }>;
}
