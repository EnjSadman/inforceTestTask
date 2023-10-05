const URL = "http://localhost:3000/";

export async function fetcher(modifier = "") {
  const result = (await fetch(URL + modifier)).json();

  return result;
}

export async function fetcherPOST(modifier, data) {
  return fetch(URL + modifier,
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function fetcherDelete(modifier, id) {
  console.log(URL + modifier + id);
  return fetch(URL + modifier + id,
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}