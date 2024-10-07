import { Outlet } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Movie from "./components/Moives";
function App() {
  return (
    <>
   <Movie/>
   <Outlet/>
   </>
  );
}

export default App;
