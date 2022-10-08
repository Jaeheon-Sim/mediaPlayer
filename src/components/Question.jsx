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
  height: 80vh;
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
  margin-bottom: 13px;
`;

const CateTab = styled(motion.div)`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.type ? "teal" : "black")}; //props 활용
`;

const Input = styled.textarea`
  height: 350px;
  width: 80%;
  background-color: #efefef;
  &:focus {
    background-color: white;
    border: 0.5px soild black;
  }
  border: none;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  width: 70%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid white;
  background-color: #efefef;
  &:focus {
    background-color: white;
    border: 0.5px soild black;
  }
  border-radius: 15px;
`;

const TitleBox = styled.div`
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const QuestionInfoBox = styled(TitleBox)`
  justify-content: flex-end;
  width: 90%;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.7);
`;

const QuestionBox = styled(motion.div)`
  width: 100%;
  height: 61vh;
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
  border-radius: 25px;
  overflow: auto;
  padding-top: 10px;
  /* @media screen and (max-height: 90vh) and (min-height: 617px) {
    height: 30vh;
  } */
`;

const QuestionTab = styled(motion.div)`
  padding: 1px;
  width: 80%;
  text-align: center;
  height: 49px;
  border: 1px solid white;
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
  height: 100%;
  width: 90%;
  padding: 10px 0px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 50vh;
  justify-content: center;
`;

const Div = styled.div`
  cursor: pointer;
`;

const Btn = styled(motion.button)`
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
  const [qData, setQData] = useState(true);

  const questionChecker = () => {
    var list = [];
    setNowQ(null);
    questionVal.map((e) => {
      if (e.time === videoTimeVal) {
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
    if (qTitle === "" || q === "") {
      alert("입력해");
    } else {
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
      alert("질문이 등록됨");
    }
  };

  useEffect(questionChecker, [videoTimeVal]);
  return (
    <Wrapper>
      <CateBox>
        <CateTab
          type={!type}
          onClick={() => {
            setType(false);
          }}
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
        >
          등록된 질문들
        </CateTab>
        <CateTab
          type={type}
          onClick={() => {
            setType(true);
          }}
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
        >
          질문 등록
        </CateTab>
      </CateBox>
      {type ? (
        <Form>
          <TitleBox>
            <TitleInput
              type="text"
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
          <Btn
            onClick={questionUpload}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
          >
            질문하기
          </Btn>
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
                  initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                  animate={{
                    zIndex: "1",
                  }}
                  exit={{ height: "auto", backgroundColor: "rgba(0,0,0,0)" }}
                >
                  <Box layoutId={clicked}>
                    <QBox>
                      <div>{nowQ[clicked - 1].title}</div>
                      <Div
                        onClick={() => {
                          setClicked(null);
                        }}
                      >
                        나가기
                      </Div>
                    </QBox>
                    <CateBox>
                      <CateTab
                        type={qData}
                        onClick={() => {
                          setQData(true);
                        }}
                      >
                        질문
                      </CateTab>
                      <CateTab
                        type={!qData}
                        onClick={() => {
                          setQData(false);
                        }}
                      >
                        답변
                      </CateTab>
                    </CateBox>
                    {!qData ? (
                      <ReplyBox>{nowQ[clicked - 1].replyContent}</ReplyBox>
                    ) : (
                      <ReplyBox>질문내용</ReplyBox>
                    )}
                  </Box>
                </Overlay>
              ) : null}
            </AnimatePresence>
            {nowQ?.map((e, idx) => {
              return (
                <QuestionTab
                  whileHover={{ border: "1px inset #000000" }}
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
