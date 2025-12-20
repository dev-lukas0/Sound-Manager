import { TotalSoundCount } from "./developer-tools/totalSoundCount";

export * from "./core/createSoundRegistry";
export * from "./core/createSoundCategoryRegistry";

export namespace Developer_Tools {
    export const getTotalSoundCount = TotalSoundCount;
}
