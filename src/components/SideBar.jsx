import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import Data from "./Data";
import List from "./List";
import Question from "./Question";

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const NoticeTab = styled(motion.div)`
  width: 100%;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: bolder;
`;

const Notice = styled(motion.div)`
  width: 25%;
  height: 100%;
  border-bottom: 1px solid;
  margin-left: 3px;
  margin-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  color: ${(props) =>
    props.men === props.now ? "#a8a7a7" : "black"}; //props 활용
`;

const ListTab = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export default function SideBar() {
  const menuList = {
    0: <List />,
    1: <Data />,
    2: <Question />,
    3: <Review />,
  };

  const [menu, setMenu] = useState(0);

  return (
    <BarWrapper>
      <NoticeTab>
        <Notice
          now={0}
          men={menu}
          onClick={() => {
            setMenu(0);
          }}
          whileHover={{ backgroundColor: "#a8a7a7" }}
        >
          강의 목록
        </Notice>
        <Notice
          now={1}
          men={menu}
          onClick={() => {
            setMenu(1);
          }}
          whileHover={{ backgroundColor: "#a8a7a7" }}
        >
          수업 자료
        </Notice>
        <Notice
          now={2}
          men={menu}
          onClick={() => {
            setMenu(2);
          }}
          whileHover={{ backgroundColor: "#a8a7a7" }}
        >
          수업 질문
        </Notice>
        <Notice
          now={3}
          men={menu}
          onClick={() => {
            setMenu(3);
          }}
          whileHover={{ backgroundColor: "#a8a7a7" }}
        >
          강의 평가
        </Notice>
      </NoticeTab>
      <ListTab>{menuList[menu]}</ListTab>
    </BarWrapper>
  );
}
