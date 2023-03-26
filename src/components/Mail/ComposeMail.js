import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { emailActions } from "../Store/email-redux";
import { useDispatch } from "react-redux"; 

const Mailfirst=()=> {
  const [message, Setmessage] = useState();
  const EmailInputRef = useRef();
  const subjectInputRef = useRef();

  const refHandler = (event) => {
    Setmessage(event.blocks[0].text);
  };

  let dispatch = useDispatch();

  const EmailSubmitHandler = (event) => {
    const receiverEmail = EmailInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;

    let receivedEmail = receiverEmail.replace(".", "").replace("@", "");
    let SenderEmail = localStorage.getItem("Email");
    console.log(SenderEmail);
    let emailSender = SenderEmail.replace(".", "").replace("@", "");

    const objSent = {
      to: receivedEmail,
      subject: enteredSubject,
      message: message,
    };

    const objRecieved = {
      from: emailSender,
      subject: enteredSubject,
      message: message,
    };

    fetch(
      `https://mail-box-project-default-rtdb.firebaseio.com/${receivedEmail}/received.json`,
      {
        method: "POST",
        body: JSON.stringify({
          ...objRecieved,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (res) => {
      const data = await res.json();

      fetch(
        `https://mail-box-project-default-rtdb.firebaseio.com/${receivedEmail}/received.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            id: data.name,
            read: true,
          }),
        }
      );

      dispatch(
        emailActions.recievedEmail({
          id: data.name,
          from: objRecieved.from,
          subject: objRecieved.subject,
          message: objRecieved.message,
          read: true,
        })
      );
    });

    fetch(
      `https://mail-box-project-default-rtdb.firebaseio.com/${emailSender}/sent.json`,
      {
        method: "POST",
        body: JSON.stringify({
          ...objSent,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (res) => {
      const data = await res.json();

      fetch(
        `https://mail-box-project-default-rtdb.firebaseio.com/${emailSender}/sent.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            id: data.name,
          }),
        }
      );
      dispatch(
        emailActions.sentBox({
          id: data.name,
          to: objSent.to,
          subject: objSent.subject,
          message: objSent.message,
        })
      );
    });

    alert("sent successfully");
    console.log("sent successfully");
  };

  return (
    <Container className="justify-content-md-center">
      <Row>
        <Col xs={10}>
          <Form>
            <Form.Group>
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={EmailInputRef}
                className="bg-warning"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                required
                ref={subjectInputRef}
                className="bg-warning"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>message</Form.Label>

              <Editor
                onChange={refHandler}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  minHeight: "250px",
                }}
              />
            </Form.Group>
            <Form.Group>
              <Button
                onClick={EmailSubmitHandler}
                type="button"
                variant="warning"
              >
                Submit
              </Button>{" "}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Mailfirst;