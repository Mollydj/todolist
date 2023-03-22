import { getStatusClassName, STATUS_NUMBERS } from "../Util/StatusNumbers";
import "./Task.css";
// import Icon from "react-eva-icons";

function Task(props) {
  const {
    item,
    onHandleStatusChange,
    onHandleRemoveToDo,
    onHandleSubTask,
    onHandleSubTaskSubmit,
  } = props;
  return (
    <div className="Card" key={item.id.toString()}>
      <div className="Card2">
        <p className="ToDoTitle">{item.todo}</p>
        <select
          onChange={(event) => onHandleStatusChange(event, item)}
          defaultValue={item.status}
          // className="StatusDropdown"
          className={"StatusDropdown " + getStatusClassName(item.status)}
        >
          <option value={STATUS_NUMBERS.NOT_STARTED}>Not Started</option>
          <option value={STATUS_NUMBERS.IN_PROGRESS}>In Progress</option>
          <option value={STATUS_NUMBERS.COMPLETE}>Complete</option>
        </select>
        <button>Edit</button>
        <button onClick={() => onHandleRemoveToDo(item.id)}>Delete</button>
        {/* <Icon
          name="activity"
          size="medium" // small, medium, large, xlarge
          animation={{
            type: "pulse", // zoom, pulse, shake, flip
            hover: true,
            infinite: false,
          }}
        /> */}
      </div>
      {/* <input onChange={(event) => onHandleSubTask(event)} /> */}
      {/* <button
        onClick={(event) => {
          onHandleSubTaskSubmit(event, item.id, item);
        }}
      >
        Add Tasks
      </button> */}
      {/* <input type="checkbox" />
      <div>
        {item.subtasks.map((item) => {
          <p>subtasks go here</p>;
        })}
      </div> */}
    </div>
  );
}

export default Task;
