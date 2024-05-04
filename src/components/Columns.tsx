import { TaskTypes } from "../utils/constants";
import Column from "./Column";

export default function Columns() {
  return (
    <div className="tasks flex md:flex-row flex-col items-start justify-between w-full px-8 mt-20 ">
      {Object.values(TaskTypes).map((type) => {
        return <Column key={type} taskType={type} />;
      })}
    </div>
  );
}
