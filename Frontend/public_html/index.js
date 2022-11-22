function handleclick(route) {
    let url = "http://localhost:3000/" + route;

    axios.get(url)
        .then((response) => document.getElementById("image").src = response.data[0].url)
        .catch((error) => console.log(error))
}

function handleclickPost(route) {
    let url = "http://localhost:3000/" + route;
    let img = document.getElementById("image").src;
    let com = document.getElementById("commentaire").ariaValueMax;
    let arrayDataName = {
        "url": "",
        "date": null,
        "image": img,
        "content": com,
        "user": ""
    }
    
    axios.post(url, arrayDataName)
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
}

function handleclickPut(route) {
    let url = "http://localhost:3000/" + route;

    axios.put(url, arrayDataName)
        .then((response) => {
            document.getElementById("image").src = response.data[0].url;
            docu
        })
        .catch((error) => console.log(error))
}