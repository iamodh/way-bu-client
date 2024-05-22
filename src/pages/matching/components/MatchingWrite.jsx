import styled from "styled-components";
import GroupComponent from "./GroupComponent";

const MainContentChild = styled.div`
  width: 1440px;
  height: 921px;
  position: relative;
  background-color: var(--color-whitesmoke);
  display: none;
  max-width: 100%;
`;
const FrameChild = styled.div`
  height: 147px;
  width: 1282px;
  position: relative;
  background-color: var(--color-gainsboro-200);
  display: none;
  max-width: 100%;
`;
const TrendingEventsContentChild = styled.div`
  height: 100px;
  width: 100px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: none;
`;
const TrendingEventsContentItem = styled.div`
  height: 129px;
  width: 429px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: none;
  max-width: 100%;
`;
const TrendingEventDetailsChild = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 28.5px;
  height: 20px;
  z-index: 2;
`;
const TrendingEventDetailsItem = styled.img`
  position: absolute;
  top: 0px;
  left: 6.5px;
  width: 34.9px;
  height: 29.7px;
  z-index: 3;
`;
const TrendingEventDetails = styled.div`
  width: 41.4px;
  height: 29.7px;
  position: relative;
`;
const TrendingEventsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-4xl) 0px 0px;
`;
const Div5 = styled.div`
  position: relative;
  font-size: var(--font-size-11xl);
  line-height: 36.67px;
  font-family: var(--m);
  color: var(--black);
  text-align: left;
  white-space: nowrap;
  @media screen and (max-width: 1050px) {
    font-size: var(--xl-bold-size);
  }
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lg);
  }
`;
const TrendingEventsContent = styled.div`
  flex: 1;
  background-color: var(--color-whitesmoke);
  border: 1px solid var(--black);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--padding-13xl) 249px var(--padding-base) 343px;
  max-width: 100%;
  gap: var(--gap-xl);
  z-index: 1;
  @media screen and (max-width: 1200px) {
    padding-left: 171px;
    padding-right: 124px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 1050px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 750px) {
    padding-left: 85px;
    padding-right: 62px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: var(--padding-xl);
    padding-right: var(--padding-xl);
    box-sizing: border-box;
  }
`;
const RectangleParent = styled.section`
  width: 1282px;
  background-color: var(--color-gainsboro-200);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-3xl) var(--padding-3xs) var(--padding-2xl);
  box-sizing: border-box;
  max-width: 100%;
  z-index: 1;
`;
const SurfingEventChild = styled.div`
  height: 85px;
  width: 1282px;
  position: relative;
  background-color: var(--color-gainsboro-200);
  display: none;
  max-width: 100%;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: var(--m);
  font-size: var(--font-size-11xl);
  background-color: transparent;
  height: 36px;
  flex: 1;
  position: relative;
  color: var(--black);
  text-align: left;
  display: inline-block;
  min-width: 45px;
  padding: 0;
  @media screen and (max-width: 1050px) {
    font-size: var(--xl-bold-size);
  }
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lg);
  }
`;
const SurfingEventInfo = styled.div`
  width: 111px;
  border-radius: var(--br-mini);
  background-color: var(--white);
  border: 1px solid var(--black);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) 17px;
  z-index: 2;
`;
const SurfingEvent = styled.div`
  align-self: stretch;
  background-color: var(--color-gainsboro-200);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-smi) var(--padding-22xl) var(--padding-base);
  box-sizing: border-box;
  max-width: 100%;
  z-index: 1;
`;
const Image9Icon = styled.img`
  height: 117px;
  flex: 1;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  object-fit: cover;
  z-index: 1;
`;
const SurfingImage = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-6xs) 0px var(--padding-7xs);
  box-sizing: border-box;
  max-width: 100%;
`;
const SurfingEventParent = styled.section`
  width: 1282px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px var(--padding-6xs);
  box-sizing: border-box;
  gap: 13px;
  max-width: 100%;
`;
const EventItemChild = styled.textarea`
  border: none;
  background-color: var(--white);
  height: 195px;
  width: auto;
  outline: none;
  flex: 1;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: var(--br-xl);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 51.5px 35.19999999999963px;
  box-sizing: border-box;
  font-family: var(--m);
  font-size: var(--font-size-11xl);
  color: var(--black);
  min-width: 400px;
  max-width: 100%;
  z-index: 1;
  @media screen and (max-width: 1200px) {
    min-width: 100%;
  }
