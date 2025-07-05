import {Link} from "react-router-dom";
import {pageData} from "./pageData.ts";

export function Navbar() {
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
    </div>
  );
}