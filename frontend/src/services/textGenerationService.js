// textGenerationService.js
const API_KEY = process.env.REACT_APP_API_KEY;

export const generateBlogText = async (userInput) => {
  if (!API_KEY) {
    console.error('API key is missing. Please check your .env configuration');
    return {
      blogContent: "",
      error: "API key is not configured. Please check your environment settings."
    };
  }

  try {
    console.log("Using API key (first 10 chars):", API_KEY.substring(0, 10) + "...");

    const response = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
          messages: [
            {
              role: "system",
              content: "You are a professional blog writer who creates well-structured, engaging blog posts.",
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
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      throw new Error(
        errorData.error?.message || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    console.log("API request successful");

    if (data.choices?.[0]?.message?.content) {
      return { blogContent: data.choices[0].message.content.trim() };
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    console.error("Full error details:", error);
    return {
      blogContent: "",
      error: error.message || "An unknown error occurred"
    };
  }
};