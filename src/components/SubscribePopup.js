"use client";

import React, { useState, useEffect } from "react";

const SubscribePopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement("script");
      script.src = "https://assets.mailerlite.com/js/universal.js";
      script.async = true;
      script.onload = () => {
        window.ml = window.ml || function () {
          (window.ml.q = window.ml.q || []).push(arguments);
        };
        window.ml("account", "1178511");
      };
      document.body.appendChild(script);

      // Cleanup the script if the popup closes or component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

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
    
        
        {/* MailerLite embedded form */}
        <div className="ml-embedded" data-form="bXo0zH"></div>
        
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
