import type { PositionKey, PositionValue } from "~/enums/positionType";
import type { ProficiencyKey, ProficiencyValue } from "~/enums/proficiencyType";

const getKoreanProficiency = (englishProficiency: ProficiencyKey) => {
  switch (englishProficiency) {
    case "BEGINNER":
      return "뉴비";
    case "INTERMEDIATE":
      return "중수";
    case "MASTER":
      return "고수";
    default:
      return "선택한 숙련도가 없습니다";
  }
};

export const getTranslatedProficiency = (
  englishProficiency: ProficiencyKey
): {
  english: ProficiencyKey;
  korean: ProficiencyValue;
} => ({
  english: englishProficiency,
  korean: getKoreanProficiency(englishProficiency),
});

const getKoreanPosition = (englishPosition: PositionKey) => {
  switch (englishPosition) {
    case "C":
      return "센터";
    case "PF":
      return "파워포워드";
    case "SF":
      return "스몰포워드";
    case "PG":
      return "포인트가드";
    case "SG":
      return "슈팅가드";
    default:
      return "미정";
  }
};

export const getTranslatedPositions = (
  englishPositions: PositionKey[]
): {
  english: PositionKey;
  korean: PositionValue;
}[] =>
  englishPositions.map((english) => ({
    english,
    korean: getKoreanPosition(english),
  }));
