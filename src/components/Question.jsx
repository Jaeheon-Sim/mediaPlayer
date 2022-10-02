import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faClosedCaptioning as regular } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { QuestionAtom, VideoAtom, VideoTimeCheckAtom } from "../atom";
import { useEffect, useRef, useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 100%;
`;

const Overlay = styled(motion.div)`
  width: 90%;
  height: 90%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid;
`;

const CateTab = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.type ? "teal" : "black")}; //props 활용
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
  /* height: ${(props) => (props.click ? "70vh" : "auto")}; //props 활용 */
  /* display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap; */
  display: grid;
  position: relative;
  // width 넓으면 4개로 늘리지 뭐
  grid-template-columns: repeat(2, 1fr);

  place-items: start center;

  overflow: auto;
  /* @media screen and (max-height: 90vh) and (min-height: 617px) {
    height: 30vh;
  } */
`;

const QuestionTab = styled(motion.div)`
  padding: 1px;
  width: 80%;
  text-align: center;
  height: 49px;
  border: 1px solid;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: white;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const QBox = styled.div`
  margin-top: 10px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReplyBox = styled.div`
  margin-top: 10px;
  height: 100%;
  width: 90%;
  border: 1px solid;
  padding: 20px 0px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Div = styled.div`
  cursor: pointer;
`;

export default function Question() {
  const videoVal = useRecoilValue(VideoAtom);
  const setVideoVal = useSetRecoilState(VideoAtom);
  const questionVal = useRecoilValue(QuestionAtom);
  const videoTimeVal = useRecoilValue(VideoTimeCheckAtom);
  const [type, setType] = useState(false);
  const [nowQ, setNowQ] = useState(null);
  const [qTitle, setQTitle] = useState("");
  const [q, setQ] = useState("");
  const [clicked, setClicked] = useState(null);

  const questionChecker = () => {
    var list = [];
    setNowQ(null);

    questionVal.map((e) => {
      if (e.time === videoTimeVal) {
        console.log("Sfdsdf");
        list.push(e);
      }
    });
    setNowQ(list);
  };
  const toggle = (n) => {
    console.log(n);
    setClicked(n);
  };

  const questionUpload = (e) => {
    e.preventDefault();
    if (videoVal.playing === true) {
      setVideoVal({ ...videoVal, playing: false });
    }
    const lecTime = Math.trunc(videoVal.playedSec / 60); // 시간을 단계로 나눠

    const dummy = {
      title: qTitle,
      content: q,
      reply: false,
      replyContent: "",
      time: lecTime,
    };

    setNowQ([...nowQ, dummy]);
    setVideoVal({ ...videoVal, playing: true });
  };

  // 100 단위로 바뀌는 atom을 만들어야겠어

  useEffect(questionChecker, [videoTimeVal]);
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
        <Form>
          <TitleBox>
            <label htmlFor="title">제목</label>
            <input
              required
              value={qTitle}
              onChange={(e) => {
                setQTitle(e.target.value);
              }}
              id="title"
              placeholder="제목을 입력해주세요"
            />
          </TitleBox>
          <Input
            required
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            placeholder="질문을 등록해주세요"
          />
          <button onClick={questionUpload}>질문하기</button>
        </Form>
      ) : (
        <>
          <QuestionInfoBox>
            <Tab>질문 수: {nowQ?.length}</Tab>
            <Tab>답변: ??</Tab>
          </QuestionInfoBox>
          <QuestionBox click={clicked}>
            <AnimatePresence>
              {clicked ? (
                <Overlay
                  onClick={() => {
                    setClicked(null);
                  }}
                  initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                  animate={{
                    y: "1px`",
                    zIndex: "1",
                    height: "80vh",
                    backgroundColor: "rgba(0,0,0,0)",
                  }}
                  exit={{ height: "auto", backgroundColor: "rgba(0,0,0,0)" }}
                >
                  <Box layoutId={clicked}>
                    <QBox>
                      <div>{nowQ[clicked - 1].title}</div>
                      <Div>나가기</Div>
                    </QBox>
                    답변
                    <ReplyBox>{nowQ[clicked - 1].replyContent}</ReplyBox>
                  </Box>
                </Overlay>
              ) : null}
            </AnimatePresence>
            {nowQ?.map((e, idx) => {
              return (
                <QuestionTab
                  onClick={() => {
                    toggle(idx + 1);
                  }}
                  key={idx + 1}
                  layoutId={idx + 1}
                >
                  <Tab>{e.title}</Tab>
                  <Tab>답변상태: {e.reply ? "YES" : "NO"}</Tab>
                </QuestionTab>
              );
            })}
          </QuestionBox>
        </>
      )}
    </Wrapper>
  );
}
