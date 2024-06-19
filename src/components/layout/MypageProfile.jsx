import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { client } from "../../../libs/supabase";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useNavigate, useParams } from "react-router-dom";
import SportsTag from "../SportTag";

const H = styled.h2`
  margin: 0;
  font-size: var(--font-size-l);
  font-weight: 700;
  /* white-space: nowrap; */
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-m);
  }
`;

const Div = styled.div`
  align-self: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
`;
const B = styled.span`
  font-size: var(--font-size-m);
  position: relative;
  display: inline-block;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
const ProfileWrapper = styled.section`
  display: flex;
  width: 90%;
  max-width: 1000px;
  margin: var(--padding-base) auto 0;
  flex-direction: row;
  font-family: inherit;
`;
const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: var(--gap-3xs);
  }
`;
const IntroduceBox = styled.div`
  position: relative;
  flex: 1;
  border-radius: var(--br-mini);
  border: 1px solid var(--color-blue-main);
  display: flex;
  padding: var(--padding-xs) var(--padding-13xl);
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const ImageBox = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 8px 0;
  @media screen and (max-width: 768px) {
    height: 60px;
    width: 60px;
  }
`;
const FileForm = styled.form`
  width: 120px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
`;
const FileName = styled.input`
  width: 100%;
  font-size: var(--font-size-s);
  padding: 2px 4px;
`;
const FileInput = styled.input`
  display: none;
`;
const FileLabel = styled.label`
  background-color: #eee;
  border-radius: var(--br-8xs);
  padding: 2px 8px;
  border: 1px solid var(--color-black);
  font-size: var(--font-size-s);
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: var(--color-skyblue-main);
  }
`;
const FileButton = styled.div`
  background-color: #eee;
  border-radius: var(--br-8xs);
  padding: 2px 8px;
  border: 1px solid black;
  font-size: var(--font-size-s);
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: var(--color-skyblue-main);
  }
`;

const IntroduceContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    flex: 1;
    gap: var(--gap-5xs);
    flex-wrap: wrap;
  }
`;
const Introduce = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  flex-wrap: wrap;
`;
const BioForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Bio = styled.textarea`
  flex: 1;
  min-height: 60px;
  resize: none;
  align-self: center;
  flex-wrap: wrap;
  border: none;
  background-color: #eee;
  padding: 8px;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
`;

const BioButtion = styled.div`
  display: flex;
  cursor: pointer;
  width: 50px;
  height: 100%;
  border: none;
  background-color: var(--color-blue-main);
  border-radius: var(--br-8xs);
  color: white;
  justify-content: center;
  align-items: center;
`;
const Interest = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  color: var(--main-blue);
`;
const SportTagParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;

const SportTag = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  line-height: 20px;
  font-family: inherit;
  color: inherit;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  padding: var(--padding-9xs) var(--padding-3xs);
  background-color: ${(props) => props.bgcolor};
  border-radius: var(--br-mini);
  overflow: hidden;
  &:hover {
    border: 2px solid ${(props) => props.color};
    box-shadow: 1px 1px 1px var(--color-gray);
  }
  @media screen and (max-width: 768px) {
    padding: 1px var(--padding-5xs);
    font-size: var(--font-size-s);
  }
`;
const CountBox = styled.div`
  border-radius: var(--br-mini);
  border: 1px solid var(--color-blue-main);
  background-color: var(--color-sand-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-base);
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    padding: var(--padding-5xs) var(--padding-base);
    flex-direction: row;
    font-size: var(--font-size-s);
    justify-content: space-around;
    flex-wrap: wrap;
    border-radius: var(--br-3xs);
  }
`;
const CountItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    gap: var(--gap-9xs);
  }
`;
const FrameItem = styled.img`
  height: 20px;
  width: 20px;
  position: relative;
`;
const B1 = styled(B)`
  min-width: 48px;
  @media screen and (max-width: 768px) {
    min-width: 32px;
  }
