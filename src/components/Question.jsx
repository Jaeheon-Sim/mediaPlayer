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

const QuestionBox = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center center;
`;

const QuestionTab = styled(motion.div)`
  width: 90%;
  text-align: center;
  height: 50px;
  border: 1px solid;
  margin-bottom: 10px;
  cursor: pointer;
`;
export default function Question() {
  // 질문 보내는 시간을 getCurrentTime를 이용해 저장해서 백으로 쏴
  const videoVal = useRecoilValue(VideoAtom);
  const [type, setType] = useState(false);

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
            <label for="title">제목</label>
            <input id="title" placeholder="제목을 입력해주세요" />
          </TitleBox>
          <Input placeholder="강좌를 잠시 멈추고 질문을 등록해주세요" />
          <button>질문하기</button>
        </>
      ) : (
        <AnimatePresence>
          <QuestionBox>
            {[1, 2, 3, 4, 5].map((e) => {
              return (
                <QuestionTab className={e}>
                  <div>질문 {e}</div>
                  <div>답변상태:</div>
                </QuestionTab>
              );
              // 클릭하면 커지게 하자 그래서 다 가리게 ㅇㅇ zindex 맨 위로 올려~
            })}
          </QuestionBox>
        </AnimatePresence>
      )}
    </Wrapper>
  );
}

// const [selectedId, setSelectedId] = useState(null)

// {items.map(item => (
//   <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
//     <motion.h5>{item.subtitle}</motion.h5>
//     <motion.h2>{item.title}</motion.h2>
//   </motion.div>
// ))}

// <AnimatePresence>
//   {selectedId && (
//     <motion.div layoutId={selectedId}>
//       <motion.h5>{item.subtitle}</motion.h5>
//       <motion.h2>{item.title}</motion.h2>
//       <motion.button onClick={() => setSelectedId(null)} />
//     </motion.div>
//   )}
// </AnimatePresence>
