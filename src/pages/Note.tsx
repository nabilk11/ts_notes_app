import React from "react";
import { useNote } from "../components/NoteLayout";
import { Col, Row, Badge, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Note = () => {
  const note = useNote();
  return (
    <div>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="flex-wrap"
            >
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="danger">Delete</Button>
            <Link to={`..`}>
              <Button variant="success">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  );
};

export default Note;
