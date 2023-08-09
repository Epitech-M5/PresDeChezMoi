import requests
import os
import json

dossier = r'T-YEP-600-MAR-6-1-finalproject-mateo.salvy\back\test'

fichiers = os.listdir(dossier)

passAllTest = True

arrayResultTest = []

# Fonction qui envoie des requetes
def testUnitaire(method, route, header, body, codeExpected):
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
    return verifyTest(response.status_code, codeExpected)
    
# Fonction qui verifie le status code
def verifyTest(codeResponse, codeExpected):
    print(codeExpected, " ", codeResponse)
    if str(codeResponse) == str(codeExpected):
        return True
    else:
        return False
    
for fichier in fichiers:
    method = fichier.split('_')[0]
    codeExpected = fichier.split('_')[1]
    with open(f'{dossier}\\{fichier}', 'r') as fichier:
        contenu_json = json.load(fichier)
        print(contenu_json)
    route = contenu_json["url"]
    body = contenu_json["body"]
    header = contenu_json["header"]
    arrayResultTest.append(testUnitaire(method, route, header, body, codeExpected))

# Vérifier les résultats
for result in arrayResultTest:
    if result == False:
        passAllTest = False
        break

if passAllTest:
    print("✅✅✅✅✅")
else:
    print("❌❌❌❌❌")