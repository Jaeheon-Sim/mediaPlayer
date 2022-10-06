import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { QuestionAtom, VideoAtom } from "./atom";
import { useEffect } from "react";
import { Quest } from "./data.js";

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
  margin-left: 10px;
  height: 100%;
  @media screen and (max-width: 1500px) {
    display: none;
  }
`;

// 이 와이드 벨류를 풀스크린으로 하면 안될까?

export default function MediaPlayer() {
  // const QuestionVal = useRecoilValue(QuestionAtom);
  const setQuestionVal = useSetRecoilState(QuestionAtom);

  const agent_str = navigator.userAgent;

  const questionDown = () => {
    const question = Quest();
    setQuestionVal(question);
  };

  // 시간대를 1분마다 끊어 그럼
  // 1분에 얼마나 배열이 있는지 찾아서 해당 시간내에 어떤 질문이있는지 파악
  // 이 리스트 개수를 바에 올려
  // 이 리스트를 섹셔넹 보여줘

  useEffect(questionDown, []);

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
