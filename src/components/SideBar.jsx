import { motion } from "framer-motion";
import styled from "styled-components";

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const NoticeTab = styled(motion.div)`
  border-bottom: 1px solid;
  width: 100%;
  height: 2vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Notice = styled(motion.div)`
  width: 25%;
  border: 1px solid;
  text-align: center;
`;

const ListTab = styled(motion.ol)`
  width: 100%;
`;
const List = styled(motion.li)`
  width: 100%;
  border: 1px solid;
`;

export default function SideBar() {
  const list = [1, 2, 3, 4, 5];
  return (
    <BarWrapper>
      <NoticeTab>
        <Notice>A</Notice>
        <Notice>B</Notice>
        <Notice>C</Notice>
        <Notice>C</Notice>
      </NoticeTab>
      <ListTab>
        {list.map((e) => {
          return <List>{e}</List>;
        })}
      </ListTab>
    </BarWrapper>
  );
}
