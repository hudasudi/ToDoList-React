import { useState, useEffect} from "react"
function ToDoList(){
 
  // check if something stored in localStorage
  const [tasks, setTasks] = useState(() => {
    //load page
    const saved = localStorage.getItem("tasks");
    //if something exists, we parse it back to array and use that as a starting rate, if not just start with []
    return saved ? JSON.parse(saved) : [];
  });


  const [newTask, setNewTask] = useState("");
//save page
  useEffect(() =>{
    localStorage.setItem("tasks",JSON.stringify(tasks));//convert array/object -> string
  },[tasks]);

  function handleInputChange(event){
    setNewTask(event.target.value);
    
  }
  function addTask(){
    if(newTask.trim() !== ""){
    setTasks(t => [...t,newTask]);
    setNewTask("");
    }

  }
  function deleteTask(index){

    setTasks(t => t.filter((_,i) => i !== index));

  }
  function moveTaskUp(index){

    const updatedTask = [...tasks];
    
    if(index > 0){
    [updatedTask[index], updatedTask[index - 1]] = 
    [updatedTask[index - 1], updatedTask[index]]
    setTasks(updatedTask);
    }

  }
  function moveTaskDown(index){

     const updatedTask = [...tasks];
    
    if(index < tasks.length - 1){
    [updatedTask[index], updatedTask[index + 1]] = 
    [updatedTask[index + 1], updatedTask[index]]
    setTasks(updatedTask);
    }

  }

  return(<div className="to-do-list">
     
         <h1>To-Do-List</h1>
       
       <div>
        <input
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}/>
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
       </div>

       <ol>
        {tasks.map((task,index) => 
        <li key={index}>
          <span className="text">{task}</span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>

            <button className="move-btn" onClick={() => moveTaskUp(index)}>
              ☝️
            </button>

            <button className="move-btn" onClick={() => moveTaskDown(index)}>
              👇
            </button>
        </li>)}
       </ol>

        </div>);

}
export default ToDoList
