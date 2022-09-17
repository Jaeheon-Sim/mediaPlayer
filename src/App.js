import "./App.css";
import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Controller />
      <Player />
      <SideBar />
    </>
  );
}

export default App;
