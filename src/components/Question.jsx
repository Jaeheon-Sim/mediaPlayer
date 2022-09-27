import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faClosedCaptioning as regular } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { VideoAtom } from "../atom";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

const Overlay = styled(motion.div)`
  width: 95%;
  height: 90%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 15px;
  margin-bottom: 15px;
`;

const CateTab = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.type ? "teal" : "white")}; //props 활용
  /* background-color: #9f9e9e; */
`;

const Input = styled.input`
  height: 250px;
  width: 80%;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const QuestionInfoBox = styled(TitleBox)`
  justify-content: flex-end;
  width: 90%;
  margin-bottom: 20px;
`;

const QuestionBox = styled(motion.div)`
  width: 100%;
  height: 70vh;

  /* display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center center;

  overflow: auto;
  /* @media screen and (max-height: 90vh) and (min-height: 617px) {
    height: 30vh;
  } */
`;

const QuestionTab = styled(motion.div)`
  width: 90%;
  text-align: center;
  height: 50px;
  border: 1px solid;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Box = styled(motion.div)`
  margin-top: 20px;
  min-height: 70%;
  width: 90%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
`;

const Tab = styled.div`
  margin: 0 10px;
`;

export default function Question() {
  // 질문 보내는 시간을 getCurrentTime를 이용해 저장해서 백으로 쏴
  const videoVal = useRecoilValue(VideoAtom);
  const setVideoVal = useSetRecoilState(VideoAtom);
  const [type, setType] = useState(false);
  const [qTitle, setQTitle] = useState("");
  const [q, setQ] = useState("");
  const [clicked, setClicked] = useState(null);
  const toggle = (n) => {
    setClicked(n);
  };

  const questionUpload = () => {
    if (videoVal.playing === true) {
      console.log("stop");
      setVideoVal({ ...videoVal, playing: false });
    } else {
    }
    const lecTime = videoVal.played;
    console.log(lecTime);
    console.log(qTitle);
    console.log(q);
    setVideoVal({ ...videoVal, playing: true });
    console.log("play");
  };

  return (
    <Wrapper>
      <CateBox>
        <CateTab
          type={!type}
          onClick={() => {
            setType(false);
          }}
        >
          등록된 질문들
        </CateTab>
        <CateTab
          type={type}
          onClick={() => {
            setType(true);
          }}
        >
          질문 등록
        </CateTab>
      </CateBox>
      {type ? (
        <>
          <TitleBox>
            <label htmlFor="title">제목</label>
            <input
              value={qTitle}
              onChange={(e) => {
                setQTitle(e.target.value);
              }}
              id="title"
              placeholder="제목을 입력해주세요"
            />
          </TitleBox>
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            placeholder="질문을 등록해주세요"
          />
          <button onClick={questionUpload}>질문하기</button>
        </>
      ) : (
        <>
          <QuestionInfoBox>
            <Tab>질문 수: 10</Tab>
            <Tab>답변: 5</Tab>
          </QuestionInfoBox>
          <QuestionBox>
            {[1, 2, 3, 4, 5, 6, 7].map((e) => {
              return (
                <QuestionTab
                  onClick={() => {
                    toggle(e);
                  }}
                  key={e}
                  layoutId={e}
                >
                  <Tab>질문 {e}</Tab>
                  <Tab>답변상태:</Tab>
                </QuestionTab>
              );
            })}
            <AnimatePresence>
              {clicked ? (
                <Overlay
                  onClick={() => {
                    setClicked(null);
                  }}
                  initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                  animate={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                  exit={{ backgroundColor: "rgba(0,0,0,0)" }}
                >
                  <Box layoutId={clicked}>
                    <Tab>질문 {clicked}</Tab>
                    <Tab>답변:</Tab>
                  </Box>
                </Overlay>
              ) : null}
            </AnimatePresence>
          </QuestionBox>
        </>
      )}
    </Wrapper>
  );
}
