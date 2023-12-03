import { Outlet } from "react-router-dom";
import Game1 from "./pages/Game1";
import SignUp from "./pages/SignUpPage";
function App() {
  window.addEventListener("error", (error) => {
    console.error("Erreur non gérée : ", error);
  });
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
