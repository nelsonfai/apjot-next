"use client";

import React from "react";

const SubscribePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ fontSize: "x-large", marginBottom: "1rem" }}>
          Join Our Weekly Newsletter
        </h3>
        <p style={{ marginBottom: "1rem", color: "#555" }}>
          Never miss out on the latest updates, exclusive content, and special
          notifications! Join our newsletter to stay informed and connected.
        </p>
        
        {/* Embed the slim iframe */}
        <iframe 
          src="https://embeds.beehiiv.com/a909a765-6b1e-4e28-8aee-aa0e4431f740?slim=true" 
          data-test-id="beehiiv-embed" 
          width="100%" 
          height="320" 
          frameBorder="0" 
          scrolling="no" 
          style={{
            borderRadius: "4px", 
            border: "2px solid #e5e7eb", 
            margin: "0", 
            backgroundColor: "transparent",
          }}
        ></iframe>

        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            backgroundColor: "transparent",
            border: "none",
            color: "#000",
            fontSize: "large",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubscribePopup;
