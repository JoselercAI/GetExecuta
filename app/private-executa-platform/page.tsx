"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const ACCESS_KEY = "executa-platform-deck-access";

export default function PrivateDeckPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [hasAccess, setHasAccess] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(ACCESS_KEY) === "granted",
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/private-deck-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setError(result?.error ?? "Unable to verify access");
      return;
    }

    sessionStorage.setItem(ACCESS_KEY, "granted");
    setHasAccess(true);
  }

  if (hasAccess) {
    return (
      <main className="privateDeck">
        <iframe
          title="Executa platform deck"
          src="/api/private-deck-content"
          className="privateDeckFrame"
        />
      </main>
    );
  }

  return (
    <main className="privateGate">
      <section className="privateGateCard">
        <Link className="logo privateGateLogo" href="/">
          <span className="mark" />
          <span>Get Executa</span>
        </Link>
        <div>
          <p className="privateGateEyebrow">Private access</p>
          <h1>{mode === "login" ? "Log in" : "Create access"}</h1>
          <p className="privateGateCopy">
            {mode === "login"
              ? "Log in with your email and password to view the private platform presentation."
              : "Create your access with your name, email, and password."}
          </p>
        </div>
        <div className="privateGateSwitch">
          <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>
            Log in
          </button>
          <button className={mode === "register" ? "active" : ""} type="button" onClick={() => setMode("register")}>
            Register
          </button>
        </div>
        <form className="privateGateForm" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Name
              <input name="name" type="text" autoComplete="name" required />
            </label>
          )}
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
          </label>
          {error && <p className="privateGateError">{error}</p>}
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : mode === "login" ? "Log in" : "Create Account"}
          </button>
        </form>
        <p className="privateGateNote">
          Register once, then use the same email and password to access the deck later.
        </p>
      </section>
    </main>
  );
}
