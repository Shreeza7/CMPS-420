const API_KEY = process.env.REACT_APP_API_KEY;

export const generateImage = async (imagePrompt) => {
  if (!API_KEY) {
    console.error('API key is missing. Please check your .env configuration');
    return {
      imageUrl: "",
      error: "API key is not configured. Please check your environment settings."
    };
  }

  try {
    console.log("Using API key (first 10 chars):", API_KEY.substring(0, 10) + "...");

    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt: imagePrompt,
        steps: 4,
        n: 1,
        height: 1024,
        width: 1024,
        response_format: "b64_json",
      }),
    };

    const response = await fetch(
      "https://api.together.xyz/v1/images/generations",
      options
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

    if (data.data?.[0]?.b64_json) {
      return { imageUrl: `data:image/jpeg;base64,${data.data[0].b64_json}` };
    } else if (data.data?.[0]?.url) {
      const proxyUrl = `https://api.together.xyz/imgproxy/${encodeURIComponent(data.data[0].url)}`;
      return { imageUrl: proxyUrl };
    } else {
      throw new Error("Could not find image data in the response");
    }
  } catch (error) {
    console.error("Image generation error:", error);
    return {
      imageUrl: "",
      error: error.message || "An unexpected error occurred during image generation"
    };
  }
};