`;
const EventItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-18xl-8);
  max-width: 100%;
  @media screen and (max-width: 750px) {
    gap: var(--gap-lgi);
  }
`;
const EventList = styled.section`
  width: 1280px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-8xs) var(--padding-10xs);
  box-sizing: border-box;
  max-width: 100%;
`;
const EventListTwo = styled.section`
  width: 1280px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-8xs);
  box-sizing: border-box;
  max-width: 100%;
`;
const MainContent = styled.main`
  width: 100%;
  margin: 0 !important;
  position: absolute;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: var(--color-whitesmoke);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-29xl) 70px var(--padding-26xl);
  box-sizing: border-box;
  gap: 22px;
  max-width: 100%;
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-16xl);
    padding-right: var(--padding-16xl);
    box-sizing: border-box;
  }
`;
const Div6 = styled.div`
  position: relative;
  font-size: var(--font-size-11xl);
  line-height: 36.67px;
  font-family: var(--m);
  color: var(--black);
  text-align: left;
  display: inline-block;
  min-width: 79px;
  @media screen and (max-width: 1050px) {
    font-size: var(--xl-bold-size);
  }
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lg);
  }
`;
const Wrapper = styled.div`
  border-radius: var(--br-mini);
  background-color: var(--white);
  border: 1px solid var(--black);
  overflow: hidden;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-5xs) var(--padding-mini);
  z-index: 2;
`;
const FrameItem = styled.div`
  height: 201px;
  width: 260px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const FrameParent = styled.div`
  width: 796px;
  border-radius: var(--br-mini);
  background-color: var(--white);
  border: 1px solid #561414;
  box-sizing: border-box;
  overflow: hidden;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-5xs) var(--padding-lg);
  gap: var(--gap-7xs);
  max-width: 100%;
  z-index: 3;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;
const Container = styled.div`
  border-radius: var(--br-mini);
  background-color: var(--white);
  border: 1px solid var(--black);
  overflow: hidden;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-5xs) var(--padding-mini);
  z-index: 4;
`;
const X = styled.div`
  width: 25px;
  position: relative;
  font-size: var(--font-size-11xl);
  font-family: var(--m);
  color: var(--black);
  text-align: left;
  display: inline-block;
  flex-shrink: 0;
  @media screen and (max-width: 1050px) {
    font-size: var(--xl-bold-size);
  }
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lg);
  }
`;
const CloseButtonArea = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0px 0px var(--padding-5xs);
`;
const B = styled.b`
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--m);
  color: var(--black);
  text-align: center;
  min-width: 48px;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const Frame = styled.div`
  align-self: stretch;
  border-radius: var(--br-mini);
  border: 3px solid var(--main-blue);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) var(--padding-25xl);
`;
const B1 = styled.b`
  width: 48px;
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--m);
  color: var(--black);
  text-align: center;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const CapacityDetails = styled.button`
  cursor: pointer;
  border: 3px solid var(--main-blue);
  padding: var(--padding-5xs) var(--padding-25xl);
  background-color: transparent;
  align-self: stretch;
  border-radius: var(--br-mini);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-dodgerblue-200);
    border: 3px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
`;
const B2 = styled.b`
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--m);
  color: var(--black);
  text-align: center;
  min-width: 67px;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const Wrapper1 = styled.div`
  align-self: stretch;
  border-radius: var(--br-mini);
  border: 3px solid var(--main-blue);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) var(--padding-15xl);
`;
const EventCapacity = styled.div`
  width: 142px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-lgi);
`;
const Div7 = styled.div`
  width: 274px;
  position: relative;
  font-size: var(--m-size);
  font-family: var(--m);
  color: var(--gray);
  text-align: center;
  display: inline-block;
  flex-shrink: 0;
`;
const Input1 = styled.div`
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--gray);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-sm) var(--padding-base);
  max-width: 100%;
`;
const InputWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px var(--padding-sm) var(--padding-2xs);
  box-sizing: border-box;
  max-width: 100%;
