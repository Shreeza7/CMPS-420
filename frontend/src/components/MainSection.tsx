import React, { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

const together = new Together({ 
  apiKey: "YOUR_API_KEY", //replace with your Together API key
});

const MainSection: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [blogContent, setBlogContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [showSaveForm, setShowSaveForm] = useState<boolean>(false);
  const [isTextModalOpen, setTextModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const openTextModal = () => {
    setTextModalOpen(true);
    setBlogContent('');
    setShowSaveForm(false);
    setUserInput('');
    setError('');
  };

  const closeTextModal = () => {
    setTextModalOpen(false);
    setError('');
  };

  const openImageModal = () => setImageModalOpen(true);
  const closeImageModal = () => setImageModalOpen(false);

  const generateBlogContent = async () => {
    if (!userInput.trim()) {
      alert('Please enter some text first!');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      console.log("Sending request with input:", userInput);
      
      const response = await fetch('https://api.together.xyz/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
          prompt: `Write a detailed and well-structured blog post about: ${userInput}\n\nBlog post:`,
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 1,
        }),
      });

      console.log("Raw API response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Parsed API response data:", data);

      if (data.choices && data.choices[0] && data.choices[0].text) {
        const generatedContent = data.choices[0].text.trim();
        console.log("Generated content:", generatedContent);
        setBlogContent(generatedContent);
        setShowSaveForm(true);
        setTextModalOpen(false);
      } else {
        console.error("Unexpected API response structure:", data);
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error("Full error details:", error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setBlogContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const saveBlogPost = () => {
    if (!blogTitle.trim()) {
      alert('Please enter a title for your blog post');
      return;
    }

    try {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: blogTitle,
        content: blogContent,
        date: new Date().toISOString(),
      };

      const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      localStorage.setItem('blogPosts', JSON.stringify([...existingPosts, newPost]));

      setBlogTitle('');
      setShowSaveForm(false);
      alert('Blog post saved successfully!');
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert('Failed to save blog post. Please try again.');
    }
  };

  return (
    <main style={mainStyle}>
      <h2 style={titleStyle}>Welcome to AI Blog Writing!</h2>
      
      <div style={optionsContainerStyle}>
        <button style={buttonStyle} onClick={openTextModal}>
          Generate Text
        </button>
        <button style={buttonStyle} onClick={openImageModal}>
          Generate Image
        </button>
      </div>

      {/* Text Generation Modal */}
      {isTextModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Generate Text</h3>
            <textarea
              style={textareaStyle}
              placeholder="What would you like to write about?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <div style={modalButtonsStyle}>
              <button
                style={{
                  ...buttonStyle,
                  ...(isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
                }}
                onClick={generateBlogContent}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
              <button style={closeButtonStyle} onClick={closeTextModal}>
                Close
              </button>
            </div>
            {error && <div style={errorStyle}>{error}</div>}
          </div>
        </div>
      )}

      {/* Image Generation Modal */}
      {isImageModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Generate Image</h3>
            <input
              type="text"
              style={inputStyle}
              placeholder="Describe the image you want to generate..."
            />
            <div style={modalButtonsStyle}>
              <button style={buttonStyle}>Generate Image</button>
              <button style={closeButtonStyle} onClick={closeImageModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display generated blog content */}
      {blogContent && (
        <div style={resultStyle}>
          {showSaveForm && (
            <div style={saveFormStyle}>
              <input
                type="text"
                placeholder="Enter blog title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                style={titleInputStyle}
              />
              <button onClick={saveBlogPost} style={saveButtonStyle}>
                Save Blog Post
              </button>
            </div>
          )}
          <div style={blogContentStyle}>
            {blogContent.split('\n').map((paragraph, index) => (
              <p key={index} style={paragraphStyle}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

// Styles remain the same as in your current implementation
const mainStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '70vh',
  color: '#333',
  padding: '20px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  marginBottom: '20px',
  color: '#333',
};

const optionsContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#F28A2E',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#FFF',
  padding: '20px',
  borderRadius: '10px',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
  textAlign: 'center',
};

const modalButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  marginTop: '15px',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '150px',
  borderRadius: '5px',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #D3CBC2',
  marginBottom: '15px',
  resize: 'vertical',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #D3CBC2',
  fontSize: '16px',
  marginBottom: '15px',
};

const errorStyle: React.CSSProperties = {
  color: 'red',
  marginTop: '10px',
  textAlign: 'center',
  fontSize: '14px',
  padding: '10px',
  backgroundColor: '#ffebee',
  borderRadius: '4px',
};

const closeButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
};

const resultStyle: React.CSSProperties = {
  width: '80%',
  maxWidth: '800px',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  marginTop: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const saveFormStyle: React.CSSProperties = {
  marginBottom: '20px',
  display: 'flex',
  gap: '10px',
  width: '100%',
};

const titleInputStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #D3CBC2',
};

const saveButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const blogContentStyle: React.CSSProperties = {
  lineHeight: '1.6',
  color: '#333',
};

const paragraphStyle: React.CSSProperties = {
  marginBottom: '16px',
  fontSize: '16px',
  lineHeight: '1.6',
};

export default MainSection;