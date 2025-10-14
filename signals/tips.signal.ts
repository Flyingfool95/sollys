import { persistentSignal } from "../helpers/global.helpers.ts";
import { Tip } from "../types/serverData.types.ts";
import { msUntilNextMidnight } from "../helpers/global.helpers.ts";

export const todaysTip = persistentSignal<Tip | undefined>("todays-tip", undefined, msUntilNextMidnight());
