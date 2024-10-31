import React from "react";

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.description}>
        Welcome to Blog Writer! Our mission is to help writers, bloggers, and
        creatives bring their ideas to life. Whether you’re a seasoned writer or
        just starting out, we’re here to offer inspiration, tools, and resources
        to make your writing journey easier and more enjoyable.
      </p>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Story</h2>
        <p style={styles.sectionText}>
          Blog Writer was founded with the idea of creating a space for people
          to share their thoughts and ideas freely. We believe in the power of
          words to inspire, inform, and connect people from all around the
          world.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What We Offer</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            A clean, distraction-free writing environment
          </li>
          <li style={styles.listItem}>
            Tools to help you brainstorm and structure your content
          </li>
          <li style={styles.listItem}>
            Guidance on writing, editing, and publishing content
          </li>
        </ul>
      </section>

      <p style={styles.footerText}>
        Thank you for visiting! We hope you find this space inspiring and
        supportive.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textAlign: "center",
  },
  description: {
    fontSize: "1rem",
    lineHeight: "1.6",
    textAlign: "center",
    marginBottom: "2rem",
  },
  section: {
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  sectionText: {
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "1.5rem",
  },
  listItem: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },
  footerText: {
    marginTop: "2rem",
    textAlign: "center",
    fontStyle: "italic",
  },
};

export default AboutPage;
