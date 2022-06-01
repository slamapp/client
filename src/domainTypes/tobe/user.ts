import type { APICommon } from "~/domainTypes/tobe";
import type { Role, PositionKey, ProficiencyKey } from "~/enums";

export interface APIUser extends APICommon {
  description: string | null;
  nickname: string;
  profileImage: string | null;
  role: Role;
  positions: PositionKey[];
  proficiency: ProficiencyKey;
  email: string;
}
