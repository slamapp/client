import type { ComponentType, UIEvent } from "react";
import copy from "copy-to-clipboard";
import { positionType } from "~/enums/positionType";
import { proficiencyType } from "~/enums/proficiencyType";
import useKakao from "~/hooks/useKakao";
import { Toast } from "~/components/base";
import type { TemplateArgs } from "./sendKakaoLink";
import { sendKakaoLink } from "./sendKakaoLink";
import type { ShareArgs } from "./types";

const CLIENT_DOMAIN = "https://slams.app";

const handleShareClick = (
  isKakaoInitialized: boolean,
  templateArgs: TemplateArgs
) => {
  if (isKakaoInitialized) {
    sendKakaoLink(templateArgs);
  } else {
    const copyText = CLIENT_DOMAIN + templateArgs.path;
    copy(copyText);
    Toast.show(`🔗 공유하실 링크를 복사했습니다 (${copyText})`, 4000);
  }
};

const withShareClick = (...args: ShareArgs) => {
  return (
    WrappedComponent: ComponentType<{ onClick?: (e?: UIEvent) => void }>
  ) => {
    const [isKakaoInitialized] = useKakao();

    let templateArgs: TemplateArgs;

    switch (args[0]) {
      case "court": {
        const { id, name } = args[1].court;
        templateArgs = {
          title: `${name}`,
          subtitle: `${name}에서 농구 한판 어때요?🏀`,
          path: `/courts?courtId=${id}`,
          callbackText: `농구장 공유에 성공했어요🥳`,
          buttonText: `${name} 놀러가기`,
        };
        break;
      }

      case "courtChatroom": {
        const { id, court } = args[1].courtChatroom;
        templateArgs = {
          title: `${court.name}`,
          subtitle: `우리 ${court.name} 채팅방으로 놀러오세요🏀`,
          path: `/chat/${id}`,
          callbackText: `농구장 채팅방 공유에 성공했어요🥳`,
          buttonText: `${court.name} 놀러가기`,
        };
        break;
      }

      case "user": {
        const { id, nickname, positions, proficiency } = args[1].user;
        templateArgs = {
          title: `${nickname}`,
          subtitle: `${nickname}를 소개합니다🏀
포지션: ${positions.map((position) => positionType[position]).join(", ")}${
            proficiency
              ? `
실력: ${proficiencyType[proficiency]}`
              : ""
          }`,
          path: `/user/${id}`,
          callbackText: `사용자 공유에 성공했어요🥳`,
          buttonText: `${nickname}를 만나러 가기`,
        };
        break;
      }

      default: {
        throw new Error(
          "지정된 type이 아니면 withShareClick는 eventHandler를 바인딩 할 수 없습니다."
        );
      }
    }

    return (
      <WrappedComponent
        onClick={() => handleShareClick(isKakaoInitialized, templateArgs)}
      />
    );
  };
};

export default withShareClick;
