import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { generateBlogText } from "../services/textGenerationService";
import { generateImage } from "../services/imageGenerationService";
import { toast } from 'react-toastify';

const MainSection = () => {
  // Navigation hook for redirecting users
  const navigate = useNavigate();

  // State management for form inputs and UI controls
  const [userInput, setUserInput] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [isTextModalOpen, setTextModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [hoveredSaveButton, setHoveredSaveButton] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredGenerateButton, setHoveredGenerateButton] = useState(false);
  const [hoveredCloseButton, setHoveredCloseButton] = useState(false);
  const [hoveredGenerateImageButton, setHoveredGenerateImageButton] = useState(false);
  const [hoveredCloseImageButton, setHoveredCloseImageButton] = useState(false);

  // Handles opening the text generation modal
  const openTextModal = () => {
    setTextModalOpen(true);
    setBlogContent("");
    setShowSaveForm(false);
    setUserInput("");
    setError("");
    setGeneratedImageUrl("");
  };

  // Handles closing the text generation modal
  const closeTextModal = () => {
    setTextModalOpen(false);
    setError("");
  };

  // Handles opening the image generation modal
  const openImageModal = () => {
    setImageModalOpen(true);
    setImagePrompt("");
    setGeneratedImageUrl("");
    setError("");
    setBlogContent("");
    setShowSaveForm(false);
  };

  // Handles closing the image generation modal
  const closeImageModal = () => {
    setImageModalOpen(false);
    setError("");
  };

  // Stores the current blog content before redirecting to login
  const storePendingBlog = () => {
    const pendingBlog = {
      title: blogTitle,
      content: generatedImageUrl || blogContent,
      type: generatedImageUrl ? 'image' : 'text',
      date: new Date().toISOString()
    };
    // Use sessionStorage to persist data during redirect but clear on tab close
    sessionStorage.setItem('pendingBlog', JSON.stringify(pendingBlog));
  };

  // Handles the generation of blog text content
  const handleGenerateBlogContent = async () => {
    if (!userInput.trim()) {
      toast.error("Please enter some text first!");
      return;
    }

    setIsLoading(true);
    setError("");
    setGeneratedImageUrl("");

    try {
      const result = await generateBlogText(userInput);
      
      if (result.error) {
        setError(result.error);
        setBlogContent("");
      } else {
        setBlogContent(result.blogContent);
        setShowSaveForm(true);
        setTextModalOpen(false);
      }
    } catch (error) {
      setError("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handles the generation of images
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast.error("Please enter an image description first!");
      return;
    }

    setIsImageLoading(true);
    setError("");
    setBlogContent("");

    try {
      const result = await generateImage(imagePrompt);
      
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedImageUrl(result.imageUrl);
        setShowSaveForm(true);
        setImageModalOpen(false);
      }
    } catch (error) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsImageLoading(false);
    }
  };

  // Handles saving blog posts with authentication check
  const saveBlogPost = () => {
    if (!blogTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }

    // Check for authentication
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      // Store current content and redirect to login
      storePendingBlog();
      toast.info('Please log in to save your blog post');
      navigate('/login');
      return;
    }

    try {
      // Create new blog post object
      const newPost = {
        id: Date.now().toString(),
        title: blogTitle,
        content: generatedImageUrl || blogContent,
        type: generatedImageUrl ? 'image' : 'text',
        date: new Date().toISOString()
      };

      // Get and update existing posts
      const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
      localStorage.setItem("blogPosts", JSON.stringify([...existingPosts, newPost]));

      // Reset form state
      setBlogTitle("");
      setShowSaveForm(false);
      setBlogContent("");
      setGeneratedImageUrl("");
      
      toast.success('Blog post saved successfully!');
      navigate('/myblogs');
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("Failed to save blog post. Please try again.");
    }
  };

  // Component rendering
  return (
    <main style={mainStyle}>
      <div style={containerBoxStyle}>
        <h2 style={titleStyle}>Welcome to AI Blog Writing!</h2>

        <div style={optionsContainerStyle}>
          <button
            style={hoveredButton === "text" ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHoveredButton("text")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={openTextModal}
          >
            Generate Text
          </button>
          <button
            style={hoveredButton === "image" ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHoveredButton("image")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={openImageModal}
          >
            Generate Image
          </button>
        </div>
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
                  ...(isLoading ? { opacity: 0.7, cursor: "not-allowed" } : {}),
                  ...(hoveredGenerateButton ? buttonHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredGenerateButton(true)}
                onMouseLeave={() => setHoveredGenerateButton(false)}
                onClick={handleGenerateBlogContent}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
              <button
                style={{
                  ...closeButtonStyle,
                  ...(hoveredCloseButton ? closeButtonHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredCloseButton(true)}
                onMouseLeave={() => setHoveredCloseButton(false)}
                onClick={closeTextModal}
              >
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
            <textarea
              style={textareaStyle}
              placeholder="Describe the image you want to generate..."
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
            <div style={modalButtonsStyle}>
              <button
                style={{
                  ...buttonStyle,
                  ...(isImageLoading ? { opacity: 0.7, cursor: "not-allowed" } : {}),
                  ...(hoveredGenerateImageButton ? buttonHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredGenerateImageButton(true)}
                onMouseLeave={() => setHoveredGenerateImageButton(false)}
                onClick={handleGenerateImage}
                disabled={isImageLoading}
              >
                {isImageLoading ? "Generating..." : "Generate"}
              </button>
              <button
                style={{
                  ...closeButtonStyle,
                  ...(hoveredCloseImageButton ? closeButtonHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredCloseImageButton(true)}
                onMouseLeave={() => setHoveredCloseImageButton(false)}
                onClick={closeImageModal}
              >
                Close
              </button>
            </div>
            {error && <div style={errorStyle}>{error}</div>}
          </div>
        </div>
      )}

      {/* Generated Content Display and Save Form */}
      {(blogContent || generatedImageUrl) && (
        <div style={resultStyle}>
          <div style={saveFormStyle}>
            <input
              type="text"
              placeholder={generatedImageUrl ? "Enter image title" : "Enter blog title"}
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              style={titleInputStyle}
            />
            <button
              onClick={saveBlogPost}
              style={{
                ...saveButtonStyle,
                ...(hoveredSaveButton ? saveButtonHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredSaveButton(true)}
              onMouseLeave={() => setHoveredSaveButton(false)}
            >
              {generatedImageUrl ? 'Save Image' : 'Save Blog Post'}
            </button>
          </div>

          {/* Display Text Content */}
          {blogContent && (
            <div style={blogContentStyle}>
              {blogContent.split("\n").map((paragraph, index) => (
                <p key={index} style={paragraphStyle}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          {/* Display Generated Image */}
          {generatedImageUrl && (
            <div style={imageContainerStyle}>
              <img
                src={generatedImageUrl}
                alt="Generated content"
                style={generatedImageStyle}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

// Styles remain the same
const mainStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
  color: "#333",
  padding: "20px",
};

const containerBoxStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
  marginTop: "20px",
};

const titleStyle = {
  fontSize: "28px",
  marginBottom: "20px",
  color: "#333",
};

const optionsContainerStyle = {
  display: "inline-flex",
  gap: "20px",
  marginBottom: "20px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#F28A2E",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: "#FF5F1F",
  transform: "scale(1.05)",
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

const modalStyle = {
  backgroundColor: "#FFF",
  padding: "20px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const modalTitleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
  textAlign: "center",
};

const textareaStyle = {
  width: "100%",
  height: "150px",
  borderRadius: "5px",
  border: "1px solid #D3CBC2",
  marginBottom: "15px",
  resize: "vertical",
  fontSize: "16px",
};

const modalButtonsStyle = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginTop: "15px",
};

const closeButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

const closeButtonHoverStyle = {
  backgroundColor: "rgb(85, 99, 104)",
  transform: "scale(1.05)",
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
  textAlign: "center",
  fontSize: "14px",
  padding: "10px",
  backgroundColor: "#ffebee",
  borderRadius: "4px",
};

const resultStyle = {
  width: "80%",
  maxWidth: "800px",
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  marginTop: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const saveFormStyle = {
  marginBottom: "20px",
  display: "flex",
  gap: "10px",
  width: "100%",
};

const titleInputStyle = {
  flex: 1,
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #D3CBC2",
};

const saveButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const saveButtonHoverStyle = {
  backgroundColor: "#45A049",
  transform: "scale(1.05)",
};

const blogContentStyle = {
  lineHeight: "1.6",
  color: "#333",
};

const paragraphStyle = {
  marginBottom: "16px",
  fontSize: "16px",
};

const imageContainerStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const generatedImageStyle = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default MainSection;