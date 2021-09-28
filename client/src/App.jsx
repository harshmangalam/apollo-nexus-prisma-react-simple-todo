import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import TodoLists from "./components/TodoLists";

function App() {
  return (
    <div>
      {/* header */}
      <header>
        <Header />
      </header>

      <main className="py-4">
        <Container>
          {/* todos  */}

        <TodoLists />
        </Container>
      </main>
    </div>
  );
}

export default App;
