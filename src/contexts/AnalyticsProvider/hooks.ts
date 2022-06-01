import { useRouter } from "next/router";
import { useEffect } from "react";
import GA from "react-ga4";
import { sendPageview } from "./handle";

const trackingId = process.env
  .NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID as string;

export const useInitialize = () =>
  useEffect(() => GA.initialize([{ trackingId }]), []);

export const usePageSend = () => {
  const { pathname } = useRouter();
  useEffect(() => sendPageview(pathname), [pathname]);
};
