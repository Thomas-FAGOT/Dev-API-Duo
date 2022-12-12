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
    let config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/' + route + document.getElementById('search_id').value + "/",
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
            document.getElementById('search_date').innerHTML = "Created at : " + response.data.date;

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
                    text.innerHTML = "Comment :     " + el.content;
                    id.innerHTML = "ID : " + el.url.split('/')[5];
                    date.innerHTML = "Created at : " + el.date;
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
    let inp = document.getElementById('file_create')
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
function handleclickDelete() {
    let token = JSON.parse(window.localStorage['token']);
    var data = new FormData();
    data.append('id', document.getElementById('del_id').value);

    var config = {
        method: 'put',
        url: 'http://127.0.0.1:8000/api/del/',
        headers: {
            'Authorization': 'Bearer ' + token['access'],
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}


async function handleModif() {
    let token = JSON.parse(window.localStorage['token']);
    let formData = new FormData();
    inp = document.getElementById('modif_file')
    let file = inp.files[0];

    formData.append("file", file);
    formData.append("content", document.getElementById('modif_comment').value);
    formData.append("id", document.getElementById('id_modif').value);
    const ctrl = new AbortController()    // timeout
    setTimeout(() => ctrl.abort(), 5000);

    try {
        let r = await fetch('http://127.0.0.1:8000/api/modif/post/',
            {
                method: "PUT", body: formData, signal: ctrl.signal, headers: {
                    'Authorization': 'Bearer ' + token['access']
                }
            });
        console.log('HTTP response code:', r.status);
    } catch (e) {
        console.log('Huston we have problem...:', e);
    }

}

function handleRegister() {
    //Déclaration des variables
    let username = document.getElementById('usernameForm')
    let password = document.getElementById('passwordForm')
    let firstname = document.getElementById('firstnameForm')
    let lastname = document.getElementById('lastnameForm')
    let email = document.getElementById('emailForm')
    console.log(username.value)
    console.log(password.value)
    console.log(firstname.value)
    console.log(lastname.value)
    console.log(email.value)



    var data = JSON.stringify({
        "username": username.value,
        "first_name": firstname.value,
        "last_name": lastname.value,
        "email": email.value,
        "password": password.value
    });


    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/register/',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };


    axios(config)
        .then(function (response) {
            window.location.href = "Log-in.html"

            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}


function handleLogout() {
    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/logout/',
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.parse(window.localStorage['token'])
    };


    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    window.localStorage['token'] = null;
    window.location.href = "Log-in.html"

}
