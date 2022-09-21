import ReactPlayer from "react-player/lazy";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { VideoAtom } from "../atom";
import Controller from "./Controller";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";

const Splayer = styled(ReactPlayer)`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  /* visibility: ${(props) =>
    props.first ? "hidden" : "visible"}; //props 활용 */
`;

const Clicker = styled.span`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
const CControl = styled.span`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
export default function Player() {
  const videoRef = useRef(null); //props로 컨트롤러로 슉 넘겨
  const videoVal = useRecoilValue(VideoAtom);
  const setVideoVal = useSetRecoilState(VideoAtom);
  const [controlOn, setControl] = useState(false);
  const cOnHandler = () => {
    setControl(true);
  };
  const cOffHandler = () => {
    setControl(false);
  };
  return (
    <CControl onMouseEnter={cOnHandler} onMouseLeave={cOffHandler}>
      <Clicker
        onClick={() => {
          setVideoVal({ ...videoVal, playing: !videoVal.playing });
        }}
      >
        <Splayer
          ref={videoRef}
          url={
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
          playing={videoVal.playing}
          muted={videoVal.muted}
          controls={false} // 플레이어 컨트롤 노출 여부
          // light={false} // 플레이어 모드
          pip={videoVal.pip} // pip 모드 설정 여부
          poster={
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          } // 플레이어 초기 포스터 사진
          // playing={playing} // true = 재생중 / false = 멈춤
          // controls={false} // 기본 컨트롤러 사용 x
          loop={false} // 반복안함
          volume={videoVal.volume} // 소리조절 기능
          playbackRate={videoVal.playbackRate} // 배속기능
          // onProgress={progressHandler} // 재생 및 로드된 시점을 반환
          onEnded={() => {}}
          width="100%"
          height="100%"
        />
      </Clicker>
      <motion.div animate={{ opacity: controlOn ? 1 : 0 }}>
        <Controller video={videoRef} />
      </motion.div>
    </CControl>
  );
}
