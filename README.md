||----------------------------------||
||                                  ||
||          PROJET API DUO          ||
||                                  ||
||----------------------------------||

1) Objectifs

La demande du client était la suivant :
 "Création d'un réseau social interne à l'entreprise qui permettrai à mes collaborateurs d'échanger entre eux des images avec du texte.
  Avec les fonctionnalitées suivantes :
  
    -Login/Logout
    -Get all posts
    -Get post
    -Created new post
    -Modify post
    -Delete post
   
  Tout en respectant la RGPD avec le chiffrement des MDP, le tout dans un repo GitHub pour faciliter la mise en production."
  
2) Téchnologies

Pour répondre à la demande du client nous avons choisi d'utiliser les technologies suivantes :
  
  Backend :
  
    -BDD : MongoDB
    -Serveur : Django
    -API REST : Django REST FRAMWORK
  Frontend :
  
    -HTML
    -CSS
    -JS (axios + fetch)
    
3) Installation

Installation du serveur test (sous Windows ici) :

Nécessite Python 3.9+ Et si posssible un IDE Type Pycharm (résoudra les problèmes de packages classiques de Python)
Installer Mongodbserver

Installation de l'environnement virtuel :

dans le /Backend 

python -m venv venv
venv/Scripts/activate.ps1 (Powershell ou bat ou autre, environnement virtuel python)
pip install -r requirements.txt

python /social_network/manage.py makemigrations
python /social_network/manage.py migrate

Si cette partie comporte des erreurs c'est qu'il y a eu un problème au niveau de l'installation des packages, 
il est probable que cela soit lié à toke_blacklist, dans ce cas,
aller dans \venv\Lib\site-packages\rest_framework_simplejwt\token_blacklist\migrations
et supprimer tous les fichiers 000X puis relancer le :
python /social_network/manage.py migrate

Si pycharm 

pycharm . (dossier Backend toujours)
Initialiser un lancement du scripts manage.py avec runserver 8000
https://i.imgur.com/ZlAlQfg.png

sinon essayer diverses manières (selon l'os)  de lancer sans avoir de problèmes avec les modules

manage.py runserver 8000 

Accès au FrontEnd (HTML CSS JS local) : 

PATH\Frontend\public_html\Log-in.html

Remarque : Les messages d'erreurs sont visibles dans la console uniquement.
