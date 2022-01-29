import { APINotification } from "@domainTypes/tobe/notification";
import { APIUser } from "@domainTypes/tobe/user";
import { ApiPromise } from "@service/type";

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
  getUserProfile: (userId: APIUser["id"]) => ApiPromise;
  updateMyProfile: (...params: any[]) => ApiPromise;
  updateMyProfileImage: (editedProfileImageFile: File) => ApiPromise;
  deleteMyProfileImage: () => ApiPromise;
}
