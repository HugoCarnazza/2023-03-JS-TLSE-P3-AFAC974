// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router } from "react-router-dom";
import ArtworksAdministration from "./pages/ArtworksAdministration";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <ArtworksAdministration />
        <p className="text-blue-500">coucou</p>
      </div>
    </Router>
  );
}

export default App;
