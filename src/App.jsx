import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Navbar1 from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {


  return (
    <div className={ "bg-light text-dark min-vh-100"}>
      <Navbar1   />

      <div className="container py-4">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
