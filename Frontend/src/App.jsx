import { useState } from "react";
import BookCatalogPage from "./components/BookCatalogPage";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import userSlice from "./slices/userSlice";
import RouterComp from "./components/RouterComp";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Profile from "./components/Profile";
import Login from "./components/authComp/Login";
import { Toaster } from "react-hot-toast";
import SignUp from "./components/authComp/SignUp";
import AddBooks from "./components/AdminComp/AddBooks";
import AllBooks from "./components/AdminComp/AllBooks";
import { UserProvider } from './context/UserContext';
function App() {
  const store = configureStore({
    reducer: {
      user: userSlice,
    },
  });

  return (
    <Provider store={store}>
      <div className="bg-richBlue-100 flex flex-row px-10 h-screen">
        <RouterProvider router={appRouter}>
          <RouterComp />
        </RouterProvider>
      </div>
      <Toaster />
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RouterComp />,
    children: [
      { path: "/", element: <Home /> },
      { path: "books", element: <BookCatalogPage /> },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "addBook",
        element: <AddBooks />,
      },
      {
        path: "allBooks",
        element: <AllBooks />,
      },
      {
        path: "dashboard",
        element: <Dashboard />, // ✅ Add your Dashboard component here
      },
    ],
  },
]);

export default App;
