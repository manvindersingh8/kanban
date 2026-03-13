import { useState, useEffect } from "react";

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState("todo");
  const [draggedTask, setDraggedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now().toString(),
      name: newTask,
      status: taskStatus,
    };

    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((ele) => {
      return ele.id !== id;
    });
    setTasks(updatedTasks);
  };
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status) => {
    if (!draggedTask) return;
    const updatedTasks = tasks.map((ele) => {
      return ele.id === draggedTask.id ? { ...ele, status } : ele;
    });
    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-zinc-700 to-zinc-500 flex justify-center items-center">
        <div className="bg-white">
          <div className="bg-gradient-to-t bg-gray-300-500 p-5 flex gap-x-28 ">
            <input
              type="text"
              placeholder="Add new task"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              className="bg-gray-500 p-3"
            />
            <select
              onChange={(e) => setTaskStatus(e.target.value)}
              className="bg-gray-500 p-3 text-white"
            >
              <option value="todo">todo</option>
              <option value="progress">progress</option>
              <option value="done">done</option>
            </select>
            <button className="bg-gray-500 p-3" onClick={addTask}>
              AddTask
            </button>
          </div>

          <div className="flex justify-evenly items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                Todo
              </h1>
              <ul onDragOver={handleDragOver} onDrop={() => handleDrop("todo")}>
                {tasks
                  .filter((e) => e.status === "todo")
                  .map((ele) => {
                    return (
                      <>
                        <li
                          key={ele.id}
                          draggable
                          onDragStart={() => handleDragStart(ele)}
                        >
                          {ele.name}{" "}
                          <button
                            onClick={() => {
                              deleteTask(ele.id);
                            }}
                          >
                            delete
                          </button>
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                progress
              </h1>

              <ul
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("progress")}
              >
                {tasks
                  .filter((e) => e.status === "progress")
                  .map((ele) => {
                    return (
                      <>
                        <li
                          key={ele.id}
                          draggable
                          onDragStart={() => handleDragStart(ele)}
                        >
                          {ele.name}{" "}
                          <button
                            onClick={() => {
                              deleteTask(ele.id);
                            }}
                          >
                            delete
                          </button>
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                done
              </h1>
              <ul onDragOver={handleDragOver} onDrop={() => handleDrop("done")}>
                {tasks
                  .filter((e) => e.status === "done")
                  .map((ele) => {
                    return (
                      <>
                        <li
                          key={ele.id}
                          draggable
                          onDragStart={() => handleDragStart(ele)}
                        >
                          {ele.name}{" "}
                          <button
                            onClick={() => {
                              deleteTask(ele.id);
                            }}
                          >
                            delete
                          </button>
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
