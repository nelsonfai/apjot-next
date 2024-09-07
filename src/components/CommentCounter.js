'use client';

import React, { useState } from 'react';
import { useCommentCount } from '@/lib/context/commentcount';
const CommentCounter = ({ initialCount, articleId }) => {
  const [ count, setCount] = useState(initialCount);
  const {commentcount} = useCommentCount()



  return (
    <button className="button" >
      <img src="/bubble.png" alt="Comment" />
      <span style={{ fontSize: "16px", color: "black" }}>
        {" "}
        {commentcount}
      </span>
    </button>
  );
};

export default CommentCounter;
