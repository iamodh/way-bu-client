export function getBeach() {
  return fetch(`http://localhost:4000/api/beach`).then((response) =>
    response.json()
  );
}