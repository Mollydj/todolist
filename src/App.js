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
    if (storedToDos[0]?.length > 0) {
      setToDos(storedToDos[0]);
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
      array.unshift(newItem);
      setToDos(array);
      localStorage.setItem("TODOS", JSON.stringify(array));
    } else {
      setToDos(newItem);
      localStorage.setItem("TODOS", JSON.stringify([newItem]));
    }
    setToDo(newItem);
  };

  const handleRemoveToDo = (id) => {
    const copy = [...todos];
    const array = copy.filter((item) => item.id !== id);
    setToDos(array);
    localStorage.setItem("TODOS", JSON.stringify(array));
  };

  const handleStatusChange = (event, item) => {
    console.log("EVENT", event.target.value);
    var index = todos.indexOf(item);
    const updatedItem = {
      ...newItem,
      status: JSON.parse(event.target.value),
    };
    if (~index) {
      todos[index] = updatedItem;
    }
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
          <div className="Card" key={item.todo}>
            <p>{item.todo}</p>
            <select onChange={(event) => handleStatusChange(event, item)}>
              <option value={STATUS_NUMBERS.NOT_STARTED}>Not Started</option>
              <option value={STATUS_NUMBERS.IN_PROGRESS}>In Progress</option>
              <option value={STATUS_NUMBERS.COMPLETE}>Complete</option>
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
