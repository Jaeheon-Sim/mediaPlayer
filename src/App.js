import { useEffect } from "react";
import "./App.css";
import MediaPlayer from "./MediaPlayer";
import { STATICURL } from "./static";
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
