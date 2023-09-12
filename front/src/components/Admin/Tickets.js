import { getAPI } from "../../api.js";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import DropDownBtn from "../MainComponent/DropDownBtn.js";
import Modal from "../MainComponent/Modal.js";
import ShortDropDownBtn from "../MainComponent/ShortDropDownBtn.js";
import axios from "axios";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;

const Tickets = () => {
  const utilisateur = useSelector((state) => state.utilisateur);
  const [listTicket, setListTicket] = useState([]);
  const [listTicketStatus, setListTicketStatus] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [rendu, setRendu] = useState(listTicket);

  const user = useSelector((state) => state.utilisateur);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAPI(
          `http://${adresseip}:${port}/api/ticket`,
          null,
          {
            "x-access-token": utilisateur.token,
          }
        );
        console.log("responseAAAAAAAAAAAAAAA", response);
        setListTicket(response.dataAPI);
        setRendu(
          response.dataAPI.filter((item) => item.idVille === user.idVille)
        );
      } catch (error) {
        console.log("error", error);
      }

      try {
        const response = await getAPI(
          `http://${adresseip}:${port}/api/status/`
        );
        const titles = response.dataAPI.map((item) => item.titre);
        setListTicketStatus(titles);
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchData();
  }, []);

  const handleFilter = (item) => {
    if (item === "Le plus récent") {
      const sortedTickets = [...listTicket].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setRendu(sortedTickets);
    } else if (item === "Le plus ancien") {
      const sortedTickets = [...listTicket].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setRendu(sortedTickets);
    } else {
      setRendu(listTicket);
    }
    setListTicket(rendu);
  };

  const handleFilterStatus = (item) => {
    if (item && item.length > 0) {
      const filteredTickets = listTicket.filter(
        (ticket) => ticket.status.titre == item //it dosn't work
      );

      setRendu(filteredTickets);
    } else {
      setRendu(listTicket);
    }
  };

  const handleCheckboxChangeStatus = async (item, index, indexArray) => {
    const statusIndex =
      listTicketStatus.findIndex((element) => element === item) + 1;

    try {
      await axios.put(
        `http://${adresseip}:${port}/api/ticket/` + index,
        { idStatus: statusIndex },
        {
          headers: {
            "x-access-token": utilisateur.token,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
        }
      );

      const response = await getAPI(
        `http://${adresseip}:${port}/api/ticket`,
        null,
        {
          "x-access-token": utilisateur.token,
        }
      );
      setListTicket(response.dataAPI);
      setRendu(response.dataAPI.filter((item) => item.idVille === user.idVille));
    } catch (error) {
      console.log("error modification ticket", error);
    }
    if (listTicket[indexArray].estRecompense === true && item == "résolu") {
      try {
        const response = await getAPI(
          `http://${adresseip}:${port}/api/user/` + user.idutilisateur,
          null,
          {
            "x-access-token": utilisateur.token,
          }
        );
        const score = response.dataAPI.score;

        const listRecompenseEnCoursClaim = JSON.parse(
          response.dataAPI.listRecompenseEnCoursClaim
        );
        const listRecompense = JSON.parse(response.dataAPI.listRecompense);

        try {
          const responseRecompense = await getAPI(
            `http://${adresseip}:${port}/api/recompense/` + index,
            null,
            {
              "x-access-token": utilisateur.token,
            }
          );
          console.log(response.dataAPI.listRecompenseEnCoursClaim);

          // Supprimer la récompense actuelle de la liste des récompenses en cours
          const rewardToRemove = listRecompenseEnCoursClaim[indexArray];
          const updatedListRecompenseEnCoursClaim =
            listRecompenseEnCoursClaim.filter((idx) => idx !== rewardToRemove);

          // Ajouter la récompense actuelle à la liste des récompenses de l'utilisateur
          const updatedListRecompense = [...listRecompense, rewardToRemove];

          console.log({
            listRecompenseEnCoursClaim: updatedListRecompenseEnCoursClaim,
            listRecompense: updatedListRecompense,
            score: score - responseRecompense.dataAPI.scoreNecessaire,
          });

          await axios.put(
            `http://${adresseip}:${port}/api/user/` + user.idutilisateur,
            {
              listRecompenseEnCoursClaim: updatedListRecompenseEnCoursClaim,
              listRecompense: updatedListRecompense,
              score: score - responseRecompense.dataAPI.scoreNecessaire,
            },
            {
              headers: {
                "x-access-token": utilisateur.token,
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=utf-8",
              },
            }
          );
        } catch (error) {
          console.log("error get recompense for modify user", error);
        }
      } catch (error) {
        console.log("error get user for modify recompense", error);
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /**
   *
   * @param {string} messageTicket Permet de récupérer le message du ticket choisis
   * Fonction qui permet d'ouvrir Modal et
   * Récupère le message du ticket à afficher dans Modal
   */
  const openModal = (messageTicket) => {
    setMessage(messageTicket);
    setIsOpen(true);
  };

  return (
    <>
      <div className="content_admin">
        <div className="container_title_page_admin">
          <h1>Tickets</h1>
        </div>
        <div className="content_inside_admin_pages">
          <div className="wrapper_btndropd">
            <div className="container_dropd1">
              <DropDownBtn
                type="abs"
                text="Filtre ticket"
                items={["Le plus récent", "Le plus ancien"]}
                onCheckboxChange={handleFilter}
              />
            </div>
            <div className="container_dropd2">
              <DropDownBtn
                type="abs"
                text="Filtre avec les status"
                items={listTicketStatus}
                onCheckboxChange={handleFilterStatus}
              />
            </div>
          </div>

          <div className="wrapper_tab_role">
            <table>
              <thead>
                <tr>
                  <th>De</th>
                  <th>Titre</th>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {rendu.map((tickets, index) => (
                  <tr key={tickets.id}>
                    <td>{tickets.utilisateur.pseudo}</td>
                    <td>{tickets.titre}</td>
                    <td>
                      {tickets.status.titre}{" "}
                      <ShortDropDownBtn
                        type="abs"
                        items={listTicketStatus}
                        className="shortddb_Tickets"
                        onCheckboxChange={(items) =>
                          handleCheckboxChangeStatus(items, tickets.id, index)
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="btn_detail"
                        onClick={() => openModal(tickets.message)}
                      >
                        Voir lien
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="container_x">
          <i className="fa-solid fa-xmark" onClick={closeModal}></i>
        </div>
        <div className="wrapper_popup">{message}</div>
      </Modal>
    </>
  );
};

export default Tickets;
