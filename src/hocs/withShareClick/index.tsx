import type { ComponentType, UIEvent } from "react"
import copy from "copy-to-clipboard"
import { Toast } from "~/components/uis/molecules"
import useKakao from "~/hooks/useKakao"
import { positionType, proficiencyType } from "~/types/domains"
import type { TemplateArgs } from "./sendKakaoLink"
import { sendKakaoLink } from "./sendKakaoLink"
import type { ShareArgs } from "./types"

const CLIENT_DOMAIN = "https://slams.app"

const handleShareClick = (
  isKakaoInitialized: boolean,
  templateArgs: TemplateArgs
) => {
  if (isKakaoInitialized) {
    sendKakaoLink(templateArgs)
  } else {
    const copyText = CLIENT_DOMAIN + templateArgs.path
    copy(copyText)
    Toast.show(`π κ³΅μ νμ€ λ§ν¬λ₯Ό λ³΅μ¬νμ΅λλ€ (${copyText})`, 4000)
  }
}

const withShareClick = (...args: ShareArgs) => {
  return (
    WrappedComponent: ComponentType<{ onClick?: (e?: UIEvent) => void }>
  ) => {
    const [isKakaoInitialized] = useKakao()

    let templateArgs: TemplateArgs

    switch (args[0]) {
      case "court": {
        const { id, name } = args[1].court
        templateArgs = {
          title: `${name}`,
          subtitle: `${name}μμ λκ΅¬ νν μ΄λμ?π`,
          path: `/courts?courtId=${id}`,
          callbackText: `λκ΅¬μ₯ κ³΅μ μ μ±κ³΅νμ΄μπ₯³`,
          buttonText: `${name} λλ¬κ°κΈ°`,
        }
        break
      }

      case "courtChatroom": {
        const { id, court } = args[1].courtChatroom
        templateArgs = {
          title: `${court.name}`,
          subtitle: `μ°λ¦¬ ${court.name} μ±νλ°©μΌλ‘ λλ¬μ€μΈμπ`,
          path: `/chat/${id}`,
          callbackText: `λκ΅¬μ₯ μ±νλ°© κ³΅μ μ μ±κ³΅νμ΄μπ₯³`,
          buttonText: `${court.name} λλ¬κ°κΈ°`,
        }
        break
      }

      case "user": {
        const { id, nickname, positions, proficiency } = args[1].user
        templateArgs = {
          title: `${nickname}`,
          subtitle: `${nickname}λ₯Ό μκ°ν©λλ€π
ν¬μ§μ: ${positions.map((position) => positionType[position]).join(", ")}${
            proficiency
              ? `
μ€λ ₯: ${proficiencyType[proficiency]}`
              : ""
          }`,
          path: `/user/${id}`,
          callbackText: `μ¬μ©μ κ³΅μ μ μ±κ³΅νμ΄μπ₯³`,
          buttonText: `${nickname}λ₯Ό λ§λλ¬ κ°κΈ°`,
        }
        break
      }

      default: {
        throw new Error(
          "μ§μ λ typeμ΄ μλλ©΄ withShareClickλ eventHandlerλ₯Ό λ°μΈλ© ν  μ μμ΅λλ€."
        )
      }
    }

    return (
      <WrappedComponent
        onClick={() => handleShareClick(isKakaoInitialized, templateArgs)}
      />
    )
  }
}

export default withShareClick
