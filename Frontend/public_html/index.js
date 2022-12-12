//Fonction pour se connecter
function handleLogin() {
    //Déclaration des variables
    var data = new FormData();
    let username = document.getElementById('usernameForm')
    let password = document.getElementById('passwordForm')

    //Récupération des valeurs passés dans le formulaire de connexion
    data.append('username', username.value);
    data.append('password', password.value);

    //header de la requête
    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/login/',
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response);
            if (response.status === 200) {
                console.log('cc ça marche');
                window.localStorage['token'] = JSON.stringify(response.data);
                window.location.href = "HomePage.html"
            }

        })
        .catch(function (error) {
            console.log(error);
        });

}

//Fonction pour les requêtes de type GET (Afficher)
function handleclickOne(route) {
    let data = '';
    let token = JSON.parse(window.localStorage['token']);
    console.log(token);
    console.log(token['access']);

    let config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/' + route,
        headers: {
            'Authorization': 'Bearer ' + token['access']
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            document.getElementById('image').src = response.data.image;
            document.getElementById('text').innerHTML = response.data.content;
            document.getElementById('ID').innerHTML = "ID : " + response.data.url.split('/')[5];

        })
        .catch(function (error) {
            console.log(error);
        });

}

function handleclickAll() {
    let token = JSON.parse(window.localStorage['token']);

    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/posts/',
        headers: {
            'Authorization': 'Bearer ' + token['access']
        },
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            let container = document.getElementById('AllImages');
            response.data.forEach(el => {
                    let img = document.createElement("img");
                    let text = document.createElement("text");
                    let id = document.createElement("h3");
                    let date = document.createElement('h3')
                    img.classList.add("toto");
                    img.src = el.image;
                    text.innerHTML = el.content;
                    id.innerHTML = "ID : " + el.url.split('/')[5];
                    date.innerHTML = el.date;
                    container.appendChild(id);
                    container.appendChild(img);
                    container.appendChild(text);
                    container.appendChild(date);

                }
            );


        })
        .catch(function (error) {
            console.log(error);
        });

}


//Fonction pour les requêtes de type POST (Ajouter)
async function handleclickPost(route) {
    let token = JSON.parse(window.localStorage['token']);
    let formData = new FormData();
    inp = document.getElementById('image')
    let file = inp.files[0];

    formData.append("file", file);
    formData.append("content", document.getElementById('commentaire').value);

    const ctrl = new AbortController()    // timeout
    setTimeout(() => ctrl.abort(), 5000);

    try {
        let r = await fetch('http://127.0.0.1:8000/post/',
            {
                method: "POST", body: formData, signal: ctrl.signal, headers: {
                    'Authorization': 'Bearer ' + token['access']
                }
            });
        console.log('HTTP response code:', r.status);
    } catch (e) {
        console.log('Huston we have problem...:', e);
    }

}

//Fonction pour les requêtes de type PUT (Modifier)
function handleclickPut(route) {
    let url = "http://localhost:3000/" + route;

    axios.put(url, arrayDataName)
        .then((response) => {
            document.getElementById("image").src = response.data[0].url;
            docu
        })
        .catch((error) => console.log(error))
}