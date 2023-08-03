import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatSidebar = (props) => {
  const userInfo = useSelector((state) => state.utilisateur);
  const conv = useSelector((state) => state.listUsers);

  const [photoProfil, setPhotoProfil] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchDataAndHandleClick = async (id) => {
    await props.fetchData();
    props.handleChangeChannel(id);
  };

  const handleClick = (id, membres) => {
    fetchDataAndHandleClick(id);

    console.log("membres   ", membres);

    const conversation = conv.rooms.find((room) => room.id === id);
    if (conversation) {
      const convInfoData = {
        pseudo: conversation.membres[0],
        photoProfil: conversation.photoProfil,
      };
      props.setConvInfo(convInfoData);
    }
  };

  async function fetchPhoto(entry) {
    try {
      const response = await axios({
        method: "GET",
        headers: {
          "x-access-token": userInfo.token,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        url: `http://${props.ipBDD}:8082/api/user/${entry}`,
      });

      props.setConvInfo({
        pseudo: response.data.pseudo,
        photoProfil: response.data.photoProfil,
      });

      setPhotoProfil((prevState) => ({
        ...prevState,
        [entry]: response.data.photoProfil,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchPhotosForMembers() {
    conv.rooms.forEach((item) => {
      item.membres.forEach((member) => {
        if (!photoProfil[member]) {
          fetchPhoto(member);
        }
      });
    });
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

  useEffect(() => {
    fetchUsers(); // Fetch User for listing users to add to a conv
  }, []);

  useEffect(() => {
    fetchPhotosForMembers();
    props.fetchData();
  }, [props]);

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
        );

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
        return JSON.stringify(sortedRoomMembers) === JSON.stringify(sortedSelectedMembers);
      });
  
      if (conversationExists) {
        alert("La conversation avec ces membres existe déjà.");
        // Afficher un message à l'utilisateur ou prendre une autre action appropriée
        return;
      }
  
      // Appeler createRoomWithPromise avec les membres sélectionnés
      await createRoomWithPromise([...filteredSelectedMembers, userInfo.pseudo]);
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
        {conv.rooms.map((item, index) => (
          <button
            key={index}
            className="chat_users"
            onClick={() => handleClick(item.id, item.membres)}
          >
            <img
              className="chat_users_image"
              src={`../../../../media/img/${
                photoProfil[item.membres[0]] || "group"
              }.png`}
              alt={item.id}
            />
            <h2 className="chat_users_pseudo">{item.membres}</h2>
          </button>
        ))}
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
