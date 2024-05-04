import { ToastContainer } from "react-toastify";
import AddTask from "./components/AddTask";
import Columns from "./components/Columns";
import "react-toastify/dist/ReactToastify.css";
import Delete from "./components/Delete";

function App() {
  return (
    <div className="App overflow-y-auto overflow-x-hidden h-screen flex flex-col justify-start items-center bg-slate-950">
      <AddTask />
      <Columns />
      <Delete />
      <ToastContainer />
    </div>
  );
}

export default App;
