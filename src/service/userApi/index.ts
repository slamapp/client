import { authRequest, authFileRequest } from "../fetcher";
import type { UserApi } from "./type";

const userAPI: UserApi = {
  getUserData: () => authRequest.get("/users/me"),
  getMyProfile: () => authRequest.get("/users/myprofile"),
  getUserProfile: (userId) => authRequest.get(`/users/${userId}`),
  updateMyProfile: (data) => authRequest.put("/users/myprofile", data),
  updateMyProfileImage: (editedProfileImageFile) =>
    authFileRequest.put("/users/myprofile/image", editedProfileImageFile),
  deleteMyProfileImage: () => authRequest.delete("/users/myprofile/image"),
};

export default userAPI;
