import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function App() {
  // window.addEventListener("error", (error) => {
  //   console.error("Erreur non gérée : ", error);
  // });

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

// fonction qui permet de fetcher la db users afin d'obtenir tous les comptes. Cette fonction est exporté vers mains.jsx dans le loader
export const loadUsersDataBase = async () => {
  try {
    const usersDataBase = await axios.get("http://localhost:5000/api/users");

    return usersDataBase.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default App;
