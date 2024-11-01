import React, { useState } from 'react';
import Together from 'together-ai';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

const together = new Together({
  apiKey: "c076e873355eeaf092c773dd003178f173821babc199db31584ba7dca7c26083", // replace with your Together API key
});

const MainSection: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [blogContent, setBlogContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [showSaveForm, setShowSaveForm] = useState<boolean>(false);
  const [isTextModalOpen, setTextModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const openTextModal = () => setTextModalOpen(true);
  const closeTextModal = () => setTextModalOpen(false);
  const openImageModal = () => setImageModalOpen(true);
  const closeImageModal = () => setImageModalOpen(false);

  const formatBlogContent = (content: string) => {
    const sections = content.split(/\n\n|\*\*/g);
    return sections
      .filter(section => section.trim().length > 0)
      .map(section => section.trim())
      .join('\n\n');
  };

  const saveBlogPost = () => {
    if (!blogTitle.trim()) {
      alert('Please enter a title for your blog post');
      return;
    }
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
  };

  const generateBlogContent = async () => {
    if (!userInput.trim()) {
      alert('Please enter some text first!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await together.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a blog writer who provides blog suggestions and writes blog posts. Format your response with clear headings and paragraphs. Use proper spacing between sections.',
          },
          {
            role: 'user',
            content: userInput,
          },
        ],
        model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ['<|eot_id|>', '<|eom_id|>'],
        stream: false,
      });

      console.log("API Response:", response); // Debug the response in the console
      const content = response?.choices?.[0]?.message?.content;
      setBlogContent(formatBlogContent(content || 'No content generated'));
      setShowSaveForm(true);
    } catch (error) {
      console.error('Error generating blog content:', error);
      setBlogContent('An error occurred while generating the blog content.');
    } finally {
      setIsLoading(false);
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
              placeholder="Let's turn your ideas into words!"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
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
            <button style={buttonStyle}>Generate Image</button>
            <button style={closeButtonStyle} onClick={closeImageModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Display the generated blog content */}
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
              <button 
                onClick={saveBlogPost}
                style={saveButtonStyle}
              >
                Save Blog Post
              </button>
            </div>
          )}
          <div style={blogContentStyle}>
            {blogContent.split('\n\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph.startsWith('*') ? (
                  <h3 style={sectionHeaderStyle}>{paragraph.replace(/\*/g, '')}</h3>
                ) : (
                  <p style={paragraphStyle}>{paragraph}</p>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

// Styles
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
  textAlign: 'center',
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '100px',
  borderRadius: '5px',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #D3CBC2',
  marginBottom: '15px',
  color: '#333',
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

const closeButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#F28A2E',
  fontSize: '14px',
  cursor: 'pointer',
  marginTop: '10px',
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

const sectionHeaderStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '24px',
  marginBottom: '16px',
  color: '#222',
};

const paragraphStyle: React.CSSProperties = {
  marginBottom: '16px',
  fontSize: '16px',
  lineHeight: '1.6',
};

export default MainSection;
