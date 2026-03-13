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
      <div className="h-screen bg-gradient-to-r from-zinc-800 to-zinc-500 flex justify-center items-center ">
        <div className="bg-gradient-to-r from-blue-200 via-violet-300 to-blue-300 rounded-lg max-w-screen-lg]:">
          <div className="p-6 flex gap-x-32">
            <input
              type="text"
              placeholder="Add new task"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              className="bg-white border-2 border-blue-500 rounded-2xl placeholder:text-center text-center w-96"
            />

            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className={`rounded-2xl text-center p-2 ${
                taskStatus==='todo'
                ?'bg-indigo-400'
                :taskStatus==='progress'
                ?'bg-yellow-300':
                'bg-green-400'
              }`}
            >
              <option  className="bg-white"  value="todo">Todo</option>
              <option className="bg-white"   value="progress">Progress</option>
              <option  className="bg-white" value="done">Done</option>
            </select>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>

          <div className="flex justify-evenly items-start p-6">
            <div>
              <h1 className="  w-60 text-xl text-center font-bold bg-indigo-400 border-b-2 border-gray-300 pb-2 mb-3">
                Todo
              </h1>

              <ul 
              
              onDragOver={handleDragOver} 
              onDrop={() => handleDrop("todo")}
              className="bg-indigo-400 rounded-3xl text-center"
              >
                {tasks
                  .filter((e) => e.status === "todo")
                  .map((ele) => {
                    return (
                      <li
                        key={ele.id}
                        draggable
                        onDragStart={() => handleDragStart(ele)}
                      >
                        {ele.name}{" "}
                        <button
                        className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-lg transition"
                        onClick={() => deleteTask(ele.id)}>
                          delete
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div>
              <h1 className="  w-60 text-xl text-center font-bold text-gray-800 bg-yellow-200 border-b-2 border-gray-300 pb-2 mb-3">
                progress
              </h1>

              <ul
               className="bg-yellow-300 rounded-3xl text-center"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("progress")}
              >
                {tasks
                  .filter((e) => e.status === "progress")
                  .map((ele) => {
                    return (
                      <li
                        key={ele.id}
                        draggable
                        onDragStart={() => handleDragStart(ele)}
                      >
                        {ele.name}{" "}
                        <button
                         className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-lg transition"
                        
                        onClick={() => deleteTask(ele.id)}>
                          delete
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div>
              <h1 className=" w-60 text-center px-5 text-xl font-bold text-gray-800 bg-green-500 border-b-2 border-gray-300 pb-2 mb-3">
                done
              </h1>

              <ul onDragOver={handleDragOver} onDrop={() => handleDrop("done")} className="bg-green-500 rounded-3xl text-center">
                {tasks
                  .filter((e) => e.status === "done")
                  .map((ele) => {
                    return (
                      <li
                        key={ele.id}
                        draggable
                        onDragStart={() => handleDragStart(ele)}
                      >
                        {ele.name}{" "}
                        <button
                        className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-lg transition"
                         onClick={() => deleteTask(ele.id)}>
                          delete
                        </button>
                      </li>
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
