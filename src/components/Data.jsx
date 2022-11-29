import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  OverlappingAtom,
  QueryListAtom,
  unitInfoAtom,
  UserTokenAtom,
} from "../atom";
import { useEffect, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { STATICURL } from "../static";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 2vh;
  margin-left: 15px;
  height: 98%;
`;

const TitleBox = styled.div`
  font-size: 1.3rem;
`;
const PrepareBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;
const Title = styled.div`
  font-weight: bolder;
`;
const DetailBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 95%;
  min-height: 3vh;
  margin-bottom: 10px;

  padding: 30px 0px 30px 0px;
  flex-direction: column;
`;

const DetailTab = styled.div`
  word-break: break-all;
  margin-left: 0px;
  font-weight: bold;
`;

const Detail = styled.div`
  width: 80%;
  margin-top: 20px;
  margin-left: 10px;
  background-color: #efefef;
  padding: 10px 10px 10px 5px;
  border-radius: 5px;
  font-weight: lighter;
  color: #3c3c3c;
`;

const Icon = styled(FontAwesomeIcon)`
  font-weight: bolder;
  margin-right: 2px;
`;
const PrepareTab = styled.li`
  margin-top: 15px;
  margin-left: 15px;
  color: #494646;
`;

export default function Data() {
  const queryList = useRecoilValue(QueryListAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  const unitInfo = useRecoilValue(unitInfoAtom);
  const accessToken = useRecoilValue(UserTokenAtom);
  const [unitDetail, setUnitDetail] = useState({});

  async function getUnitDetail() {
    try {
      const res = await axios.get(
        `${STATICURL}/front/units/${queryList.unitId}`,
        {
          headers: {
            "X-AUTH-TOKEN": accessToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setUnitDetail(res.data);
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  useEffect(() => {
    getUnitDetail();
  }, [queryList.unitId]);

  return (
    <Wrapper>
      <TitleBox>
        <Title>{unitInfo.title}</Title>
      </TitleBox>
      <DetailBox>
        <DetailTab>강의 목표</DetailTab>
        <PrepareTab>{unitDetail.objective}</PrepareTab>
        <PrepareTab>{unitDetail.objective}</PrepareTab>
        <br />
        <DetailTab>세부 내용</DetailTab>
        <Detail>{unitDetail.description}</Detail>
      </DetailBox>
      <PrepareBox>
        <Title>
          <Icon icon={faCheck} />
          무엇이 필요할까요?
        </Title>
        <Detail>Test....</Detail>
      </PrepareBox>
    </Wrapper>
  );
}
