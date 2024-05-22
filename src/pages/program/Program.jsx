import { styled } from "styled-components";

import SearchContainer from "./components/SearchContainer";
import FilterContainer from "./components/FilterContainer";

// export default function Program() {
//   const { isLoading, data } = useQuery(["programs"], getPrograms);
//   return <>{isLoading ? "Loading..." : <ul>{JSON.stringify(data)}</ul>}</>;
// }

const Wrapper = styled.div``;

export default function Program() {
  const { isLoading, data } = useQuery(["programs"], getPrograms);
  return <>{isLoading ? "Loading..." : <ul>{JSON.stringify(data)}</ul>}</>;
}
