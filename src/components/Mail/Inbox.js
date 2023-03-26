import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { mailActions } from "../store/MailSlice";
import "./Inbox.css";

const Inbox = () => {
  const history = useHistory();
  const disptach = useDispatch();
  const mailData = useSelector((state) => state.mail.mailData);
  const email = useSelector((state) => state.mail.email);
  const unreadmessages = useSelector((state) => state.mail.unreadmessages);
  const senderurl = email.replace("@", "").replace(".", "").replace(".", "");

  useEffect(() => {
    fetch(
      `https://mail-box-project-default-rtdb.firebaseio.com/${senderurl}.json`
    ).then((res) =>
      res.json().then((data) => {
        const fetchAllEmails = Object.entries(data).map(
          ([id, { from, message, read, to }]) => ({
            id,
            from,
            message,
            read,
            to,
          })
        );
        disptach(mailActions.onRefresh(fetchAllEmails));
      })
    );
  }, [disptach, senderurl]);

  const sentEmailsHandler = () => {
    // Handle sent emails
  };

  // reading mails handler

  const readMailsHandler = async (mail) => {
    const id = mail.id;
    if (mail.read === false) {
      try {
        const updateRead = await fetch(
          `https://mail-box-project-default-rtdb.firebaseio.com/${senderurl}/${id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({ ...mail, read: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (updateRead.ok) {
          disptach(mailActions.updated({ ...mail, read: true }));
        } else {
          const errorData = await updateRead.json();
          throw new Error(errorData.error);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const deleteHandler = async (mail) => {
    const id = mail.id;
    const sender = mail.to.replace("@", "").replace(".", "").replace(".", "");
    try {
      const deleteMail = await fetch(
        `https://mail-box-project-default-rtdb.firebaseio.com/${sender}/${id}.json`,
        {
          method: "DELETE",
        }
      ); //fetch ends
      if (deleteMail.ok) {
        disptach(mailActions.deleteMail(mail));
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <center style={{ color: "red" }}>
        <h4>{`this is ${email} inbox`}</h4>
      </center>
      <div className="inbox-container">
        <div className="inbox-sidebar">
          <button
            className="inbox-button"
            onClick={() => history.replace("/home")}
          >
            Compose
          </button>
          <button className="inbox-button" onClick={sentEmailsHandler}>
            Sent
          </button>
          <button className="inbox-button">
            messages{" "}
            <span style={{ marginRight: "10px" }}> {unreadmessages}</span>
          </button>
        </div>
        <div className="inbox-list">
          {mailData.map((mail) => (
            <div className="inbox-item" key={mail.id}>
              <input
                id={mail.id}
                onClick={(e) => {
                  readMailsHandler(mail);
                }}
                type="checkbox"
                checked={mail.read === true ? true : false}
              />
              <div className="inbox-item-header">
                <div className="inbox-item-header-from">From</div>
                <div className="inbox-item-from">{mail.from}</div>
                <div className="inbox-item-header-message">
                  {mail.read === true ? "Message" : ""}
                </div>
                <div className="inbox-item-message">
                  {mail.read === true && mail.message}
                </div>
              </div>
              <div className="inbox-item-content">



              </div>
              <div class="delete-button-container">
                <button
                  onClick={() => {
                    deleteHandler(mail);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Inbox;