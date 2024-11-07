import React, { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

const API_KEY =
  "c076e873355eeaf092c773dd003178f173821babc199db31584ba7dca7c26083";

const MainSection: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [showSaveForm, setShowSaveForm] = useState<boolean>(false);
  const [isTextModalOpen, setTextModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredGenerateButton, setHoveredGenerateButton] =
    useState<boolean>(false);
  const [hoveredCloseButton, setHoveredCloseButton] = useState<boolean>(false);
  const [hoveredGenerateImageButton, setHoveredGenerateImageButton] =
    useState(false);
  const [hoveredCloseImageButton, setHoveredCloseImageButton] = useState(false);
  const [hoveredSaveButton, setHoveredSaveButton] = useState(false);

  const openTextModal = () => {
    setTextModalOpen(true);
    setBlogContent("");
    setShowSaveForm(false);
    setUserInput("");
    setError("");
  };

  const closeTextModal = () => {
    setTextModalOpen(false);
    setError("");
  };

  const openImageModal = () => {
    setImageModalOpen(true);
    setImagePrompt("");
    setGeneratedImageUrl("");
    setError("");
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setError("");
  };

  const generateBlogContent = async () => {
    if (!userInput.trim()) {
      alert("Please enter some text first!");
      return;
    }

    setIsLoading(true);
    setError("");
    setGeneratedImageUrl(""); // Clear the image when generating text

    try {
      console.log("Sending request with input:", userInput);

      const response = await fetch(
        "https://api.together.xyz/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional blog writer who creates well-structured, engaging blog posts.",
              },
              {
                role: "user",
                content: `Write a detailed blog post about: ${userInput}`,
              },
            ],
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            max_tokens: 1000,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Parsed API response data:", data);

      if (
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        const generatedContent = data.choices[0].message.content.trim();
        console.log("Generated content:", generatedContent);
        setBlogContent(generatedContent);
        setShowSaveForm(true);
        setTextModalOpen(false);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      console.error("Full error details:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setBlogContent("");
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async () => {
    if (!imagePrompt.trim()) {
      alert("Please enter an image description first!");
      return;
    }

    setIsImageLoading(true);
    setError("");
    setBlogContent(""); // Clears the text when generating an image

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt: imagePrompt,
        steps: 4,
        n: 1,
        height: 1024,
        width: 1024,
        response_format: "b64_json", // Request base64 format
      }),
    };

    try {
      console.log(
        "Sending request with options:",
        JSON.stringify(options, null, 2)
      );
      const response = await fetch(
        "https://api.together.xyz/v1/images/generations",
        options
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Raw API response:", JSON.stringify(data, null, 2));

      // Try different response formats
      if (data.data?.[0]?.b64_json) {
        setGeneratedImageUrl(`data:image/jpeg;base64,${data.data[0].b64_json}`);
        setImageModalOpen(false);
      } else if (data.data?.[0]?.url) {
        // If we get a URL, try to proxy it
        const proxyUrl = `https://api.together.xyz/imgproxy/${encodeURIComponent(
          data.data[0].url
        )}`;
        setGeneratedImageUrl(proxyUrl);
        setImageModalOpen(false);
      } else {
        console.error(
          "Unexpected response structure:",
          JSON.stringify(data, null, 2)
        );
        throw new Error(
          "Could not find image data in the response. Please check console for details."
        );
      }
    } catch (error) {
      console.error("Image generation error:", error);
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          setError(
            "Network error: Please check your internet connection and API key"
          );
        } else {
          setError(error.message);
        }
      } else {
        setError("An unexpected error occurred during image generation");
      }
    } finally {
      setIsImageLoading(false);
    }
  };

  const saveBlogPost = () => {
    if (!blogTitle.trim()) {
      alert("Please enter a title for your blog post");
      return;
    }

    try {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: blogTitle,
        content: blogContent,
        date: new Date().toISOString(),
      };

      const existingPosts = JSON.parse(
        localStorage.getItem("blogPosts") || "[]"
      );
      localStorage.setItem(
        "blogPosts",
        JSON.stringify([...existingPosts, newPost])
      );

      setBlogTitle("");
      setShowSaveForm(false);
      alert("Blog post saved successfully!");
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog post. Please try again.");
    }
  };

  return (
    <main style={mainStyle}>
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
                onClick={generateBlogContent}
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
                  ...(isImageLoading
                    ? { opacity: 0.7, cursor: "not-allowed" }
                    : {}),
                  ...(hoveredGenerateImageButton ? buttonHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredGenerateImageButton(true)}
                onMouseLeave={() => setHoveredGenerateImageButton(false)}
                onClick={generateImage}
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

      {/* Display generated content */}
      {(blogContent || generatedImageUrl) && (
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
                style={{
                  ...saveButtonStyle,
                  ...(hoveredSaveButton ? saveButtonHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredSaveButton(true)}
                onMouseLeave={() => setHoveredSaveButton(false)}
              >
                Save Blog Post
              </button>
            </div>
          )}
          {blogContent && (
            <div style={blogContentStyle}>
              {blogContent.split("\n").map((paragraph, index) => (
                <p key={index} style={paragraphStyle}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          {generatedImageUrl && (
            <div style={imageContainerStyle}>
              {isImageLoading && <div>Loading image...</div>}
              <img
                src={generatedImageUrl}
                alt="Generated content"
                style={generatedImageStyle}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  console.error("Image loading error:", e);
                  // Try fallback URL format if the first attempt fails
                  const target = e.target as HTMLImageElement;
                  if (
                    !target.dataset.retried &&
                    target.src.includes("imgproxy")
                  ) {
                    target.dataset.retried = "true";
                    target.src = target.src.replace("imgproxy/", "");
                  } else {
                    setError(
                      "Error loading the generated image. Please try again."
                    );
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

// Styles
const mainStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
  color: "#333",
  padding: "20px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  marginBottom: "20px",
  color: "#333",
};

const optionsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#F28A2E",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const modalOverlayStyle: React.CSSProperties = {
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

const modalStyle: React.CSSProperties = {
  backgroundColor: "#FFF",
  padding: "20px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
  textAlign: "center",
};

const modalButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginTop: "15px",
};

const buttonHoverStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#FF5F1F", // Lighter shade for hover
  transform: "scale(1.05)", // Slightly increase size on hover
};

const closeButtonHoverStyle: React.CSSProperties = {
  backgroundColor: "rgb(85, 99, 104)",
  transform: "scale(1.05)",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  height: "150px",
  borderRadius: "5px",
  fontSize: "16px",
  border: "1px solid #D3CBC2",
  marginBottom: "15px",
  resize: "vertical",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  marginTop: "10px",
  textAlign: "center",
  fontSize: "14px",
  padding: "10px",
  backgroundColor: "#ffebee",
  borderRadius: "4px",
};

const closeButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

const saveButtonHoverStyle: React.CSSProperties = {
  backgroundColor: "#45A049", // Lighter green shade for hover
  transform: "scale(1.05)", // Slightly increase size on hover
};

const resultStyle: React.CSSProperties = {
  width: "80%",
  maxWidth: "800px",
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  marginTop: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const saveFormStyle: React.CSSProperties = {
  marginBottom: "20px",
  display: "flex",
  gap: "10px",
  width: "100%",
};

const titleInputStyle: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #D3CBC2",
};

const saveButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const blogContentStyle: React.CSSProperties = {
  lineHeight: "1.6",
  color: "#333",
};

const paragraphStyle: React.CSSProperties = {
  marginBottom: "16px",
  fontSize: "16px",
  lineHeight: "1.6",
};

const imageContainerStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const generatedImageStyle: React.CSSProperties = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default MainSection;