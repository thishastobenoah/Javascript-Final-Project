export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall?: string;
  bustPortrait?: string;
  fullPortrait?: string;
  fullPortraitV2?: string;
  killfeedPortrait?: string;
  background?: string;
  backgroundGradientColors?: string[];
  assetPath: string;
  isFullPortraitRightFacing?: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent?: boolean;
  role: AgentRole;
  recruitmentData?: RecruitmentData;
  abilities: ValorantAbility[];
}

export interface AgentRole {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon?: string;
  assetPath: string;
}

export interface ValorantAbility {
  slot: string;
  displayName: string;
  description: string;
  displayIcon?: string;
}

export interface RecruitmentData {
  counterId?: string;
  milestoneId?: string;
  milestoneThreshold?: number;
  useLevelVpCostOverride?: boolean;
  levelVpCostOverride?: number;
  startDate?: string;
  endDate?: string;
}
