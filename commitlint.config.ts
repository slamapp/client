import type { UserConfig } from "@commitlint/types";
import commitizenConfig from "./.cz-config";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      commitizenConfig.types.map(({ value }) => value),
    ],
    "type-case": [2, "always", "lower-case"],
    "scope-empty": [2, "never"],
  },
};

export default Configuration;
