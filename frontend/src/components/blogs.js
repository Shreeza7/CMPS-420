import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding AI and Its Impact",
    excerpt:
      "AI is transforming industries and shaping the future. In this post, we explore the implications of AI in our daily lives.",
    link: "/blogs/understanding-ai",
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt:
      "Web development is evolving rapidly. Discover the latest trends and technologies that are shaping the web.",
    link: "/blogs/future-of-web-development",
  },
  {
    id: 3,
    title: "Tips for Effective Blogging",
    excerpt:
      "Learn how to engage your audience and create compelling content that drives traffic to your blog.",
    link: "/blogs/tips-for-effective-bloggings",
  },
];

const BlogPage = () => {
  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Blogs</h1>
      <div style={blogListStyle}>
        {blogPosts.map((post) => (
          <div key={post.id} style={blogPostStyle}>
            <h2 style={postTitleStyle}>{post.title}</h2>
            <p style={postExcerptStyle}>{post.excerpt}</p>
            <a href={post.link} style={readMoreStyle}>
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

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
};

const postExcerptStyle = {
  fontSize: "16px",
  marginBottom: "15px",
};

const readMoreStyle = {
  color: "#88BDBC",
  textDecoration: "none",
  fontWeight: "bold",
};

export default BlogPage;
