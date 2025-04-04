import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./frontend/routes/AppRoutes";
import { ErrorBoundary } from "./frontend/components/ErrorBoundary";
import { AuthListener } from "./frontend/service/AuthListener";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthListener />
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
