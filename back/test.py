import requests
import os
import json
from dotenv import load_dotenv
import time

load_dotenv()

adresseIpBackend = os.getenv("REACT_APP_BACKEND_ADRESSEIP")
portBackend = os.getenv("REACT_APP_BACKEND_PORT")

dossier = r'T-YEP-600-MAR-6-1-finalproject-mateo.salvy\back\test'

fichiers = os.listdir(dossier)

passAllTest = True

arrayResultTest = []

idUtilisateur = ''
tokenUtilisateur = ''
roleUtilisateur = ''

# Fonction qui envoie des requetes
def testUnitaire(method, route, header, body, codeExpected, hint):
    match method:
        case 'GET':
            response = requests.get(route, headers=header, json=body)
        case 'POST':
            response = requests.post(route, headers=header, json=body)
        case 'PUT':
            response = requests.put(route, headers=header, json=body)
        case 'DELETE':
            response = requests.delete(route, headers=header, json=body)
        case _:
            return 'error'
    data = response.json()
    global idUtilisateur
    global roleUtilisateur
    global tokenUtilisateur

    if 'id' in hint:
        idUtilisateur = data.get('id')
    if 'idRole' in hint:
        roleUtilisateur = data.get('idRole')
    if 'accessToken' in hint:
        tokenUtilisateur = data.get('accessToken')
    print("id : ", idUtilisateur," idRole : ", roleUtilisateur," token : ", tokenUtilisateur)

    print("RESPONSE OBJECT : ", response.text)
    return [verifyTest(response.status_code, codeExpected), {'token':tokenUtilisateur, "role": roleUtilisateur, "id": idUtilisateur } ]
    
# Fonction qui verifie le status code
def verifyTest(codeResponse, codeExpected):
    print(codeExpected, " ", codeResponse)
    if str(codeResponse) == str(codeExpected):
        return True
    else:
        return False
    
for fichier in fichiers:
    with open(f'{dossier}\\{fichier}', 'r') as fichier:
        contenu_json = json.load(fichier)
        print(contenu_json)
    method = contenu_json["method"]
    codeExpected = contenu_json["codeExpected"]
    route = str(contenu_json["url"]).replace('IPBACKEND', adresseIpBackend).replace('PORTBACKEND', portBackend).replace('IDUTILISATEURSELF', str(idUtilisateur))
    print(contenu_json["url"], " => ", route)
    body = contenu_json["body"]
    header = {}
    if contenu_json["header"]:
        header['x-access-token'] = tokenUtilisateur        
    else:
        header = {}
    hint = contenu_json["hint"]
    testUnitaireResult = testUnitaire(method, route, header, body, codeExpected, hint)
    arrayResultTest.append(testUnitaireResult[0])
    print(testUnitaireResult[1])
    if not testUnitaireResult[1]['token'] == None:
        tokenUtilisateur = testUnitaireResult[1]['token']
    if not testUnitaireResult[1]['id'] == None:
        idUtilisateur = testUnitaireResult[1]['id']
    roleUtilisateur = testUnitaireResult[1]['role']
    time.sleep(1)

# Vérifier les résultats
for result in arrayResultTest:
    if result == False:
        passAllTest = False
        break

if passAllTest:
    print("✅✅✅✅✅")
else:
    print("❌❌❌❌❌")