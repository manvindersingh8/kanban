import { useState, useEffect } from "react";

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState("todo");

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

  return (
    <>
      <input
        type="text"
        placeholder="Add new task"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />

      <select onChange={(e) => setTaskStatus(e.target.value)}>
        <option value="todo">todo</option>
        <option value="progress">progress</option>
        <option value="done">done</option>
      </select>

      <button onClick={addTask}>AddTask</button>

      <div>
        <h1>Todo</h1>
        <ul>
          {tasks
            .filter((e) => e.status === "todo")
            .map((ele) => {
              return (
                <>
                  <li key={ele.id}>
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

        <h1>progress</h1>

        <ul>
          {tasks
            .filter((e) => e.status === "progress")
            .map((ele) => {
              return (
                <>
                  <li key={ele.id}>
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
        <h1>done</h1>
        <ul>
          {tasks
            .filter((e) => e.status === "done")
            .map((ele) => {
              return (
                <>
                  <li key={ele.id}>
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
    </>
  );
};

export default App;
