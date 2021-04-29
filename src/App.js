import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Navbar from "./components/layouts/Header/Navbar"

function App() {
  return (
    <Container>
      <Navbar />
      <h2>Home page</h2>
    </Container>
  );
}

export default App;
