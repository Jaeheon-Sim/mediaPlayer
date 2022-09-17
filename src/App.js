import "./App.css";
import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import MediaPlayer from "./MediaPlayer";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <MediaPlayer />
    </>
  );
}

export default App;
