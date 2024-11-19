import React, { useState, useEffect } from "react";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    setBlogPosts(savedBlogs);
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const isBase64Image = (str) => {
    return str && (
      str.startsWith('data:image/jpeg;base64,') || 
      str.startsWith('data:image/png;base64,')
    );
  };

  const renderContent = (content, type) => {
    if (type === 'image' || isBase64Image(content)) {
      const imageUrl = content.startsWith('data:') ? content : `data:image/jpeg;base64,${content}`;
      return (
        <img 
          src={imageUrl} 
          alt="Blog content"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
            margin: '0 auto'
          }}
        />
      );
    }
    return content.split("\n").map((paragraph, index) => (
      <p key={index} style={postExcerptStyle}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Blogs</h1>
      <div style={blogListStyle}>
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div key={post.id} style={blogPostStyle}>
              <h2 style={postTitleStyle}>
                {post.title}
                <span style={contentTypeStyle}>
                  {(post.type === 'image' || isBase64Image(post.content)) ? ' 🖼️' : ' 📝'}
                </span>
              </h2>
              <div style={postContentStyle}>
                {(post.type === 'image' || isBase64Image(post.content)) ? (
                  <img 
                    src={post.content.startsWith('data:') ? post.content : `data:image/jpeg;base64,${post.content}`}
                    alt={post.title}
                    style={thumbnailStyle}
                  />
                ) : (
                  <p style={postExcerptStyle}>
                    {post.content.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </p>
                )}
              </div>
              <button onClick={() => openModal(post)} style={readMoreStyle}>
                {(post.type === 'image' || isBase64Image(post.content)) ? 'View Full Image' : 'Read More'}
              </button>
            </div>
          ))
        ) : (
          <p style={emptyMessageStyle}>No blog posts available yet.</p>
        )}
      </div>

      {selectedPost && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} style={closeButtonStyle}>
              ×
            </button>
            
            <h2 style={modalTitleStyle}>{selectedPost.title}</h2>
            <div style={modalBodyStyle}>
              {renderContent(selectedPost.content, selectedPost.type)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles remain the same as before
const pageStyle = {
  padding: "20px",
  color: "#333",
};

const headerStyle = {
  fontSize: "32px",
  textAlign: "center",
  marginBottom: "40px",
};

const blogListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const blogPostStyle = {
  backgroundColor: "#E6EEF1",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const postTitleStyle = {
  fontSize: "24px",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
};

const contentTypeStyle = {
  fontSize: "0.8em",
  marginLeft: "8px",
};

const postContentStyle = {
  marginBottom: "15px",
};

const thumbnailStyle = {
  maxWidth: "200px",
  maxHeight: "150px",
  objectFit: "cover",
  borderRadius: "4px",
};

const postExcerptStyle = {
  fontSize: "16px",
  marginBottom: "15px",
};

const readMoreStyle = {
  color: "#88BDBC",
  textDecoration: "none",
  fontWeight: "bold",
  backgroundColor: "#000000",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};

const emptyMessageStyle = {
  textAlign: "center",
  color: "#777",
  fontSize: "18px",
  fontStyle: "italic",
};

const modalOverlayStyle = {
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
};

const modalContentStyle = {
  backgroundColor: "#FFF",
  padding: "20px",
  borderRadius: "10px",
  width: "80%",
  maxWidth: "800px",
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  position: "relative",
};

const modalTitleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
};

const modalBodyStyle = {
  lineHeight: "1.6",
  color: "#333",
  marginBottom: "20px",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  color: "#ff4444",
};

export default BlogPage;
