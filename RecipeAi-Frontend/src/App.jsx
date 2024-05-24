import { createSignal } from "solid-js";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AppLayout from "./layouts/AppLayout";
import CreateRecipe from "./pages/recipe/CreateRecipe";
import { Route, Routes, } from "@solidjs/router";
import { lazy } from "solid-js";
const Recipe = lazy(() => import("./pages/recipe/Recipe"));
const GenerateRecipe = lazy(()=>import("./pages/recipe/GenerateRecipe"))
function App() {


  return (
    <AppLayout>




      <Routes>
        <Route path="/" component={Home} /> {/* 👈 Define the home page route */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/recipe/create" component={CreateRecipe} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/recipe/generate" component={GenerateRecipe}/>
      </Routes>



    </AppLayout>

  );
}

export default App;
