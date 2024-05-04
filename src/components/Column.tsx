import { useStore } from "../store";
import Task from "./Task";
import { useState } from "react";
import { getTypeTextColor } from "../utils/functions";
import { useShallow } from "zustand/react/shallow";

export default function Column({ taskType }: { taskType: string }) {
  const [draggingOver, setDraggingOver] = useState(false);
  // Store
  let tasks = useStore(
    useShallow((store) =>
      store.tasks.filter((element) => element.type === taskType)
    )
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const setDeleting = useStore((store) => store.setDeleting);
  const deleteAll = useStore((store) => store.deleteAll);

  return (
    <div
      className={
        "bg-slate-600 rounded-md p-2 flex flex-col justify-start items-start md:w-4/12 w-full m-2 border-spacing-32 " +
        (draggingOver ? "border-dashed border-4 border-cyan-600" : "")
      }
      id={taskType}
      onDragOver={(e) => {
        setDraggingOver(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDraggingOver(false);
        e.preventDefault();
      }}
      onDrop={(_) => {
        setDraggingOver(false);
        setDeleting(false);
        moveTask(draggedTask, taskType);
        setDraggedTask(null);
      }}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className={"font-bold text-lg " + getTypeTextColor(taskType)}>
          {taskType}
        </h1>
        <div className="flex flex-row items-center justify-center">
          <p className="font-medium text-gray-300 mr-1">{tasks.length}</p>
          <img
            src="./src/assets/close.svg"
            alt="delete all"
            title="Delete all"
            className="w-4 h-10 cursor-pointer mx-2"
            onClick={() => {
              deleteAll(taskType);
            }}
          />
        </div>
      </div>
      <div className="overflow-y-auto w-full overflow-x-hidden">
        {tasks.map((task) => {
          return <Task key={task.name} name={task.name} type={task.type} />;
        })}
      </div>
    </div>
  );
}
