// "use client";
import AddTodoForm from "@/component/CRUD/addData";
import UpdateTodoForm from "@/component/CRUD/updateData";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import {
  deleteData,
  editData,
  fetchAsyncData,
} from "@/redux-toolkit/todoSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// const getFromStorage = (key) => {
//   if (typeof window !== "undefined") {
//     return window.localStorage.getItem(key);
//   }
// };

const setToStorage = (key, value) => {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
};

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [curr, setCurr] = useState([]);

  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchAsyncData());
  }, [dispatch]);

  const UpdateHandle = (val) => {
    setCurr(val);
    setShowModal(true);
  };
  // console.log(todo);
  setToStorage("todo", todo); ///LocalStorage
  return (
    <>
      <div className="grid grid-cols-[70%_30%] font-Roboto ">
        {
          <table className="border border-[#5d5555] h-[500px] p-8">
            <thead className="table-fixed sticky top-[-1px] bg-[darkgray] text-[white]">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="font-[16px]">
              {Array.isArray(todo) &&
                todo?.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td className="w-1/12">{i + 1}</td>
                      {/* <td className="w-1/12">{val.userId}</td> */}
                      <td className="">{val.title}</td>
                      <td>
                        <button
                          className="text-[18px]"
                          onClick={() => dispatch(deleteData(val.id))}
                        >
                          <TiDelete />
                        </button>{" "}
                        <button
                          className="text-[18px]"
                          onClick={() =>
                            UpdateHandle({ id: val.id, title: val.title })
                          }
                        >
                          <FiEdit />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        }
        <div className="relative">
          <AddTodoForm />
          {showModal && <UpdateTodoForm data={curr} />}
        </div>
      </div>
    </>
  );
}

export default Index;
