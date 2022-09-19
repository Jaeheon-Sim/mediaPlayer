import { motion } from "framer-motion";
import styled from "styled-components";

const Catalog = styled(motion.li)`
  width: 100%;
  height: 100%;
  border: 1px solid;
`;

export default function List() {
  // 강의 목록을 누르면 비디오 url을 바꾸는 형식으로 진행해야할것같음 라우터 없이 -> 성능 업그레이드
  // api요청 -> 받아옴 -> state에 저장 -> video url 변경 (초기화)
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {list.map((e) => {
        return <Catalog key={e}>{e}</Catalog>;
      })}
    </>
  );
}
