import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Blog from "./pages/blog/blog.js";
import Login from "./pages/login/login.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Category } from "./pages/category/category.js";
import { AddBlog } from "./pages/blog/addblog.js";
import { Mainlayout } from "./component/layout/mainlayout.js";
import Author from "./pages/author/author.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} ></Navigate>}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route element={<Mainlayout />}>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path="/addBlog" element={<AddBlog />}></Route>
            <Route path="/author" element={<Author />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
