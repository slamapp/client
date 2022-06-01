import type { APINotification, APIUser } from "~/domainTypes/tobe";
import type { ApiPromise } from "~/service/type";

export interface UserApi {
  getUserData: () => ApiPromise<{
    user: APIUser;
    notifications: APINotification[];
  }>;
  getMyProfile: () => ApiPromise<{
    followerCount: number;
    followingCount: number;
    user: APIUser;
  }>;
  getUserProfile: (userId: APIUser["id"]) => ApiPromise<
    Pick<
      APIUser,
      "nickname" | "description" | "profileImage" | "proficiency" | "positions"
    > & {
      userId: APIUser["id"];
      followerCount: number;
      followingCount: number;
      isFollowing: boolean;
    }
  >;
  updateMyProfile: (
    data: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >
  ) => ApiPromise<{
    user: Omit<APIUser, "id"> & { id: number };
  }>;
  updateMyProfileImage: (
    editedProfileImageFile: FormData
  ) => ApiPromise<{ profileImage: APIUser["profileImage"] }>;
  deleteMyProfileImage: () => ApiPromise<{
    profileImage: null;
  }>;
}
