import { useStore } from "../store";
import { getTypeBackgroundColor } from "../utils/functions";

export default function Task({ name, type }: { name: string; type: string }) {
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const setDeleting = useStore((store) => store.setDeleting);

  return (
    <div
      className="flex flex-col flex-wrap text-wrap justify-between items-start bg-slate-400 rounded-md p-2 w-full my-2 cursor-move Toastify--animate"
      draggable
      onDragStart={(_) => {
        setDraggedTask(name);
        setDeleting(true);
      }}
      onDragEnd={(_) => {
        setDeleting(false);
      }}
    >
      <p className="text-white font-semibold w-4/5 flex text-wrap flex-wrap mb-2">
        {name}
      </p>
      <p
        className={
          getTypeBackgroundColor(type) +
          " rounded-md px-2 py-1 self-end text-white font-medium"
        }
      >
        {type}
      </p>
    </div>
  );
}
