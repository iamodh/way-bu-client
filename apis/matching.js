export function getMatchings(keyword) {
  return fetch(`http://localhost:4000/api/matchings?keyword=${keyword}`).then(
    (response) => response.json()
  );
}