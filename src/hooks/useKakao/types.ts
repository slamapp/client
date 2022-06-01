export interface Kakao {
  init(...args: any[]): void;
  isInitialized(): boolean;
  Link: { sendScrap(options: any): void };
}

declare global {
  interface Window {
    Kakao: Kakao;
  }
}
