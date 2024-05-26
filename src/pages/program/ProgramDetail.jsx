import { useOutletContext } from "react-router-dom";

export default function ProgramDetail() {
  const { program } = useOutletContext();
  return (
    <>
      <img style={{ width: "100%" }} src={program[0].details} />
    </>
  );
}