`;
const B3 = styled.b`
  position: relative;
  font-size: var(--l-bold-size);
  display: inline-block;
  font-family: var(--m);
  color: var(--gray);
  text-align: left;
  min-width: 60px;
  @media screen and (max-width: 450px) {
    font-size: var(--m-size);
  }
`;
const SportTag = styled.div`
  margin-top: -2.5px;
  margin-left: -80px;
  width: 72px;
  border-radius: var(--br-3xs);
  border: 1px solid var(--gray);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-11xs) var(--padding-8xs);
  debug_commit: 1de1738;
`;
const SportTag1 = styled.div`
  margin-top: -2.5px;
  width: 72px;
  border-radius: var(--br-3xs);
  border: 1px solid var(--gray);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-11xs) var(--padding-8xs);
  debug_commit: 1de1738;
`;
const B4 = styled.b`
  position: relative;
  font-size: var(--l-bold-size);
  display: inline-block;
  font-family: var(--m);
  color: var(--gray);
  text-align: left;
  min-width: 40px;
  @media screen and (max-width: 450px) {
    font-size: var(--m-size);
  }
`;
const SportTag2 = styled.div`
  margin-top: -2.5px;
  width: 53px;
  border-radius: var(--br-3xs);
  border: 1px solid var(--gray);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-11xs) var(--padding-8xs) var(--padding-11xs)
    var(--padding-7xs);
  debug_commit: 1de1738;
`;
const GroupTag = styled.div`
  height: 27px;
  width: 408px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-27xl);
  box-sizing: border-box;
  gap: var(--gap-5xs);
  max-width: 100%;
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-4xl);
    padding-right: var(--padding-4xl);
    box-sizing: border-box;
  }
`;
const GroupTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-28xl) var(--padding-8xs);
  box-sizing: border-box;
  max-width: 100%;
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-4xl);
    padding-right: var(--padding-4xl);
    box-sizing: border-box;
  }
`;
const Div8 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--m);
  color: var(--main-blue);
  text-align: left;
  display: inline-block;
  min-width: 32px;
`;
const VectorIcon2 = styled.img`
  width: 16px;
  height: 12px;
  position: relative;
`;
const VectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-9xs-5) 0px 0px;
`;
const Group = styled.div`
  border-radius: var(--br-3xs);
  border: 1px solid var(--main-blue);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-7xs) var(--padding-13xl);
  gap: var(--gap-7xs);
`;
const PublicBtn = styled.div`
  border-radius: var(--br-3xs);
  background-color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 6;
`;
const PublicBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-4xs) 0px 0px;
`;
const Wrapper2 = styled.div`
  flex: 1;
  border-radius: var(--br-mini);
  border: 3px solid var(--main-blue);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) var(--padding-15xl);
  min-width: 67px;
`;
const FrameParent1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 28px;
  min-width: 188px;
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
  }
`;
const FrameParent2 = styled.div`
  width: 461px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 51px;
  max-width: 100%;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 450px) {
    gap: var(--gap-6xl);
  }
`;
const FrameInner = styled.div`
  align-self: stretch;
  height: 54px;
  border-radius: var(--br-8xs);
  border: 1px solid #aaa;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
`;
const FrameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xl);
  max-width: 100%;
`;
const FrameWrapper = styled.div`
  width: 565px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-2xs);
  box-sizing: border-box;
  max-width: 100%;
`;
const Div9 = styled.div`
  height: 39px;
  flex: 1;
  position: relative;
  font-size: var(--l-bold-size);
  font-family: var(--m);
  color: var(--black);
  white-space: pre-wrap;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 450px) {
    font-size: var(--m-size);
  }
`;
const Wrapper3 = styled.div`
  width: 93px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px var(--padding-8xs);
  box-sizing: border-box;
`;
const Checkid = styled.div`
  height: 16px;
  width: 16px;
  position: relative;
  background-color: var(--color-gainsboro-200);
  display: none;
`;
const Remidbox = styled.div`
  width: 16px;
  height: 16px;
  background-color: var(--color-gainsboro-200);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const RemidboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-mini) var(--padding-lg) 0px 0px;
