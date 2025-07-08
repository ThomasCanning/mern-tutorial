import {Link, useNavigate} from "react-router-dom";
import {pageData} from "./pageData.ts";

export function Navbar() {

  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("User");
    navigate("/");
  }

  return (
    <div className="navbar">
        {pageData.map((page)=> {
            return (
                <Link key={page.path} to={page.path} className="navItem">
                    <button>
                        {page.name}
                    </button>
                </Link>
            )
        })}
      <button onClick={handleLogout} className="navItem">
        Logout
      </button>
    </div>
  );
}