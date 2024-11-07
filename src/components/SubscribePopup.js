"use client";

import React, { useState } from "react";
import { initiateSubscribe } from "../lib/context/article";

const SubscribePopup = ({ isOpen, onClose }) => {
    useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.mailerlite.com/js/universal.js';
    script.async = true;
    script.onload = () => {
      window.ml = window.ml || function () {
        (window.ml.q = window.ml.q || []).push(arguments);
      };
      window.ml('account', '1178511'); // Replace with your account ID
    };
    document.body.appendChild(script);
  }, []);

  return <div className="ml-embedded" data-form="bXo0zH"></div>;
};

export default SubscribePopup;
