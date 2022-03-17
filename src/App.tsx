import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import NotFound from "./components/notFound/notFound";
import Language from "./components/language/language";
import ComingSoon from "./components/comingSoon/comingSoon";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Router>
      <ToastProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Language />} />
            <Route path="/coming_soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Switch>
        </Layout>
      </ToastProvider>
    </Router>
  );
}

export default App;
