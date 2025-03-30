import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context/AppContext";
import { Router } from "wouter";
import { useState, useEffect } from "react";

// Use browser history instead of hash history for cleaner URLs
const useHashLocation = (): [string, (to: string) => void] => {
  const [location, setLocation] = useState(window.location.pathname);
  
  useEffect(() => {
    // Handle popstate event (user clicks back/forward)
    const handleLocationChange = () => {
      setLocation(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    
    // Custom navigation handler to avoid hash in URLs
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        const result = target.apply(thisArg, argArray);
        handleLocationChange();
        return result;
      },
    });

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // Return location and navigation function with explicit type
  return [
    location,
    (to: string) => {
      window.history.pushState(null, "", to);
      setLocation(to);
    }
  ];
};

createRoot(document.getElementById("root")!).render(
  <Router hook={useHashLocation}>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);
