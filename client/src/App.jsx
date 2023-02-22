import { Routes, Route, Navigate } from "react-router-dom";

import { Books, Add, Update } from "./pages";

import "./style.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:bookId" element={<Update />} />

        {/* If the user enters an invalid path in the URL it automatically redirects them to the homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
