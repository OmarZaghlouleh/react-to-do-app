import { useState } from "react";
import { TaskTypes } from "../utils/constants";
import { useStore } from "../store";
import { toast } from "react-toastify";
export default function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState(TaskTypes.planned);
  const notify = (content: String) =>
    toast(content, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const addTask = useStore((store) => store.addTask);

  const handleOnClick = () => {
    if (taskName === "") {
      notify("Cannot add empty task.");
      return;
    }
    let canAdd = true;
    let localTasks = JSON.parse(localStorage.getItem("store") ?? "{}");

    localTasks.state.tasks.forEach((task: any) => {
      if (task.name.trim() === taskName.trim()) {
        canAdd = false;
        return;
      }
    });
    if (canAdd) {
      setTaskName("");
      addTask(taskName, taskType);
    } else {
      notify(taskName + " is already exist.");
    }
  };

  return (
    <div className="flex justify-center items-center m-4 w-full fixed bg-slate-950 -right-4 -top-4 h-16 shadow-sm shadow-cyan-500">
      <input
        type="text"
        id="taskName"
        title="Task name"
        placeholder="Task name"
        value={taskName}
        className="bg-slate-600 rounded-md pl-2 p-1 text-white w-4/12"
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
      <select
        name="Task type"
        title="Task type"
        id=""
        onChange={(e) => {
          setTaskType(e.target.value);
        }}
        className="ml-4 p-1 w-1/7 bg-slate-600 text-white rounded-md cursor-pointer hover:bg-opacity-80"
      >
        {Object.values(TaskTypes).map((e) => {
          return (
            <option key={e} value={e}>
              {e}
            </option>
          );
        })}
      </select>
      <button
        type="button"
        className="ml-4 bg-slate-600 rounded-md p-1 w-14 text-cyan-300 font-semibold hover:bg-opacity-80"
        onClick={handleOnClick}
      >
        Add
      </button>
    </div>
  );
}
