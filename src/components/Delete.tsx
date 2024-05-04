import { useState } from "react";
import { useStore } from "../store";

export default function Delete() {
  const deleting = useStore((store) => store.deleting);
  const [draggingOver, setDraggingOver] = useState(false);
  const draggedTask = useStore((store) => store.draggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div
      className={
        (deleting ? "-translate-y-0 " : "translate-y-16 ") +
        (draggingOver ? " bg-opacity-50 " : "") +
        "w-full bg-red-600 text-white font-medium text-xl fixed bottom-0 flex justify-center items-center p-4 transition-all duration-300"
      }
      onDragOver={(e) => {
        setDraggingOver(true);
        e.preventDefault();
      }}
      onDragLeave={(_) => {
        setDraggingOver(false);
      }}
      onDrop={(_) => {
        deleteTask(draggedTask ?? "");
        setDraggingOver(false);
      }}
    >
      Delete
    </div>
  );
}
