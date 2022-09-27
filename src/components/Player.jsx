import ReactPlayer from "react-player/lazy";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CCAtom, RateAtom, VideoAtom } from "../atom";
import Controller from "./Controller";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";

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
  position: relative;
`;
const PlayAni = styled(motion.div)`
  position: absolute;
  bottom: 38%;
  right: 42%;
`;
const Icon = styled(FontAwesomeIcon)`
  width: 150px;
  height: 150px;
  color: rgba(0, 0, 0, 0.5);
`;
export default function Player() {
  const videoRef = useRef(null); //props로 컨트롤러로 슉 넘겨
  const videoVal = useRecoilValue(VideoAtom);
  const setVideoVal = useSetRecoilState(VideoAtom);
  const setRateVal = useSetRecoilState(RateAtom);
  const setCCVal = useSetRecoilState(CCAtom);
  const [controlOn, setControl] = useState(false);
  const cOnHandler = () => {
    setControl(true);
  };
  const cOffHandler = () => {
    setControl(false);
    setRateVal(false);
    setCCVal(false);
  };

  const progressHandler = (changeState) => {
    if (!videoVal.seeking) {
      setVideoVal({ ...videoVal, played: changeState.played });
    }
  };

  return (
    <CControl onMouseEnter={cOnHandler} onMouseLeave={cOffHandler}>
      <AnimatePresence>
        <PlayAni
          initial={{ opacity: 0 }}
          animate={{
            opacity: videoVal.playing && controlOn ? 1 : 0,
          }}
          exit={{ opacity: 0 }}
        >
          {!videoVal.playing ? (
            <Icon icon={faCirclePlay} />
          ) : (
            <Icon icon={faCirclePause} />
          )}
        </PlayAni>
      </AnimatePresence>
      {/* {controlOn ? (
        videoVal.playing ? (
          <PlayAni
            initial={{ scale: 0 }}
            animate={{}}
            transition={{
              duration: 0.5,
            }}
          >
            <Icon icon={faCirclePlay} />
          </PlayAni>
        ) : (
          <PlayAni
            initial={{ scale: 0 }}
            whileTap={{
              scale: 1,
              transitionEnd: {
                scale: 0,
              },
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Icon icon={faCirclePause} />
          </PlayAni>
        )
      ) : null} */}
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
          pip={videoVal.pip} // pip 모드 설정 여부
          poster={
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          } // 플레이어 초기 포스터 사진
          // playing={playing} // true = 재생중 / false = 멈춤
          // controls={false} // 기본 컨트롤러 사용 x
          loop={false} // 반복안함
          volume={videoVal.volume} // 소리조절 기능
          playbackRate={videoVal.playbackRate} // 배속기능
          onProgress={progressHandler} // 재생 및 로드된 시점을 반환
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
