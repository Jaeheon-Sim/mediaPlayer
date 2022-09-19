import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { VideoAtom } from "./atom";

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
  width: 95%;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 100%;
  }
`;

const VideoTab = styled.div`
  height: 100%;
  width: 100%;
`;
const BarTab = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export default function MediaPlayer() {
  return (
    <Hm>
      <Wrapper>
        <VideoTab>
          <Player />
        </VideoTab>
        <BarTab>
          <SideBar />
        </BarTab>
      </Wrapper>
    </Hm>
  );
}
