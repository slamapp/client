const typeEnums = {
  feat: "새로운 기능 추가 시",
  fix: "버그 해결 / 수정 시",
  docs: "도큐멘테이션 추가 또는 수정 시",
  revert: "작업 되돌리기 시",
  style: "스타일 추가시",
  remove: "불필요한 파일 제거 시",
  perf: "성능 개선 시",
  refactor: "리팩토링 시",
  ci: "CI 구성 파일 및 스크립트 변경 시",
  config: "설정파일 변경 / 추가시",
};

const maxSpaceLength = Object.keys(typeEnums).reduce(
  (acc, { length }) => (length > acc ? length : acc),
  0
);

const commitizenConfig = {
  types: Object.entries(typeEnums).map(([type, description]) => ({
    value: type,
    name:
      `${type}:     ${" ".repeat(maxSpaceLength - type.length)}` + description,
  })),
  allowBreakingChanges: ["feat", "fix", "remove"],
};

module.exports = commitizenConfig;
