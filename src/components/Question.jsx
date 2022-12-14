import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { faClosedCaptioning as regular } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  OverlappingAtom,
  QueryListAtom,
  QuestionAtom,
  UserTokenAtom,
  VideoAtom,
  VideoTimeCheckAtom,
} from "../atom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { STATICURL } from "../static";
import axios from "axios";

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
  font-weight: bolder;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.type ? " #a8a7a7" : "black")}; //props 활용
  border-bottom: 1px solid ${(props) => (props.type ? " #a8a7a7" : "none")}; ;
`;

const Input = styled.textarea`
  height: 350px;
  width: 80%;
  background-color: #efefef;
  &:focus {
    background-color: white;
    border: 0.5px soild black;
  }
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  width: 70%;
  padding: 10px;
  margin-bottom: 2px;
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
  height: 65vh;
  /* height: 61%; */
  /* height: ${(props) => (props.click ? "70vh" : "auto")}; //props 활용 */
  /* display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap; */
  display: grid;
  position: relative;

  grid-template-columns: repeat(1, 1fr);

  place-items: start center;
  border-radius: 25px;
  overflow: auto;
  padding-top: 10px;
  /* @media screen and (max-height: 90vh) and (min-height: 617px) {
    height: 30vh;
  } */
`;

const OverLay = styled(Overlay)`
  position: fixed;
  max-width: 21vw;
  max-height: 90vh;
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

const Tab = styled(motion.div)`
  margin: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* display: ${(props) => (props.visible ? "default" : "none")}; */
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
  const accessToken = useRecoilValue(UserTokenAtom);
  const [type, setType] = useState(false);
  const [nowQ, setNowQ] = useState(null);
  const [qTitle, setQTitle] = useState("");
  const [q, setQ] = useState("");
  const [clicked, setClicked] = useState(null);
  const [qData, setQData] = useState(true);
  const queryList = useRecoilValue(QueryListAtom);
  const setQuestionVal = useSetRecoilState(QuestionAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  const [visible, setVisible] = useState(true);
  const [questionContent, setQuestionContent] = useState("");
  const [questionReply, setQuestionReply] = useState("");

  const questionChecker = () => {
    var list = [];
    setNowQ(null);
    questionVal.map((e) => {
      if (e.timeline <= videoTimeVal + 4 && e.timeline >= videoTimeVal - 4) {
        list.push(e);
      }
    });
    setNowQ(list);
  };

  const toggle = (n) => {
    setClicked(n);
  };

  async function questionDown() {
    try {
      const res = await axios.get(
        `${STATICURL}/front/unit/${queryList.unitId}/questions`
      );
      setQuestionVal(res.data);
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  const questionUpload = (e) => {
    e.preventDefault();
    if (qTitle === "" || q === "") {
      alert("질문을 입력하세요.");
    } else {
      if (videoVal.playing === true) {
        setVideoVal({ ...videoVal, playing: false });
      }
      const lecTime = Math.trunc(videoVal.playedSec / 60); // 시간을 단계로 나눠

      axios
        .post(
          `${STATICURL}/front/unit/${queryList.unitId}/questions`,
          {
            content: q,
            title: qTitle,
            timeline: lecTime,
          },
          {
            headers: {
              "X-AUTH-TOKEN": accessToken,
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            questionDown();
            Swal.fire({
              icon: "success",
              title: "등록 완료",
              text: "곧 강사님이 답변을 주실거에요!",
              confirmButtonText: "확인",
            }).then((result) => {
              if (result.isConfirmed) {
                setVideoVal({ ...videoVal, playing: true });
              }
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setOverlappingVal(true);
          } else {
            alert(error);
          }
        });
    }
  };

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0.4 },
  };

  async function getQuestionContent(questionId) {
    try {
      const res = await axios.get(`${STATICURL}/front/questions/${questionId}`);
      setQuestionContent(res.data);
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  async function getQuestionReply(questionId) {
    try {
      const res = await axios.get(
        `${STATICURL}/front/questions/${questionId}/answers`
      );
      setQuestionReply(res.data);
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  // const uploadReply = (e) => {
  //   e.preventDefault();
  //   if (isReply === "") {
  //     alert("답변을 입력하세요.");
  //   } else {
  //     if (videoVal.playing === true) {
  //       setVideoVal({ ...videoVal, playing: false });
  //     }
  //     const lecTime = Math.trunc(videoVal.playedSec / 60); // 시간을 단계로 나눠

  //     axios
  //       .post(
  //         `${STATICURL}/front/questions/${queryList.unitId}/answers`,
  //         {
  //           content: q,
  //           title: qTitle,
  //           timeline: lecTime,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-AUTH-TOKEN": accessToken,
  //             "Access-Control-Allow-Credentials": true,
  //             "Access-Control-Allow-Origin": "*",
  //           },
  //         }
  //       )
  //       .then((response) => {})
  //       .catch((error) => {
  //         if (error.response.status === 409) {
  //           setOverlappingVal(true);
  //         } else {
  //           alert(error);
  //         }
  //       });
  //   }
  // };

  useEffect(questionChecker, [videoTimeVal, questionVal]);
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
            <Tab>{nowQ?.length}개의 질문이 있어요.</Tab>
            <Tab></Tab>
          </QuestionInfoBox>
          <QuestionBox click={clicked}>
            <AnimatePresence>
              {clicked ? (
                <OverLay
                  initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                  animate={{
                    display: ["none", "default"],
                    zIndex: "1",
                  }}
                  exit={{
                    backgroundColor: "rgba(0,0,0,0)",
                  }}
                >
                  <Box layoutId={clicked}>
                    <QBox>
                      <div>{nowQ[clicked - 1].title}</div>
                      <Div
                        onClick={() => {
                          setClicked(null);
                          setVisible(false);
                          setTimeout(() => {
                            setVisible(true);
                          }, 300);
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
                      <ReplyBox>{questionReply}</ReplyBox>
                    ) : (
                      <ReplyBox>
                        {questionContent.content}
                        {/* <div>
                          답변
                          <input
                            type="text"
                            placeholder="답변을 해주세요"
                            required
                            value={isReply}
                            onChange={(e) => {
                              setIsReply(e.target.value);
                            }}
                          />
                          <button onClick={uploadReply}>등록</button>
                        </div> */}
                      </ReplyBox>
                    )}
                  </Box>
                </OverLay>
              ) : null}
            </AnimatePresence>
            {nowQ?.map((e, idx) => {
              return (
                <QuestionTab
                  whileHover={{ border: "1px inset #000000" }}
                  onClick={() => {
                    getQuestionContent(e.questionId);
                    getQuestionReply(e.questionId);
                    setQData(true);
                    toggle(idx + 1);
                  }}
                  key={idx + 1}
                  layoutId={idx + 1}
                >
                  <Tab
                    animate={visible ? "open" : "closed"}
                    variants={variants}
                  >
                    {e.title}
                  </Tab>
                  <Tab
                    animate={visible ? "open" : "closed"}
                    variants={variants}
                  >
                    {e.replyCount}개의 답변이 있어요.
                  </Tab>
                </QuestionTab>
              );
            })}
          </QuestionBox>
        </>
      )}
    </Wrapper>
  );
}
