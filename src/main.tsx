import * as React from "react";
import { createRoot } from "react-dom";
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import TodoLogin from './Pages/Login/Login'

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to="/about">About Us</Link>
    </div>
  );
};

const About = () => {
  return <div>About</div>;
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const router = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<TodoLogin />} />
      </Routes>
    </BrowserRouter>
  );

  createRoot(rootElement).render(router);
} else {
  // Handle the case where 'rootElement' is null (e.g., display an error message)
  console.error("Element with id 'root' not found.");
}
