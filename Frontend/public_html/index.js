function handleclick(route) {
    let url = "http://localhost:3000/" + route;

    axios.get(url)
        .then((response) => document.getElementById("image").src = response.data[0].url)
        .catch((error) => console.log(error))
}