import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OverlappingAtom, QuestionAtom, VideoAtom } from "./atom";
import { useEffect, useState } from "react";
import { Quest } from "./data.js";
import Swal from "sweetalert2";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Manager from "./components/Manager";
// import withReactContent from "sweetalert2-react-content";

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
  background-color: rgb(255, 255, 255);
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

const CheckTab = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CheckBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  font-weight: bold;
  font-size: 18vh;
`;

export default function MediaPlayer() {
  const setQuestionVal = useSetRecoilState(QuestionAtom);
  const overlappingVal = useRecoilValue(OverlappingAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  const [isUser, setUser] = useState(null);
  // 중복로그인 에러가 일어나면 이 아톰을 바꾸고, 알림창을 띄우자
  const questionDown = () => {
    const question = Quest();
    setQuestionVal(question);
  };

  useEffect(questionDown, []);
  if (overlappingVal === true) {
    Swal.fire({
      title: "누군가가 로그인을 했어요",

      showCancelButton: true,
      confirmButtonText: "내가 쓸래요",
      cancelButtonText: "나가기",

      // 실행되는 동안 배경 누를때 모달창 안닫히도록 설정
      // isLoading() 즉, 로딩이 진행되는 동안 false를 리턴하게 해서 ousideClick을 안되게 하고, 로딩 상태가 아니면 ousideClick을 허용한다.
      allowOutsideClick: () => Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        setOverlappingVal(false);
      } else {
        alert("연결 종료");
      }
    });
  }

  // 어떤 강의랑 연결되었는지를 딱 판단해서 아톰값 수정해야함

  setTimeout(() => {
    setOverlappingVal(true);
  }, 3000);

  return (
    <Hm>
      {isUser === null ? (
        <CheckBox>
          <CheckTab
            initial={{ backgroundColor: "#000000", color: "#000000" }}
            animate={{
              backgroundColor: "#0000007f",
              color: "#9c9c9c",
              transition: { duraiton: 1 },
            }}
            whileHover={{
              backgroundColor: "#d8d8d8",
              transition: { duration: 0.3 },
              color: "#000000",
            }}
            onClick={() => {
              setUser(true);
            }}
          >
            <H1>플레이어</H1>
          </CheckTab>
          <CheckTab
            initial={{ backgroundColor: "#ffffff", color: "#000000" }}
            animate={{
              backgroundColor: "#0000007f",
              color: "#626262",
              transition: { duraiton: 1 },
            }}
            whileHover={{
              backgroundColor: "#d8d8d8",
              transition: { duration: 0.3 },
              color: "#000000",
            }}
            onClick={() => {
              setUser(false);
            }}
          >
            <H1>임시 플랫폼</H1>
          </CheckTab>
        </CheckBox>
      ) : isUser ? (
        <Wrapper>
          <VideoTab>
            <Player />
          </VideoTab>
          <BarTab>
            <SideBar />
          </BarTab>
        </Wrapper>
      ) : (
        <Manager />
      )}
    </Hm>
  );
}
