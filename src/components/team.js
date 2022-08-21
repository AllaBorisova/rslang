import React from "react"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

function TeamMember() {
  return (
    <Card>
      <Card.Img variant="top" src={`../assets/${props.avatar}`} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
        <Card.Link href={props.link} target="_blank">
          GitHub
        </Card.Link>
      </Card.Body>
    </Card>
  )
}

function Team() {
  return (
    <section className="my-4 text-center">
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <h2 className="display-5 fw-bold  mb-3">Наша команда</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <TeamMember
              name="Harleycat80"
              text="text..."
              link="https://github.com/Harleycat80"
              avatar="cute_cat_kitten_face_per_avatar-02-512.webp"
            />
          </Col>
          <Col>
            <TeamMember
              name="alexsmirnova13"
              text="text..."
              link="https://github.com/alexsmirnova13"
              avatar="cute_cat_kitten_face_per_avatar-02-512.webp"
            />
          </Col>
          <Col>
            <TeamMember
              name="AllaBorisova"
              text="text..."
              link="https://github.com/AllaBorisova"
              avatar="cute_cat_kitten_face_per_avatar-02-512.webp"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Team
