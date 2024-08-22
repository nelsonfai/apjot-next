"use client";

import { useState } from "react";
import { useUser } from "@/lib/context/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { initiateSubscribe } from "@/lib/context/article";

export default function Signup() {
  const user = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newsletter, setNewsletter] = useState(true); // State for newsletter signup
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!name) {
      setError("Please enter your name.");
      setLoading(false);
      return;
    }

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      setLoading(false);
      return;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    const result = await user.register(email, password, name);
    if (result.success) {
      if (newsletter) {
        const newsletterResponse = await initiateSubscribe(email);
        
      }
      router.push("/blog");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <section
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "auto",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ textAlign: "center", marginBlock: "1rem", color: "#000" }}>Signup</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "1rem",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          placeholder="Password (min. 8 characters)"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "1rem",
          }}
        />
               <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#555" }}>
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
            disabled={loading} 
            style={{
              width: "20px",
              height: "20px",
              cursor: loading ? "not-allowed" : "pointer",
              borderRadius: "4px",
              border: "1px solid #000",
              margin:0,
              transition: "background-color 0.3s ease",
            }}
          />
          <span>Sign up for our newsletter</span>
        </label>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: loading ? "#555" : "#000",
            color: "#fff",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginBlock: "1rem" }}>
            {error}
          </p>
        )}
        {newsletterMessage && (
          <p style={{ color: "green", textAlign: "center", marginBlock: "1rem" }}>
            {newsletterMessage}
          </p>
        )}
        <p style={{ textAlign: "center", color: "#555" }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "#000", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
