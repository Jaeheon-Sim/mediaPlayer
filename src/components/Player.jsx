import ReactPlayer from "react-player/lazy";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Splayer = styled(ReactPlayer)`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Player() {
  const videoRef = useRef(null);
  return (
    <Splayer
      ref={videoRef}
      url={
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      }
      playing={false} // 자동 재생 on
      muted={true} // 자동 재생 on
      controls={true} // 플레이어 컨트롤 노출 여부
      light={false} // 플레이어 모드
      pip={true} // pip 모드 설정 여부
      poster={
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
      } // 플레이어 초기 포스터 사진
      // playing={playing} // true = 재생중 / false = 멈춤
      // controls={false} // 기본 컨트롤러 사용 x
      // muted={muted} // 음소거인지
      // volume={volume} // 소리조절 기능
      // playbackRate={true} // 배속기능
      // onProgress={progressHandler} // 재생 및 로드된 시점을 반환
      width="100%"
      height="90%"
    />
  );
}
