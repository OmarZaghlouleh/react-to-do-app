import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TaskStates = {
  tasks: { name: string; type: string }[];
  draggedTask: string | null;
  deleting: boolean;
};

type TaskActions = {
  addTask: (name: string, type: string) => void;
  deleteTask: (name: string) => void;
  setDraggedTask: (name: string | null) => void;
  moveTask: (name: string | null, type: string) => void;
  deleteAll: (type: string) => void;
  setDeleting: (state: boolean) => void;
};

const initialTaskStates: TaskStates = {
  tasks: [...JSON.parse(localStorage.getItem("tasks") ?? "[]")],
  draggedTask: null,
  deleting: false,
};
export const useStore = create<TaskStates & TaskActions>()(
  persist(
    (set) => ({
      ...initialTaskStates,
      // Add task
      addTask: (name, type) => {
        set(
          produce((state: TaskStates) => {
            state.tasks.push({ name, type });
          })
        );
      },
      // Delete task
      deleteTask: (name) => {
        set((store) => ({
          tasks: store.tasks.filter((task) => {
            return task.name !== name;
          }),
          deleting: false,
        }));
      },
      // Delete all tasks
      deleteAll: (type) => {
        set((store) => ({
          tasks: store.tasks.filter((task) => {
            return task.type !== type;
          }),
          deleting: false,
        }));
      },
      // Move task
      moveTask: (name, type) => {
        set((store) => ({
          tasks: store.tasks.map((task) =>
            task.name === name ? { name, type } : task
          ),
        }));
      },
      // Set delete state
      setDeleting: (state) => {
        set(() => ({ deleting: state }));
      },
      // Set dragged task
      setDraggedTask: (name) => set({ draggedTask: name }),
    }),
    { name: "store" }
  )
);
