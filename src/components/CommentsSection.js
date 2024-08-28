"use client";

import React, { useState, useEffect } from 'react';
import { createComment } from '@/lib/context/article';
import { useUser } from '@/lib/context/user';

const CommentsSection = ({ articleId, initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyName, setReplyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', message: '' });
  const [replyErrors, setReplyErrors] = useState({ name: '', message: '' });
  const { current: user } = useUser();

  useEffect(() => {
    setComments(initialComments);
  }, [articleId, initialComments]);

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
      setReplyName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e, parentCommentId = null) => {
    e.preventDefault();

    // Determine if we're submitting a reply or a main comment
    const isReply = parentCommentId !== null;

    // Field validation
    let hasError = false;
    const newErrors = isReply ? { ...replyErrors } : { ...errors };

    if ((isReply ? replyMessage : message).trim().length === 0) {
      newErrors.message = 'Please enter a message.';
      hasError = true;
    }

    if ((isReply ? replyName : name).trim().length === 0) {
      newErrors.name = 'Please enter your name.';
      hasError = true;
    }

    if (isReply) {
      setReplyErrors(newErrors);
    } else {
      setErrors(newErrors);
    }

    if (hasError) return;

    // Start the loading state
    setLoading(true);

    const currentDate = new Date();

    // Create a new comment or reply
    try {
      const newComment = await createComment(articleId, isReply ? replyName : name, isReply ? replyMessage : message, currentDate, parentCommentId);

      // Update state with the new comment
      const updatedComments = [...comments, newComment];
      arrangeComments(updatedComments);

      if (isReply) {
        setReplyName(user && user.name ? user.name : '');
        setReplyMessage('');
        setReplyingTo(null);
      } else {
        setName(user && user.name ? user.name : '');
        setMessage('');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      // End the loading state
      setLoading(false);
    }
  };

  // Function to arrange comments into parents and replies
  function arrangeComments(commentsArray) {
    const parents = commentsArray.filter((comment) => !comment.parent);
    const replies = commentsArray.filter((comment) => comment.parent);

    // Attach replies to their parent comments
    parents.forEach((parent) => {
      parent.replies = replies.filter((reply) => reply.parent === parent.$id);
    });

    setComments(parents);
  }

  return (
    <div>
      <h2>Comments</h2>
      <div style={{ marginBlock: '1rem', paddingBlock: '1rem', borderTop: '1px solid whitesmoke' }}>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.$id}
              style={{
                marginBottom: '1rem',
                backgroundColor: comment.parent ? '#f2f2f2' : 'transparent',
                padding: comment.parent ? 15 : 0,
                borderLeft: comment.parent ? '2px solid black' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                <span
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  {comment.name.charAt(0).toUpperCase()}
                </span>
                <p>{comment.name}</p>
              </div>
              <p>{comment.message}</p>
              <small style={{ fontSize: 12, color: 'grey' }}>{new Date(comment.date).toLocaleDateString()}</small>
              {!comment.parent && (
                <p>
                  <button
                    onClick={() => setReplyingTo(comment.$id)}
                    style={{ marginRight: '10px', border: 'none', backgroundColor: 'white', color: 'grey' }}
                  >
                    Reply
                  </button>
                  {replyingTo === comment.$id && (
                    <button
                      onClick={() => setReplyingTo(null)}
                      style={{ marginRight: '10px', border: 'none', backgroundColor: 'white', color: 'grey' }}
                    >
                      Cancel
                    </button>
                  )}
                </p>
              )}
              {replyingTo === comment.$id && (
                <form onSubmit={(e) => handleSubmit(e, comment.$id)} style={{ marginTop: '20px' }}>
                  <div>
                    <label htmlFor={`replyName-${comment.$id}`}>Name:</label>
                    <input
                      id={`replyName-${comment.$id}`}
                      type="text"
                      placeholder="Your name"
                      value={replyName}
                      onChange={(e) => setReplyName(e.target.value)}
                      style={{ marginTop: '10px', padding: '10px' }}
                      required
                    />
                    {replyErrors.name && <p style={{ color: 'red', fontSize: '12px' }}>{replyErrors.name}</p>}
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <textarea
                      placeholder="Write a reply"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      required
                    ></textarea>
                    {replyErrors.message && <p style={{ color: 'red', fontSize: '12px' }}>{replyErrors.message}</p>}
                  </div>
                  <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}

              {comment.replies?.length > 0 && (
                <div style={{ marginLeft: '20px',marginBlock:'10px' }}>
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.$id}
                      style={{
                        marginBottom: '1rem',
                        backgroundColor: '#f2f2f2',
                        padding: 15,
                        borderLeft: '2px solid black',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                        <span
                          style={{
                            width: '35px',
                            height: '35px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 14,
                          }}
                        >
                          {reply.name.charAt(0).toUpperCase()}
                        </span>
                        <p>{reply.name}</p>
                      </div>
                      <p>{reply.message}</p>
                      <small style={{ fontSize: 12, color: 'grey' }}>{new Date(reply.date).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginTop: '10px', padding: '10px' }}
              required
            />
            {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
          </div>
          <div style={{ marginTop: '10px' }}>
            <textarea
              placeholder="Write a comment"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            {errors.message && <p style={{ color: 'red', fontSize: '12px' }}>{errors.message}</p>}
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;
