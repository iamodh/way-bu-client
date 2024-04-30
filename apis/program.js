export function getPrograms() {
  return fetch("http://localhost:4000/api/program").then((response) =>
    response.json()
  );
}
