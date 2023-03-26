import React, { Fragment } from "react";
import { Col, Container, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Allemail.module.css";

const AllEmails = (props) => {
  const { from, subject } = props.item;

  return (
    <Fragment>
      <div>
        <Container className="justify-content-md-center">
          <div className={classes.dv1}>
            <Link to={{ pathname: "/inbox/details", state: props }}>
              <Row>
                <Col>from--{from}</Col>
                <Col xs={6}>subject--{subject}</Col>
                <Col>
                  <Badge pill bg="info">
                    *
                  </Badge>{" "}
                </Col>
              </Row>
            </Link>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default AllEmails;