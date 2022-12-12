//Fonction pour se connecter
function handleLogin(){
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
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response);
            if(response.status === 200) {
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
function    handleclickOne(route) {
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
        data : data
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

function handleclickAll(){
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
                let img =  document.createElement("img");
                let text =  document.createElement("text");
                let id =  document.createElement("h3");
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
function handleclickPost(route) {
    var FormData = require('form-data');
    var fs = require('fs');
    var data = new FormData();
    data.append('file', fs.createReadStream('/C:/Users/maxim/Downloads/png-transparent-two-checked-flags-racing-flags-auto-racing-racing-flag-miscellaneous-game-flag-png-free-download.png'));
    data.append('content', 'DSJQDOISQDJOSQUDJQOSIDJSQODIJSQODIJSQOIDJQSOIDJSQOIDJSQOIDJQOIDJSQ');

    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/post/',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODQwODg3LCJpYXQiOjE2NzA4MzcyODcsImp0aSI6IjFmYjdjOTMwOTE3NzQxYTE5NDhkOTIzOTg3MTNiMDA1IiwidXNlcl9pZCI6MywidXNlcm5hbWUiOiJUZXN0MiJ9.mSS64Z69W7TZNCCrK1QcCIisUR-8Gsv9sAn0x7q08DM',
            ...data.getHeaders()
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

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