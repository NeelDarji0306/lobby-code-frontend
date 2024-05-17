import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";

const Home = lazy(() => import("./pages/Home"));
const UpdateLobby = lazy(() => import("./pages/UpdateLobby"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update" element={<UpdateLobby />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
