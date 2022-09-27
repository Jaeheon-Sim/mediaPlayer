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
  /* height: 95vh; */
  grid-template-columns: 78% 22%;
  justify-content: center;
  background-color: white;
  width: 98%;
  @media screen and (max-width: 1500px) {
    grid-template-columns: 100%;
  }
`;

const VideoTab = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
const BarTab = styled.div`
  height: 100%;
  @media screen and (max-width: 1500px) {
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
