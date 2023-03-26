import React, { useEffect, useState } from "react";
import axios from "axios";
import AllEmails from "./Allemail";

const ShowEmail = (props) => {
      const id = Math.random();

    console.log("inside show Emails");
    let email = localStorage.getItem("Email").replace(".", "").replace("@", "").replace(".", "");
    const [resmails, setMails] = useState([]);

    useEffect(() => {
        axios
            .get(
                `https://mail-box-project-default-rtdb.firebaseio.com/${email}/received.json`
            )
            .then((res) => {
                console.log(res.data);
                setMails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (resmails === null) {
        return <h2>You have no mail</h2>;
    }

    const result = Object.values(resmails);

    return (
        <>
            {result.map((item) => (
                <AllEmails
                    item={{
                        key  :item.id,
                        from: item.from,
                        id: item.id,
                        subject: item.subject,
                        message: item.message,
                    }}
                />
            ))}
        </>
    );
};

export default ShowEmail;