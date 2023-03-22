import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./Components/AddTask";
import Task from "./Components/Task";
import { STATUS_NUMBERS } from "./Util/StatusNumbers";

function App() {
  const [newItem, setNewItem] = useState({});
  const [todo, setToDo] = useState([]);
  const [todos, setToDos] = useState([]);
  const [removedToDo, setRemovedToDo] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    const storedToDos = [JSON.parse(localStorage.getItem("TODOS"))];
    if (storedToDos[0]?.length > 0) {
      setToDos(storedToDos[0]);
    }
    console.log("STORED", storedToDos[0]);
  }, [todo, status]);

  const handleInput = (event) => {
    setNewItem({
      id: Math.random(),
      todo: event.target.value,
      status: STATUS_NUMBERS.NOT_STARTED,
      subtasks: [],
    });
  };

  const handleAddToDo = () => {
    let array = [...todos];
    if (todos) {
      array.unshift(newItem);
      setToDos(array);
      localStorage.setItem("TODOS", JSON.stringify(array));
    } else {
      setToDos(newItem);
      localStorage.setItem("TODOS", JSON.stringify([newItem]));
    }
    setToDo(newItem);
  };

  const handleSubTask = (event, id, item) => {
    setSubTask(event.target.value);
  };

  const handleSubtaskSubmit = (event, id, item) => {
    var index = todos.indexOf(item);
    const copy = item.subtasks;
    const updatedItem = {
      ...item.subtasks,
      subtasks: [subTask],
    };
    setSubTask();
    console.log("HERE", updatedItem.subtasks);
    console.log("CPY", copy);
    // if (~index) {
    //   item.subtasks = updatedItem;
    //   console.log("HERE", (todos[index].subtasks = updatedItem));
    // }
    // setSubTask(event.target.value);
    // // setToDos(todos);
    // console.log("TODOS", todos);
  };

  const handleRemoveToDo = (id) => {
    const copy = [...todos];
    const array = copy.filter((item) => item.id !== id);
    setToDos(array);
    localStorage.setItem("TODOS", JSON.stringify(array));
  };

  const handleStatusChange = (event, item) => {
    var index = todos.indexOf(item);
    const updatedItem = {
      ...item,
      status: JSON.parse(event.target.value),
    };
    if (~index) {
      todos[index] = updatedItem;
    }
    setToDos(todos);
    setStatus(event.target.value);
    localStorage.setItem("TODOS", JSON.stringify(todos));
  };

  return (
    <div className="App">
      <h1 className="Header">My Workspace</h1>
      <AddTask onHandleInput={handleInput} onHandleAddToDo={handleAddToDo} />

      {todos?.length > 0 ? (
        todos.map((item) => (
          <Task
            item={item}
            onHandleStatusChange={handleStatusChange}
            onHandleRemoveToDo={handleRemoveToDo}
            onHandleSubTask={handleSubTask}
            onHandleSubTaskSubmit={handleSubtaskSubmit}
          />
        ))
      ) : (
        <p>Add Todos!</p>
      )}
    </div>
  );
}

export default App;
