import Game1 from "./pages/Game1";

function App() {
  
  window.addEventListener("error", (error) => {
    console.error("Erreur non gérée : ", error);
  });
  return (
    <div className="App">
          <Game1 />
      </div>
  );
}

export default App;