`;

export default function MypageProfile({ count }) {
  const navigate = useNavigate();
  const { id: url_id } = useParams();
  /* 회원 정보 불러오기 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  // useEffect(() => {
  //   if (
  //     !loggedInUser ||
  //     !loggedInUserProfile ||
  //     loggedInUserProfile.id != url_id
  //   ) {
  //     navigate("/login");
  //   }
  // }, []);

  const [avatarFile, setAvatarFile] = useState(null);
  const [fileName, setFileName] = useState("-");

  /* 스포츠 불러오기 */
  const [sport, setSport] = useState(null);
  const getSport = async () => {
    const { data, error } = await client
      .from("SPORT")
      .select("*")
      .eq("id", loggedInUserProfile.favoriteSports);
    if (data) {
      setSport(data[0]);
    }
  };

  useEffect(() => {
    getSport();
  }, []);

  /* 프로필 변경 */
  const uploadFile = async () => {
    // db에 avatar 이미지 파일을 저장
    if (!avatarFile) {
      alert("파일을 선택해주세요.");
      return;
    }
    const filePath = `${loggedInUser.id}-${new Date().getTime()}`;
    // 저장하는 파일명을 user_id로 해서 주인을 구분하고
    // 동일한 파일명을 사용시 변경을 인지하지 못해 page가 rendering되지 않는 문제를 해결하기 위해 뒤에 시간 값을 추가
    console.log("filePath", filePath);
    // 기존의 avatar가 존재할 경우 삭제
    if (loggedInUserProfile.avatar_url) {
      const oldPath = loggedInUserProfile.avatar_url.replace(
        import.meta.env.VITE_STORE_URL + "avatar/",
        ""
      );
      const { data: deleteData, error: deleteError } = await client.storage
        .from("avatar")
        .remove([oldPath]);
      if (deleteError) {
        console.error("Error deleting file:", deleteError);
        return;
      }
      console.log("File deleted successfully:", deleteData);
    }

    // upload
    const { data, error } = await client.storage
      .from("avatar")
      .upload(filePath, avatarFile, {
        cacheControl: "no-cache, no-store, must-revalidate",
        upsert: true,
      });
    const {
      data: { publicUrl },
    } = await client.storage.from("avatar").getPublicUrl(filePath);

    updateUserAvatar(publicUrl);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      console.log("file uploaded");
    }
  };

  const updateUserAvatar = async (url) => {
    // user_profile의 avatar_url을 변경된 url로 업데이트
    const { data, error } = await client
      .from("USER_PROFILE")
      .update({ avatar_url: url })
      .eq("user_id", loggedInUser.id)
      .select();
    if (error) {
      console.log(error);
    } else {
      setLoggedInUserProfile(data[0]);
    }
  };

  const handleImage = (e) => {
    //선택한 파일 정보를 저장
    console.log(e.target.files[0]);
    const fileName = e.target.files[0];
    setAvatarFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  /* 자기소개 변경 */
  const [bio, setBio] = useState(loggedInUserProfile.bio);

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const updateBio = async (e) => {
    const { data, error } = await client
      .from("USER_PROFILE")
      .update({ bio: bio })
      .eq("user_id", loggedInUser.id)
      .select();
    console.log("update", data[0]);
    setLoggedInUserProfile(data[0]);
  };

  // console.log("user", loggedInUserProfile);
  return (
    loggedInUser && (
      <ProfileWrapper>
        <ProfileBox>
          <IntroduceBox>
            <ImageBox>
              <ProfileImage
                loading="lazy"
                alt=""
                src={`${loggedInUserProfile.avatar_url}`}
              />
              {loggedInUserProfile.id == url_id ? (
                <FileForm action={"/mypage/" + loggedInUserProfile.id}>
                  <FileName type="text" value={fileName} disabled />
                  <FileInput
                    type="file"
                    accept="image/jpeg, image/png"
                    name="input_avatar"
                    onChange={handleImage}
                    id="fileinput"
                  />
                  <Row>
                    <FileLabel htmlFor="fileinput">사진 업로드</FileLabel>
                    <FileButton onClick={uploadFile}>변경</FileButton>
                  </Row>
                </FileForm>
              ) : null}
            </ImageBox>
            <IntroduceContents>
              <Introduce>
                <H>{loggedInUserProfile.user_nickname}</H>
                {loggedInUserProfile.id == url_id ? (
                  <BioForm
                    onSubmit={updateBio}
                    action={"/mypage/" + loggedInUserProfile.id}
                  >
                    <Bio value={bio} onChange={handleChange}></Bio>
                    <BioButtion onClick={updateBio}>수정</BioButtion>
                  </BioForm>
                ) : (
                  <BioForm>
                    <Bio value={bio} disabled />
                  </BioForm>
                )}
              </Introduce>
              <Interest>
                <B>관심종목</B>
                <SportTagParent>
                  {sport != null ? <SportsTag sport={sport} /> : "..."}
                </SportTagParent>
              </Interest>
            </IntroduceContents>
          </IntroduceBox>
          <CountBox>
            <CountItem>
              <FrameItem loading="lazy" alt="like" src="/icon/like.svg" />
              <B1>좋아요</B1>
              <Div>{count.countLikes}개</Div>
            </CountItem>
            <CountItem>
              <FrameItem loading="lazy" alt="review" src="/icon/edit.svg" />
              <B1>후기</B1>
              <Div>{count.countReviews}개</Div>
            </CountItem>
            <CountItem>
              <FrameItem loading="lazy" alt="matching" src="/icon/smile.svg" />
              <B1>매칭</B1>
              <Div>{count.countMatches}개</Div>
            </CountItem>
          </CountBox>
        </ProfileBox>
      </ProfileWrapper>
    )
  );
}
