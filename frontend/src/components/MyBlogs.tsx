import React, { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    setBlogs(savedBlogs);
  }, []);

  const deleteBlog = (id: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    if (selectedBlog?.id === id) {
      setSelectedBlog(null);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>My Saved Blogs</h2>
      <div style={contentContainerStyle}>
        <div style={listStyle}>
          {blogs.map(blog => (
            <div key={blog.id} style={blogItemStyle}>
              <h3 
                style={blogTitleStyle}
                onClick={() => setSelectedBlog(blog)}
              >
                {blog.title}
              </h3>
              <div style={blogMetaStyle}>
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <button 
                  onClick={() => deleteBlog(blog.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <p style={emptyMessageStyle}>No saved blogs yet. Generate some content to get started!</p>
          )}
        </div>
        {selectedBlog && (
          <div style={previewStyle}>
            <h2 style={previewTitleStyle}>{selectedBlog.title}</h2>
            <div style={previewContentStyle}>
              {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} style={paragraphStyle}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  marginBottom: '20px',
  color: '#333',
};

const contentContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: '20px',
  minHeight: '600px',
};

const listStyle: React.CSSProperties = {
  borderRight: '1px solid #eee',
  padding: '20px',
};

const blogItemStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  cursor: 'pointer',
};

const blogTitleStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '18px',
  color: '#333',
};

const blogMetaStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
  color: '#666',
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '5px 10px',
  backgroundColor: '#ff4444',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const previewStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const previewTitleStyle: React.CSSProperties = {
  marginBottom: '20px',
  fontSize: '24px',
  color: '#333',
};

const previewContentStyle: React.CSSProperties = {
  lineHeight: '1.6',
  color: '#333',
};

const paragraphStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const emptyMessageStyle: React.CSSProperties = {
  color: '#666',
  fontStyle: 'italic',
};

export default MyBlogs;