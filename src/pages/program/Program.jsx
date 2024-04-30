import { useQuery } from "react-query";
import { getPrograms } from "../../../apis/program";

export default function Program() {
  const { isLoading, data } = useQuery(["programs"], getPrograms);
  return <>{isLoading ? "Loading..." : <ul>{JSON.stringify(data)}</ul>}</>;
}
