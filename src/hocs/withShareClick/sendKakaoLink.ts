import { Toast } from "~/components/base";

const DEFAULT_MESSAGE_TEMPLATE_ID = 69947;
const DEFAULT_REQUEST_URL = "https://slams.app";

const defaultSettings = {
  templateId: DEFAULT_MESSAGE_TEMPLATE_ID,
  requestUrl: DEFAULT_REQUEST_URL,
  installTalk: true,
};

export interface TemplateArgs {
  title: string;
  subtitle: string;
  path: string;
  callbackText: string;
  buttonText: string;
}

type SendKakaoLink = (templateArgs: TemplateArgs) => void;

export const sendKakaoLink: SendKakaoLink = ({
  title,
  subtitle,
  path,
  callbackText,
  buttonText,
}) => {
  const settings = {
    callback: () => {
      Toast.show(callbackText);
    },
    templateArgs: { title, subtitle, path, buttonText },
  };
  window.Kakao.Link.sendScrap({ ...defaultSettings, ...settings });
};
