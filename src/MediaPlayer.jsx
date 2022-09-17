import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import styled from "styled-components";

const Hm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  justify-content: center;
  background-color: white;
  width: 100%;
`;

export default function MediaPlayer() {
  return (
    <Hm>
      <Wrapper>
        <div>
          <Player />
          <Controller />
        </div>
        <SideBar />
      </Wrapper>
    </Hm>
  );
}
