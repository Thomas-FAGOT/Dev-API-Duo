const url = 'https://api.thecatapi.com/v1/images/search';

axios.get(url)
  .then((response) => document.getElementById("image").src = response.data[0].url)
  .catch((error) => console.log(error))

  