import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "./components/Customnavbar";
import Carousel from "./components/Carousels";
import Cards from "./components/Cards";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Customnavbar />
      </div>
      <div className="h-[600px]">
        <Carousel />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </>
  );
}

export default App;
