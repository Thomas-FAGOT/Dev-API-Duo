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
        url: 'http://127.0.0.1: 8000/login/',
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
function handleclick(route) {
    var data = '';
    var token = window.localStorage['token'];
    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/' + route,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5MTI5ODQxLCJpYXQiOjE2NjkxMDgyNDEsImp0aSI6IjJmY2M2ZGNlYmEyNTQ2ZGY5ZWNmMTY0ODQ0YjkwM2QzIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.13kOd3dzfILFPRwT9Ed5gGc9PqVfPR-3z9BF1pV6DT4'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            var nbImg = response.data.length();
            for (let i = 0; i < nbImg; i++) {
                document.getElementById('image') += '<img id="image" src="'+ response.data.image + '" alt=""> <br>'
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}



//Fonction pour les requêtes de type POST (Ajouter)
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