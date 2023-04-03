import { addData, editData } from "@/redux-toolkit/todoSlice";
import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from "react-redux";

function UpdateTodoForm({ data }) {
  const [titles, setTitles] = useState(data.title);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch addData action with the new todo data
    dispatch(editData({ id: data.id, title: titles }));
    setTitles("");
    data.id = "";
    data.title = "";
  };

  return (
    <form className="sticky top-[70px] p-4 flex gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border outline-double"
        value={titles}
        placeholder="update data"
        onChange={(e) => setTitles(e.target.value)}
      />
      <button type="submit">
        <GrUpdate />
      </button>
    </form>
  );
}

export default UpdateTodoForm;
