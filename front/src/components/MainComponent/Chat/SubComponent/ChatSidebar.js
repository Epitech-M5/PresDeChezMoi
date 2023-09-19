import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeader } from "../../../../redux/ListUsers";

const ChatSidebar = (props) => {
  const userInfo = useSelector((state) => state.utilisateur);
  const conv = useSelector((state) => state.listUsers);
  const dispatch = useDispatch();

  const [photoProfil, setPhotoProfil] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchPhoto(entry) {
    try {
      const response = await axios({
        method: "GET",
        headers: {
          "x-access-token": userInfo.token,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        url: `http://${props.ipBDD}:8082/api/user/pseudo/${entry}`,
      });

      setPhotoProfil((prevState) => ({
        ...prevState,
        [entry]: response.data.photoProfil,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPhotosForMembers() {
    const promises = [];
    conv.rooms.forEach((item) => {
      item.membres.forEach((member) => {
        if (!photoProfil[member]) {
          promises.push(fetchPhoto(member));
        }
      });
    });
    await Promise.all(promises);
  }

  async function fetchUsers() {
    try {
      const response = await axios.get(`http://${props.ipBDD}:8082/api/user/`, {
        headers: {
          "x-access-token": userInfo.token,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      });
      console.log("fetchUser ", response.data);
      setUsers(response.data.filter((user) => user.pseudo !== userInfo.pseudo));
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheckboxChange = (e, pseudo) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedMembers((prevSelected) => [...prevSelected, pseudo]);
    } else {
      setSelectedMembers((prevSelected) =>
        prevSelected.filter((memberId) => memberId !== pseudo)
      );
    }
  };

  const changeChannel = async (id) => {
    await props.fetchData();
    props.handleChangeChannel(id);
  };

  const handleClick = (id, membres) => {
    changeChannel(id);

    console.log("changement de channel membres   ", membres, " id  ", id);

    const conversation = conv.rooms.find((room) => room.id === id);

    if (conversation) {
      let pseudo = "";
      for (let i = 0; i < conversation.membres.length; i++) {
        if (i !== 0) {
          pseudo += ", ";
        }
        pseudo += `${conversation.membres[i]}`;
      }
      let photoProfilHeader;
      if (conversation.membres.length > 1) {
        photoProfilHeader = "group";
      } else {
        photoProfilHeader = photoProfil[conversation.membres[0]];
      }
      dispatch(
        fetchHeader({
          pseudo: pseudo,
          photoProfil: photoProfilHeader,
          idRoom: id,
          idUtilisateur: userInfo.idutilisateur,
        })
      );

    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const createRoomWithPromise = (selectedMembers) => {
    return new Promise(async (resolve, reject) => {
      try {
        setSelectedMembers((prevSelected) => [
          ...prevSelected,
          userInfo.pseudo,
        ]);

        // La requête axios ne sera effectuée qu'après la mise à jour de l'état `selectedMembers`
        const response = await axios.post(
          `http://${props.ipBDD}:8082/api/room/`,
          {
            membres: selectedMembers,
          },
          {
            headers: {
              "x-access-token": userInfo.token,
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
            },
          }
        ).then((response) => {
          console.log("response", response.data);
          // Socket.(response.data.id, response.data.membres);
        });

        // Handle the response as needed
        console.log(response.data);
        props.fetchData();
        closeModal();
        setSelectedMembers([]);
        resolve(); // La promesse est résolue une fois la requête terminée
      } catch (error) {
        console.error(error);
        reject(error); // La promesse est rejetée en cas d'erreur
      }
    });
  };

  const createRoom = async () => {
    try {
      // Filtrer les membres sélectionnés pour exclure l'utilisateur actuel
      const filteredSelectedMembers = selectedMembers.filter(
        (member) => member !== userInfo.pseudo
      );

      // Vérifier si une conversation avec les membres sélectionnés existe déjà
      const conversationExists = conv.rooms.some((room) => {
        const sortedRoomMembers = room.membres.sort();
        const sortedSelectedMembers = filteredSelectedMembers.sort();
        return (
          JSON.stringify(sortedRoomMembers) ===
          JSON.stringify(sortedSelectedMembers)
        );
      });

      if (conversationExists) {
        alert("La conversation avec ces membres existe déjà.");
        // Afficher un message à l'utilisateur ou prendre une autre action appropriée
        return;
      }

      // Appeler createRoomWithPromise avec les membres sélectionnés
      await createRoomWithPromise([
        ...filteredSelectedMembers,
        userInfo.pseudo,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRootClick = (event) => {
    // Vérifier si l'élément sur lequel l'utilisateur a cliqué est l'arrière-plan obscur (la modal elle-même).
    // Si oui, fermer la modal en mettant à jour l'état `modalOpen` pour qu'il soit `false`.
    if (event.target.classList.contains("chat_modal")) {
      closeModal();
    }
  };

  useEffect(() => {
    fetchUsers();
    props.fetchData();
  }, []); // Exécuté une seule fois au montage du composant

  useEffect(() => {
    if (conv.rooms.length > 0) {
      fetchPhotosForMembers(); // Appelé chaque fois que conv.rooms change, mais seulement si non vide
    }
  }, [conv.rooms]); // Dépendances ajustées

  useEffect(() => {
    // Ajouter l'écouteur d'événement pour la fermeture de la modal lors du clic en dehors de celle-ci.
    if (modalOpen) {
      document
        .getElementById("root")
        .addEventListener("click", handleRootClick);
    }

    // Nettoyer l'écouteur d'événement lors du démontage du composant pour éviter les fuites de mémoire.
    return () => {
      document
        .getElementById("root")
        .removeEventListener("click", handleRootClick);
    };
  }, [modalOpen]);

  return (
    <div className="chat_sidebar">
      <div className="chat_list_users">
        {conv.rooms.map((item, index) => {
          let pseudo = "";
          if (item.membres.length > 1) {
            for (let i = 0; i < item.membres.length; i++) {
              if (i !== 0) {
                pseudo += ", ";
              }
              pseudo += `${item.membres[i]}`; // Ici, vous pouvez remplacer `item.membres[i]` par la valeur appropriée pour le pseudonyme
            }
          } else {
            pseudo = item.membres[0];
          }

          return (
            <button
              key={index}
              className="chat_users"
              onClick={() => handleClick(item.id, item.membres)}
            >
              <img
                className="chat_users_image"
                src={`../../../../media/img/${
                  item.membres.length > 1
                    ? "group"
                    : photoProfil[item.membres[0]]
                }.png`}
                alt={item.id}
              />

              <div className="chat_users_pseudo">
                <h2>{pseudo}</h2>
              </div>
            </button>
          );
        })}
      </div>
      <button onClick={openModal} className="chat_add_button">
        <p>+</p>
      </button>

      {modalOpen && (
        <div className="chat_modal">
          <div className="chat_modal_content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Liste des utilisateurs</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <input
                    type="checkbox"
                    value={user.id}
                    onChange={(e) => handleCheckboxChange(e, user.pseudo)}
                  />
                  <p>{user.pseudo}</p>
                </li>
              ))}
            </ul>
            <button onClick={createRoom}>Créer la salle de discussion</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatSidebar;
