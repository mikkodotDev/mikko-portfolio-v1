// Imports
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import CursorFlashlight from "./components/CursorFlashlight";

function App() {
  return (
    <ErrorBoundary>
      <CursorFlashlight />
      <Home />
    </ErrorBoundary>
  );
}

export default App;
