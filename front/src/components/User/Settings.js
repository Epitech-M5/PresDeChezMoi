import { React, useState, useEffect } from 'react';
import Modal from '../MainComponent/Modal';
import DropDownBtn from '../MainComponent/DropDownBtn';
import { useSelector } from 'react-redux';
import { deleteAPI, getAPI, putAPI } from '../../api';
import { useNavigate } from 'react-router-dom';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const Settings = () => {

    const user = useSelector((state) => state.utilisateur);

    var [toAddModal, setToAddModal] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [mdp, setMdp] = useState('');
    const [mdpConfirm, setMdpConfirm] = useState('');
    const [id, setId] = useState(null);
    const [error, setError] = useState(null);
    const [pseudo, setPseudo] = useState('');
    const [dataVille, setDataVille] = useState([]);
    const [pdp, setPdp] = useState(1);
    const [psdModif, setPsdModif] = useState('');
    const [description, setDescription] = useState('');
    const [metier, setMetier] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [hygieneOption, setHygieneOption] = useState(0);
    const [serviceOption, setServiceOption] = useState(null);
    const [evenementOption, setEvenementOption] = useState(null);
    const [scoreVilleFleurie, setScoreVilleFleurie] = useState(null);


    const navigate = useNavigate();

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleCheckboxChange = (item) => {
        setSelectedValue(item);
        const ScrollToTop = document.querySelector('.modal_content_left');
        ScrollToTop.scrollTop = 0;
    };

    const openModal = () => {
        setMdp('');
        setMdpConfirm('');
        setPseudo('');
        setEmail('');
        setError(null);
        setSelectedValue(null);

        setIsOpen(true);
    }

    useEffect(() => {

        if (id === 1) {

            setToAddModal(
                <>
                    <h1>Modifier son profil</h1>
                    <input type="text" placeholder='Pseudo' onChange={(event) => setPsdModif(event.target.value)} />
                    <textarea placeholder='Description' onChange={(event) => setDescription(event.target.value)} />
                    <input type="text" placeholder='Occupation/Metier' onChange={(event) => setMetier(event.target.value)} />
                    <input type="text" placeholder='Prenom' onChange={(event) => setFirstName(event.target.value)} />
                    <input type="text" placeholder='Nom' onChange={(event) => setLastname(event.target.value)} />
                    <h2>Photo de profil</h2>
                    <h3>Actuel : {pdp}</h3>
                    <div className="container_all_pdp">
                        <h3 onClick={() => setPdp(1)} className={pdp === 1 ? "selected" : ""}>1</h3>
                        <h3 onClick={() => setPdp(2)} className={pdp === 2 ? "selected" : ""}>2</h3>
                        <h3 onClick={() => setPdp(3)} className={pdp === 3 ? "selected" : ""}>3</h3>
                        <h3 onClick={() => setPdp(4)} className={pdp === 4 ? "selected" : ""}>4</h3>
                        <h3 onClick={() => setPdp(5)} className={pdp === 5 ? "selected" : ""}>5</h3>
                    </div>
                    <button onClick={handleModif}>Modifier</button>
                </>
            );
        }

        else if (id === 2) {

            setToAddModal(
                <>
                    <h1>Changer de commune</h1>
                    <div className="container_all_ville">
                        {dataVille.map((item) => (
                            <>
                                <p key={item.id} onClick={() => handleChoice(item.id)}>{item.nom} <span id='score_ville_global'>{item.scoreGlobale}/5</span></p>
                            </>
                        ))}
                    </div>
                </>
            );
        }

        else if (id === 3) {
            setToAddModal(
                <>
                    <h1>Supprimer votre compte</h1>
                    <input type="text" placeholder='Veuillez rentrer votre pseudo' onChange={(event) => setPseudo(event.target.value)} />
                    <button onClick={handleSupConfirm}>CONFIRMER</button>
                </>
            );
        }

        else if (id === 4) {
            setToAddModal(
                <>
                    <h1>Modifier mot de passe</h1>
                    <input type="text" placeholder='Nouveau mot de passe' onChange={(event) => setMdp(event.target.value)} />
                    <input type="text" placeholder='Confirmer votre mot de passe' onChange={(event) => setMdpConfirm(event.target.value)} />
                    <button onClick={handleMotDePasse}>Modifier</button>
                </>
            );
        }

        else if (id === 5) {
            setToAddModal(
                <>
                    <h1>Modifier Email</h1>
                    <input type="email" placeholder='Votre email' onChange={(event) => setEmail(event.target.value)} />
                    <button onClick={handleEmail}>Modifier</button>
                </>
            )
        }

        else if (id === 6) {
            setToAddModal(
                <>
                    <h1>Noter ma commune</h1>
                    <div className="container_all_pdp">
                        <h3>H : {hygieneOption}</h3>
                        <h3 onClick={() => setHygieneOption(0)} className={hygieneOption === 0 ? "selected" : ""}>0</h3>
                        <h3 onClick={() => setHygieneOption(1)} className={hygieneOption === 1 ? "selected" : ""}>1</h3>
                        <h3 onClick={() => setHygieneOption(2)} className={hygieneOption === 2 ? "selected" : ""}>2</h3>
                        <h3 onClick={() => setHygieneOption(3)} className={hygieneOption === 3 ? "selected" : ""}>3</h3>
                        <h3 onClick={() => setHygieneOption(4)} className={hygieneOption === 4 ? "selected" : ""}>4</h3>
                        <h3 onClick={() => setHygieneOption(5)} className={hygieneOption === 5 ? "selected" : ""}>5</h3>
                    </div>
                    <div className="container_all_pdp">
                        <h3>S : {serviceOption}</h3>
                        <h3 onClick={() => setServiceOption(0)} className={serviceOption === 0 ? "selected" : ""}>0</h3>
                        <h3 onClick={() => setServiceOption(1)} className={serviceOption === 1 ? "selected" : ""}>1</h3>
                        <h3 onClick={() => setServiceOption(2)} className={serviceOption === 2 ? "selected" : ""}>2</h3>
                        <h3 onClick={() => setServiceOption(3)} className={serviceOption === 3 ? "selected" : ""}>3</h3>
                        <h3 onClick={() => setServiceOption(4)} className={serviceOption === 4 ? "selected" : ""}>4</h3>
                        <h3 onClick={() => setServiceOption(5)} className={serviceOption === 5 ? "selected" : ""}>5</h3>
                    </div>
                    <div className="container_all_pdp">
                        <h3>E : {evenementOption}</h3>
                        <h3 onClick={() => setEvenementOption(0)} className={evenementOption === 0 ? "selected" : ""}>0</h3>
                        <h3 onClick={() => setEvenementOption(1)} className={evenementOption === 1 ? "selected" : ""}>1</h3>
                        <h3 onClick={() => setEvenementOption(2)} className={evenementOption === 2 ? "selected" : ""}>2</h3>
                        <h3 onClick={() => setEvenementOption(3)} className={evenementOption === 3 ? "selected" : ""}>3</h3>
                        <h3 onClick={() => setEvenementOption(4)} className={evenementOption === 4 ? "selected" : ""}>4</h3>
                        <h3 onClick={() => setEvenementOption(5)} className={evenementOption === 5 ? "selected" : ""}>5</h3>
                    </div>
                    <button onClick={handleNoteVille}>Modifier</button>
                </>
            )
        }

        else {
            setToAddModal(
                <>
                    <h1>Error</h1>
                </>
            );
        }

    }, [mdp, id, mdpConfirm, pseudo, pdp, psdModif, description, metier, lastname, firstname, email, hygieneOption, serviceOption, evenementOption]);

    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/ville`, {}, { 'x-access-token': user.token })
            .then((response) => {
                setDataVille(response.dataAPI);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/ville/${user.idVille}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                setScoreVilleFleurie(response.dataAPI.scoreVilleFleurie);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                setPdp(response.dataAPI.photoProfil)
                var arrayNoteVille = JSON.parse(response.dataAPI.noteVille)
                if (arrayNoteVille.length == 3) {
                    setHygieneOption(arrayNoteVille[0])
                    setServiceOption(arrayNoteVille[1])
                    setEvenementOption(arrayNoteVille[2])
                }
                else {
                    setHygieneOption(null)
                    setServiceOption(null)
                    setEvenementOption(null)
                }
                console.log(">>>>>>>>>>>>>>>>", response.dataAPI)
                console.log(">>>>>>>>>>>>>>>>", arrayNoteVille)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleChoice = (ville) => {

        putAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, { 'idVille': ville }, { 'x-access-token': user.token })
            .then((response) => {
                setError('Bien reçu, attendez...');
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function moyenne(array) {
        var taille = array.length
        var result = 0
        for (let pas = 0; pas < taille; pas++) {
            result += array[pas]
        }
        return result / taille
    }
    const handleNoteVille = () => {

        putAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, { 'noteVille': [hygieneOption, serviceOption, evenementOption] }, { 'x-access-token': user.token })
            .then((response) => {
                getAPI(`http://${adresseip}:${port}/api/user/note_by_ville/${user.idVille}`, {}, { 'x-access-token': user.token })
                    .then((response) => {
                        var arrayHygiene = []
                        var arrayService = []
                        var arrayEvenement = []
                        console.log("####### note ville :", user.idVille, '#', response.dataAPI)
                        for (var data = 0; data < response.dataAPI.length; data++) {

                            var arrayNoteVille = JSON.parse(response.dataAPI[data])
                            console.log("####### note ville :", arrayNoteVille)

                            if (arrayNoteVille.length == 3) {
                                arrayHygiene.push(arrayNoteVille[0])
                                arrayService.push(arrayNoteVille[1])
                                arrayEvenement.push(arrayNoteVille[2])
                            }
                        }
                        console.log("|||||||||||||||||||", arrayHygiene, arrayService, arrayEvenement)
                        var moyenneHygiene = moyenne(arrayHygiene)
                        var moyenneService = moyenne(arrayService)
                        var moyenneEvenement = moyenne(arrayEvenement)

                        var scoreGlobale = (moyenneHygiene / 5 * 1.5) + (moyenneService / 5 * 1.5) + (moyenneEvenement / 5 * 0.75) + (scoreVilleFleurie / 4 * 1.25)
                        console.log("scoreGlobal ", scoreGlobale)
                        putAPI(`http://${adresseip}:${port}/api/ville/${user.idVille}`, { "scoreGlobale": scoreGlobale, 'moyenneHygiene': moyenneHygiene, 'moyenneService': moyenneService, 'moyenneEvenement': moyenneEvenement }, { 'x-access-token': user.token })
                            .then((response) => {
                                console.log("Ville maj :", response)
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                closeModal();

            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleModif = () => {

        putAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, { 'pseudo': psdModif, 'photoProfil': pdp, 'description': description, 'profession': metier, 'nom': lastname, 'prenom': firstname }, { 'x-access-token': user.token })
            .then((response) => {

                closeModal();

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSupConfirm = () => {

        if (user.pseudo === pseudo) {
            setError('OK !')
            deleteAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, {}, { "x-access-token": user.token })
            navigate('/')
        }
        else {
            setError(`ENTREE NON VALIDE ${pseudo} =/= ${user.pseudo}`)
        }
    }

    const handleMotDePasse = () => {

        console.log(mdp, mdpConfirm)

        if (mdp.length <= 0 || mdpConfirm.length <= 0) {
            setError('Les 2 champs doivent être remplies')
        }

        else if (mdp === mdpConfirm) {
            var header = {
                "x-access-token": user.token
            }
            var body = {
                "motDePasse": mdp
            }
            putAPI(`http://${adresseip}:${port}/api/user/edit_password/`, body, header).then(() => {
                setError('OK !')
                closeModal()
            }).catch((error) => {
                console.log(error);
                setError(error);
            })
        } else {
            setError('Les 2 champs ne sont pas les mêmes')
        }
    };


    const handleEmail = () => {

        console.log("email value = = = = = ", email);

        putAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, { 'mail': email }, { 'x-access-token': user.token })
            .then((response) => {

                closeModal();

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleOpen_1 = () => {
        setId(1);
        openModal();
    }

    const handleOpen_2 = () => {
        setId(2);
        openModal();
    }

    const handleOpen_3 = () => {
        setId(3);
        openModal();
    }

    const handleOpen_4 = () => {
        setId(4);
        openModal();
    }

    const handleOpen_5 = () => {
        setId(5);
        openModal();
    }

    const handleOpen_6 = () => {
        setId(6);
        openModal();
    }


    return (
        <>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="container_x">
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>
                <div className="wrapper_popup">
                    <div className="container_contents_user_prof">
                        {toAddModal}
                        <span>{error ? (
                            <>
                                <i className="fa-solid fa-circle-info"></i> {error}
                            </>
                        ) : null}</span>
                    </div>
                </div>
            </Modal>

            <div className="content_user_profil">
                <div className="container_btns_settings">
                    <button onClick={handleOpen_1}>Modifier profil</button>
                    <button onClick={handleOpen_2}>Changer de commune</button>
                    <button onClick={handleOpen_3}>Supprimer votre compte</button>
                    <button onClick={handleOpen_4}>Modifier mot de passe</button>
                    <button onClick={handleOpen_5}>Modifier Email</button>
                    <button onClick={handleOpen_6}>Noter ma commune</button>
                </div>
            </div>
        </>
    );
};

export default Settings;