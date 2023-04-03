import { addData } from "@/redux-toolkit/todoSlice";
import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch } from "react-redux";

function AddTodoForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch addData action with the new todo data
    dispatch(addData({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="sticky top-[30px] p-4 flex gap-3">
      <input
        className="border outline-double"
        type="text"
        value={title}
        placeholder='add data'
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">
        <GrAddCircle />
      </button>
    </form>
  );
}

export default AddTodoForm;
