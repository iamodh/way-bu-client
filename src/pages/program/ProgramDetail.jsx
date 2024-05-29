import { useOutletContext } from "react-router-dom";

export default function ProgramDetail() {
  const { program } = useOutletContext();
  return (
    <>
      {program[0].detail_images.length === 0
        ? "아직 없습니다."
        : program[0].detail_images.map((imgUrl) => (
            <img style={{ width: "100%", margin: "-2px 0" }} src={imgUrl} />
          ))}
    </>
  );
}