`;
const Div10 = styled.div`
  align-self: stretch;
  position: relative;
  font-size: var(--l-bold-size);
  font-family: var(--m);
  color: var(--black);
  text-align: left;
  @media screen and (max-width: 450px) {
    font-size: var(--m-size);
  }
`;
const Wrapper4 = styled.div`
  width: 89px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-xs) 0px 0px;
  box-sizing: border-box;
`;
const Remidbox1 = styled.div`
  width: 16px;
  height: 16px;
  background-color: var(--color-gainsboro-200);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 1;
`;
const RemidboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-base) var(--padding-lg) 0px 0px;
`;
const Wrapper5 = styled.div`
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-xs) var(--padding-6xs) 0px 0px;
  box-sizing: border-box;
`;
const Input2 = styled.div`
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--gray);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-sm) var(--padding-base);
  min-width: 214px;
  white-space: nowrap;
  max-width: 100%;
`;
const FrameParent3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
  row-gap: 20px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;
const FrameWrapper1 = styled.div`
  width: 567px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-smi);
  box-sizing: border-box;
  max-width: 100%;
`;
const FrameGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  min-width: 389px;
  max-width: 100%;
  @media screen and (max-width: 1050px) {
    min-width: 100%;
  }
`;
const EventDescription = styled.div`
  width: 756px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-mini);
  max-width: 100%;
`;
const Textbox = styled.textarea`
  border: 1px solid var(--color-darkgray-100);
  background-color: transparent;
  height: 290px;
  width: auto;
  outline: none;
  flex: 1;
  border-radius: 25px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 133px 53.5px;
  font-family: var(--m);
  font-size: var(--l-bold-size);
  color: var(--color-darkgray-100);
  max-width: 100%;
`;
const TextboxWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0px var(--padding-2xs) 0px 0px;
  box-sizing: border-box;
  max-width: 100%;
`;
const EventDescriptionParent = styled.div`
  width: 773px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 33px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    gap: var(--gap-base);
  }
`;
const Div11 = styled.div`
  position: relative;
  font-size: var(--font-size-6xl);
  font-weight: 500;
  font-family: var(--m);
  color: var(--white);
  text-align: center;
  display: inline-block;
  min-width: 69px;
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: var(--l-bold-size);
  }
`;
const BtnReturn = styled.button`
  cursor: pointer;
  border: none;
  padding: 17.5px 61px;
  background-color: var(--main-blue);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-dodgerblue-100);
  }
`;
const ActionButtonArea = styled.div`
  width: 761px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
`;
const Div12 = styled.div`
  width: 944px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background-color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-15xl) var(--padding-27xl) var(--padding-13xl) 83px;
  box-sizing: border-box;
  gap: var(--gap-mid);
  max-width: 100%;
  z-index: 5;
  @media screen and (max-width: 1050px) {
    padding: var(--padding-3xl) var(--padding-4xl) var(--padding-2xl)
      var(--padding-22xl);
    box-sizing: border-box;
  }
  @media screen and (max-width: 750px) {
    padding-top: var(--padding-xl);
    padding-bottom: var(--padding-xl);
    box-sizing: border-box;
  }
`;
const MatchingWriteRoot = styled.form`
  margin: 0;
  width: 1440px;
  background-color: var(--white);
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: var(--padding-13xl) 239px var(--padding-26xl);
  box-sizing: border-box;
  position: relative;
  line-height: normal;
  letter-spacing: normal;
  @media screen and (max-width: 1050px) {
    height: auto;
  }
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-100xl);
    padding-right: var(--padding-100xl);
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: var(--padding-xl);
    padding-right: var(--padding-xl);
    box-sizing: border-box;
  }
`;

