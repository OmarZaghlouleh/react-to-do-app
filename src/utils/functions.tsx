import { TaskTypes } from "./constants";

export function getTypeBackgroundColor(type: string): string {
  switch (type) {
    case TaskTypes.planned:
      return "bg-orange-600";
    case TaskTypes.onGoing:
      return "bg-blue-600";
    case TaskTypes.ended:
      return "bg-green-600";
    default:
      return "";
  }
}
export function getTypeTextColor(type: string): string {
  switch (type) {
    case TaskTypes.planned:
      return "text-orange-600";
    case TaskTypes.onGoing:
      return "text-blue-600";
    case TaskTypes.ended:
      return "text-green-600";
    default:
      return "";
  }
}
