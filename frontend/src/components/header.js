import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = ({ isAuthenticated, handleLogout }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/login");
  };
  return (
    <header style={headerStyle}>
      <NavLink to="/" style={logoStyle}>
        Blog Writer
      </NavLink>
      <nav>
        <ul style={navStyle}>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive
                  ? activeLinkStyle
                  : {
                      ...linkStyle,
                      ...(hoveredLink === "home" ? linkHoverStyle : {}),
                    }
              }
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Home
            </NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/blogs"
                  style={({ isActive }) =>
                    isActive
                      ? activeLinkStyle
                      : {
                          ...linkStyle,
                          ...(hoveredLink === "blogs" ? linkHoverStyle : {}),
                        }
                  }
                  onMouseEnter={() => setHoveredLink("blogs")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myblogs"
                  style={({ isActive }) =>
                    isActive
                      ? activeLinkStyle
                      : {
                          ...linkStyle,
                          ...(hoveredLink === "myblogs" ? linkHoverStyle : {}),
                        }
                  }
                  onMouseEnter={() => setHoveredLink("myblogs")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  My Blogs
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/about"
              style={({ isActive }) =>
                isActive
                  ? activeLinkStyle
                  : {
                      ...linkStyle,
                      ...(hoveredLink === "about" ? linkHoverStyle : {}),
                    }
              }
              onMouseEnter={() => setHoveredLink("about")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              About
            </NavLink>
          </li>
          <li>
            {isAuthenticated ? (
              <button onClick={logoutAndRedirect} style={buttonStyle}>
                <LogOut style={iconStyle} size={20} />
              </button>
            ) : (
              <NavLink
                to="/login"
                style={({ isActive }) =>
                  isActive
                    ? activeLinkStyle
                    : {
                        ...linkStyle,
                        ...(hoveredLink === "login" ? linkHoverStyle : {}),
                      }
                }
                onMouseEnter={() => setHoveredLink("login")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#8A7967",
  color: "#F4F1DE",
};
const buttonStyle = {
  padding: "4px 12px",
  border: "#007BFF",
  backgroundColor: "#F28A2E",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "4px",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
};

const iconStyle = {
  marginRight: "8px",
};

const logoStyle = {
  fontWeight: "bold",
  fontSize: "24px",
  color: "#F4F1DE",
  textDecoration: "none",
};

const navStyle = {
  listStyleType: "none",
  display: "flex",
  gap: "20px",
  fontWeight: "bold",
};

const linkStyle = {
  color: "#F4F1DE",
  textDecoration: "none",
  fontSize: "16px",
  transition: "color 0.3s",
  padding: "8px 12px",
  borderRadius: "5px",
};

const activeLinkStyle = {
  backgroundColor: "#F28A2E",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "8px 12px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  textDecoration: "none",
};

const linkHoverStyle = {
  backgroundColor: "#FF5F1F",
  color: "white",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
};

export default Header;
