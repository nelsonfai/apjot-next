'use client'
import React, { createContext, useContext, useState } from 'react';

const CommentsContext = createContext();

export const CommentCountProvider = ({ children }) => {
  const [commentcount, setCommentCount] = useState(0);

  return (
    <CommentsContext.Provider value={{ commentcount, setCommentCount }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentCount = () => useContext(CommentsContext);
