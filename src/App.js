import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState({});
  const [todo, setToDo] = useState([]);
  const [todos, setToDos] = useState([]);
  const [removedToDo, setRemovedToDo] = useState([]);

  const STATUS_NUMBERS = {
    NOT_STARTED: 1,
    IN_PROGRESS: 2,
    COMPLETE: 3,
  };

  useEffect(() => {
    const storedToDos = [JSON.parse(localStorage.getItem("TODOS"))];
    if (storedToDos[0].length > 0) {
      setToDos(storedToDos[0].reverse());
    }
  }, [todo]);

  const handleInput = (event) => {
    setNewItem({
      id: Math.random(),
      todo: event.target.value,
      status: STATUS_NUMBERS.NOT_STARTED,
    });
  };

  const handleAddToDo = () => {
    let array = [...todos];
    if (todos) {
      array.push(newItem);
      setToDos(array);
      localStorage.setItem("TODOS", JSON.stringify(array));
    } else {
      setToDos(newItem);
      localStorage.setItem("TODOS", JSON.stringify([newItem]));
    }
    setToDo(newItem);
  };

  const handleRemoveToDo = (id) => {
    const array = [...todos];
    const index = array.map((item) => item.id === id).indexOf(true);
    if (index > -1) {
      array.splice(index, 1);
    }
    setRemovedToDo(index);
    setToDos(array);
    setNewItem();
    // localStorage.setItem("TODOS", JSON.stringify(array));
    console.log("ARRAY", array);
  };

  const handleStatusChange = (event) => {
    // const array = [...todos];
    // const index = array.map((item) => item.id === id);
    // console.log(event.target.value);
    // let objectName;
    // objectName = {status: , ...objectName};
  };

  return (
    <div className="App">
      <h1 className="Header">My Workspace</h1>
      <div className="Input">
        <input className="List" onChange={handleInput} />
        <button className="button" onClick={handleAddToDo}>
          Submit
        </button>
      </div>

      {todos?.length > 0 ? (
        todos.map((item) => (
          <div className="Card" key={item.id}>
            <p>{item.todo}</p>
            <select onChange={handleStatusChange}>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Complete</option>
            </select>
            <button onClick={() => handleRemoveToDo(item.id)}>Delete</button>
            <button onClick={() => handleRemoveToDo(item.id)}>
              Add Subitem
            </button>
          </div>
        ))
      ) : (
        <p>Add Todos!</p>
      )}
    </div>
  );
}

export default App;
