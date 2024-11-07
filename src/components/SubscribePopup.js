"use client";

import React, { useState, useEffect } from "react";
import Script from 'next/script';

const SubscribePopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      if (!window.ml) {
        window.ml = function () {
          (window.ml.q = window.ml.q || []).push(arguments);
        };
        window.ml('account', '1178511');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <Script src="https://assets.mailerlite.com/js/universal.js" strategy="afterInteractive" />

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
    </>
  );
};

export default SubscribePopup;

