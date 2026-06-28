import { useEffect, useState } from "react";
import { userManager } from "./providers/authProvider";

export function CallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("OAuth callback error", err);
        setError("Authentication failed. Please try again.");
      });
  }, []);

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Authentication Error</h1>
        <p>{error}</p>
        <a href="/">Go back</a>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Signing in...</p>
    </div>
  );
}
