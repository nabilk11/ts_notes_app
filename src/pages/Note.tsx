import { useNote } from "../components/NoteLayout";
import { Col, Row, Badge, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type NoteProps = {
  deleteNote: (id: string) => void;
};

const Note = ({ deleteNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <div>
      <Row className="align-items-center mb-5">
        <Col>
          <h1 className="text-muted">{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
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
            <Button
              onClick={() => {
                deleteNote(note.id);
                navigate("/");
              }}
              variant="danger"
            >
              Delete
            </Button>
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
