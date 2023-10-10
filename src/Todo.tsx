import { useEffect, useState } from 'react';
import nothingImg from './assets/nodata.png'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface todoType {
  id: string;
  title: string;
  date: string;
  isComplete: boolean | undefined;
}

export const Todo = () => {

  const [todos, setTodos] = useState<todoType[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [todoStatus, setTodoStatus] = useState<boolean>(false);
  console.log(setTodoStatus)

  const user = localStorage.getItem('isUserLoggedIn');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [])

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  }

  const navigate = useNavigate();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos)
  }, [])

  function handleChange(e: any) {
    setTodo(e.target.value)
    console.log(todo)
  }

  function addTodo() {
    if ("") {
      console.error("Error")
    }
    else {
      const newTodo = {
        id: generateUniqueId(),
        title: todo,
        date: new Date().toLocaleString(),
        isComplete: todoStatus
      }
      setTodos([...todos, newTodo]);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
      setTodo("")
      countAllTodos();

    }
  }

  const deleteTodo = (id: any) => {
    const updatedTodos = todos.filter((todo: any) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    countCompletedTodos()
  };


  //update the status of the todo
  const handleCompletion = (index: any) => {
    const updatedTodos = todos.map((todo: any) => {
      if (todo.id === index) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(updatedTodos);
    countCompletedTodos()
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  //get todo count
  const countAllTodos = () => todos.length;

  //get completed todo count 
  const countCompletedTodos = () => todos.filter((todo: any) => todo.isComplete).length;

  return (
    <div className="App">
      <div className="container">
      </div>
      <div className="todowrapper">
        <div className="titleBox">
          <span className="title">Todo</span>
          <button className='logout' onClick={() => {
            localStorage.setItem('isUserLoggedIn', JSON.stringify(false))
            setTimeout(() => {
              toast.success("Logout Successful")
              navigate('/login')
            }, 400);
          }}>Logout</button>
        </div>
        <div className="inputBox">
          <input type="text" className='todoinput' onChange={(e: any) => handleChange(e)} value={todo} placeholder='Add a new task' />
          <span className="material-symbols-outlined send" onClick={addTodo} >
            send
          </span>
        </div>
        <div className="todoDisplayBox">
          {todos.length != 0 &&
            <div >
              <div className="info">
                <div className="infoWrapper">
                  <span className="infoItem">Created Tasks: </span><div className="createdList">{countAllTodos()}</div>
                </div>
                <div className="infoWrapper">
                  <span className="infoItem">Completed Tasks:</span><div className="createdList">{countCompletedTodos()}/{countAllTodos()}</div>
                </div>
              </div>
              <hr />
            </div>
          }

          {
            todos.length === 0 ?

              <div className="noDataCol">

                <img src={nothingImg} alt="hey" className='noData' />
                <span className="dataMsg">You haven't added any todos!</span>
              </div>

              :

              <div className="todoItemCol">

                {
                  todos && todos.map((task) => (

                    <div className="todoItem" key={task?.id}>
                      <div className="todoItemWrapper">
                        <div className="checkbox">
                          {task?.isComplete
                            ?
                            <span onClick={(e: any) => {
                              console.log("first")
                              e.preventDefault();
                              handleCompletion(task?.id)
                            }} className="material-symbols-outlined check">
                              check_circle
                            </span>
                            :
                            <span onClick={(e: any) => {
                              console.log("first")
                              e.preventDefault();
                              handleCompletion(task?.id)
                            }} className="material-symbols-outlined check">
                              radio_button_unchecked
                            </span>
                          }
                        </div>
                        <div className="todoDetails">
                          <span className="todoTitle">{task.title}</span>
                          <span className="todoTime">{task.date}</span>
                        </div>
                        <div className="action">
                          <span className="material-symbols-outlined check" onClick={(e: any) => {
                            e.preventDefault()
                            deleteTodo(task?.id)
                          }}>
                            delete
                          </span>
                        </div>
                      </div>
                    </div>

                  ))
                }
              </div>
          }
        </div>
      </div>
      <div className="love">
        <span className="author">Made with <span className="emoji">❤️</span> by Farsana</span>
      </div>
    </div>
  )
}
