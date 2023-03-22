function AddTask(props) {
  const { onHandleInput, onHandleAddToDo } = props;
  return (
    <div className="Input">
      <input className="List" onChange={onHandleInput} />
      <button className="button" onClick={onHandleAddToDo}>
        Submit
      </button>
    </div>
  );
}

export default AddTask;
