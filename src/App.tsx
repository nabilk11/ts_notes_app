import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./pages/NewNote";
import Home from "./pages/Home";

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewNote />} />
        {/* nested routes */}
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
