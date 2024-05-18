export function getPrograms(keyword) {
  return fetch(`http://localhost:4000/api/programs?keyword=${keyword}`).then(
    (response) => response.json()
  );
}
