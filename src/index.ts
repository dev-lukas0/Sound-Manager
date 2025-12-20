import { TotalSoundCount } from "./developer-tools/totalSoundCount";
import { currentPlayingSounds } from "./developer-tools/currentPlayingSounds";
import { soundProperties } from "./developer-tools/soundProperties";

export * from "./core/createSoundRegistry";
export * from "./core/createSoundCategoryRegistry";

export namespace Developer_Tools {
    export const getTotalSoundCount = TotalSoundCount;
    export const getCurrentPlayingSounds = currentPlayingSounds;
    export const getSoundProperties = soundProperties;
}
