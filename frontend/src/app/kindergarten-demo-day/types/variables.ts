import { EventVariableBase, VariableType } from "@/lib/event-page/types";

export interface KDDEventVariable extends EventVariableBase {
  banner_image?: VariableType;
  kv?: VariableType;
}
