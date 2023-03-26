import React from "react";
import { Nav } from "react-bootstrap";

const Header = (event) => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/mail">Compose</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link href="/inbox" eventKey="link-1">
        Inbox
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link eventKey="link-2">Coming Soon-2</Nav.Link>
      </Nav.Item> */}
    </Nav>
  );
};

export default Header;