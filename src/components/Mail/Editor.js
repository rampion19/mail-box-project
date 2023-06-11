import "./Editor.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const EditorPanel = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [recipientEmail, setRecipientEmail] = useState("");
    const history = useHistory()
    const email = localStorage.getItem('email')

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
        // console.log(editorState);
    };
    const handleRecipientEmailChange = (event) => {
        setRecipientEmail(event.target.value);
    };
    //sending receiver message to store mailSlice

    const handleSendClick = async () => {
        // TODO: Use an email client or service to send the email with the content of the editor
        const messageBody = editorState.getCurrentContent().getPlainText();
        const senderMailUrl = email.replace("@", '').replace(".", '').replace(".", '');
        const recieverUrl = recipientEmail.replace("@", '').replace(".", '').replace(".", '');
        
        if(recipientEmail.trim() === ""){
            alert("Recipient email cannot be empty")
            return;
        }
        try {
            const sendDataToDb = await fetch(
                `https://mail-box-2c10a-default-rtdb.firebaseio.com/${senderMailUrl}.json`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        from: email,
                        to: recipientEmail,
                        message: messageBody,
                        read: true,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ); //fetch ends`)
            await fetch(
                `https://mail-box-2c10a-default-rtdb.firebaseio.com/${recieverUrl}.json`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        from: email,
                        to: recipientEmail,
                        message: messageBody,
                        read: false,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ); //fetch ends
            if (sendDataToDb.ok) {
                // const response = await sendDataToDb.json();
                history.replace('/inbox')
            } else {
                const response = await sendDataToDb.json();
                throw response.error;
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <div>
            <input
                style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    padding: "10px",
                    width: "18rem",
                }}
                type="email"
                placeholder="Recipient email"
                value={recipientEmail}
                onChange={handleRecipientEmailChange}
            />
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
            />
            <button onClick={handleSendClick}>Send</button>
        </div>
    );
};

export default EditorPanel;