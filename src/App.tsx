import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./pages/NewNote";
import Home from "./pages/Home";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid"; // must npm i --save-dev @types/uuid as well as uuid
import NoteList from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import Note from "./pages/Note";

// adds id to existing NoteData
export type Note = {
  id: string;
} & NoteData;

// types for NoteData
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // store notes with tags in cache w/ useMemo - will only recalculate value if one of the dependencies is updated or changes
  // notesWithTags will now include all data - tags, id, title, markdown, tagIds,
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  // create note function - takes previous notes, and new tags and data - returns an array with prevNotes and new
  // will save newly created notes within setNotes array, which is being saved in local storage with useLocalStorage hook

  function createNewNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  // add tag function - in order for it to be saved in setTag and this Local Storage
  // takes prev tags, and adds new one to the array

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notesWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              availableTags={tags}
              onSubmit={createNewNote}
              onAddTag={addTag}
            />
          }
        />
        {/* nested routes */}
        <Route path="/:id" element={ <NoteLayout notes={notesWithTags}/> } >
          <Route index element={<Note /> } />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
