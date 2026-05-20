"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const ACCESS_KEY = "executa-platform-deck-access";

export default function PrivateDeckPage() {
  const [hasAccess, setHasAccess] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(ACCESS_KEY) === "granted",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sessionStorage.setItem(ACCESS_KEY, "granted");
    setHasAccess(true);
  }

  if (hasAccess) {
    return (
      <main className="privateDeck">
        <iframe
          title="Executa platform deck"
          src="/deck/executa-platform-deck-7f3c9a.html"
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
          <h1>Executa Platform Deck</h1>
          <p className="privateGateCopy">
            Enter your details to view the private platform presentation.
          </p>
        </div>
        <form className="privateGateForm" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="btn" type="submit">Access Deck</button>
        </form>
        <p className="privateGateNote">
          This page is unlisted and only accessible to people with the private link.
        </p>
      </section>
    </main>
  );
}
