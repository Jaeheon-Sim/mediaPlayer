import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OverlappingAtom, QuestionAtom, VideoAtom } from "./atom";
import { useEffect } from "react";
import { Quest } from "./data.js";
import Swal from "sweetalert2";
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

export default function MediaPlayer() {
  const setQuestionVal = useSetRecoilState(QuestionAtom);
  const overlappingVal = useRecoilValue(OverlappingAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  // 중복로그인 에러가 일어나면 이 아톰을 바꾸고, 알림창을 띄우자

  // const MySwal = withReactContent(Swal);

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
