import { atom } from "recoil";

export const VideoAtom = atom({
  key: "isVideo",
  default: {
    playing: false, // 재생중인지
    muted: false, // 음소거인지
    controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
    pip: false, //pipmode
    volume: 0.5, // 볼륨크기
    playbackRate: 1.0, // 배속
    played: 0, // 재생의 정도 (value)
    seeking: false, // 재생바를 움직이고 있는지
    duration: 0, // 전체 시간
    full: false, // 전체모드
    cc: false,
  },
  storage: sessionStorage,
});

export const RateAtom = atom({
  key: "isRate",
  default: false,
});
export const CCAtom = atom({
  key: "isCC",
  default: false,
});

// cc 배속 on 아톰 만들어서 컨트롤바 내려가면 없어지게 해야함
