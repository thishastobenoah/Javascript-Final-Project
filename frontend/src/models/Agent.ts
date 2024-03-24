export interface ValorantAgent {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    characterTags: string[];
    displayIcon: string;
    bustPortrait: string;
    fullPortrait: string;
    assetPath: string;
    isActive: boolean;
    isDeleted: boolean;
    isFree: boolean;
    isNew: boolean;
    isBundleContent: boolean;
    streamedVideo: string;
    assetVideos: string[];
    assetName: string;
    role: string;
    roleDescription: string;
    developerType: string;
    releaseDate: string;
    countryCode: string;
    displayOrder: number;
    isPlayableCharacter: boolean;
    isAvailableForTest: boolean;
    isAvailableForPurchase: boolean;
    isAvailableForFree: boolean;
    abilities: ValorantAbility[];
  }
  
  export interface ValorantAbility {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
    slotDisplayIcon: string;
    assetName: string;
    isActive: boolean;
    isDeleted: boolean;
    slotDisplayOrder: number;
  }