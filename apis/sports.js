export function getSports() {
  return fetch(`http://localhost:4000/api/sports`).then((response) =>
    response.json()
  );
}
