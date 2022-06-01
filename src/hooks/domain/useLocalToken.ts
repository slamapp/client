import { useLocalStorage } from "..";

const tokenKey = process.env.NEXT_PUBLIC_SLAM_LOCAL_TOKEN_KEY as string;

const useLocalToken = () => useLocalStorage(tokenKey, "");

export default useLocalToken;
