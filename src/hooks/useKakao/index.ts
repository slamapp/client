import { useEffect, useState } from "react";

const useKakao = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  useEffect(() => {
    setIsInitialized(window.Kakao.isInitialized());
  }, []);

  return [isInitialized];
};

export default useKakao;