const MatchingWrite = () => {
  return (
    <MatchingWriteRoot>
      <MainContent>
        <MainContentChild />
        <EventList>
          <EventItem>
            <EventItemChild
              placeholder={`종목
아이콘`}
              rows={10}
              cols={31}
            />
            <GroupComponent />
          </EventItem>
        </EventList>
        <EventListTwo>
          <EventItem>
            <GroupComponent propPadding="var(--padding-12xl) var(--padding-4xs) var(--padding-12xl) 11.4px" />
            <GroupComponent propPadding="var(--padding-12xl) var(--padding-3xs)" />
          </EventItem>
        </EventListTwo>
      </MainContent>
      <Wrapper>
        <Div6>#서핑</Div6>
      </Wrapper>
      <FrameParent>
        <FrameItem />
        <Div6>#서핑</Div6>
      </FrameParent>
      <Container>
        <Div6>#서핑</Div6>
      </Container>
      <Div12>
        <CloseButtonArea>
          <X>X</X>
        </CloseButtonArea>
        <EventDescriptionParent>
          <EventDescription>
            <EventCapacity>
              <Frame>
                <B>제목</B>
              </Frame>
              <Frame>
                <B1>위치</B1>
              </Frame>
              <Frame>
                <B>종목</B>
              </Frame>
              <Frame>
                <B1>일정</B1>
              </Frame>
              <CapacityDetails>
                <B1>인원</B1>
              </CapacityDetails>
              <Wrapper1>
                <B2>준비물</B2>
              </Wrapper1>
            </EventCapacity>
            <FrameGroup>
              <InputWrapper>
                <Input1>
                  <Div7>제목을 입력해주세요.</Div7>
                </Input1>
              </InputWrapper>
              <GroupTagWrapper>
                <GroupTag>
                  <SportTag>
                    <B3>광안리</B3>
                  </SportTag>
                  <SportTag1>
                    <B3>다대포</B3>
                  </SportTag1>
                  <SportTag2>
                    <B4>송도</B4>
                  </SportTag2>
                  <SportTag2>
                    <B4>송정</B4>
                  </SportTag2>
                  <SportTag2>
                    <B4>일광</B4>
                  </SportTag2>
                  <SportTag2>
                    <B4>임랑</B4>
                  </SportTag2>
                  <SportTag1>
                    <B3>해운대</B3>
                  </SportTag1>
                </GroupTag>
              </GroupTagWrapper>
              <FrameWrapper>
                <FrameContainer>
                  <FrameParent2>
                    <PublicBtnWrapper>
                      <PublicBtn>
                        <Group>
                          <Div8>선택</Div8>
                          <VectorWrapper>
                            <VectorIcon2 alt="" src="/vector1.svg" />
                          </VectorWrapper>
                        </Group>
                      </PublicBtn>
                    </PublicBtnWrapper>
                    <FrameParent1>
                      <Wrapper2>
                        <B2>난이도</B2>
                      </Wrapper2>
                      <PublicBtnWrapper>
                        <PublicBtn>
                          <Group>
                            <Div8>선택</Div8>
                            <VectorWrapper>
                              <VectorIcon2 alt="" src="/vector1.svg" />
                            </VectorWrapper>
                          </Group>
                        </PublicBtn>
                      </PublicBtnWrapper>
                    </FrameParent1>
                  </FrameParent2>
                  <FrameInner />
                </FrameContainer>
              </FrameWrapper>
              <Wrapper3>
                <Div9>- 4 +</Div9>
              </Wrapper3>
              <FrameWrapper1>
                <FrameParent3>
                  <RemidboxWrapper>
                    <Remidbox>
                      <Checkid />
                    </Remidbox>
                  </RemidboxWrapper>
                  <Wrapper4>
                    <Div10>필요없음</Div10>
                  </Wrapper4>
                  <RemidboxContainer>
                    <Remidbox1>
                      <Checkid />
                    </Remidbox1>
                  </RemidboxContainer>
                  <Wrapper5>
                    <Div10>필요</Div10>
                  </Wrapper5>
                  <Input2>
                    <Div7>필요 시 준비물 입력</Div7>
                  </Input2>
                </FrameParent3>
              </FrameWrapper1>
            </FrameGroup>
          </EventDescription>
          <TextboxWrapper>
            <Textbox
              placeholder="상세내용을 입력해주세요(가입 조건, 자세한 위치 등)."
              rows={15}
              cols={38}
            />
          </TextboxWrapper>
        </EventDescriptionParent>
        <ActionButtonArea>
          <BtnReturn>
            <Div11>올리기</Div11>
          </BtnReturn>
        </ActionButtonArea>
      </Div12>
    </MatchingWriteRoot>
  );
};

export default MatchingWrite;
