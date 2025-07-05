import '../../../App.css'
import CreateUser from "@/features/blog/components/CreateUser.tsx";
import {useState} from "react";
import Login from "@/features/blog/components/Login.tsx";

function Landing() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <>
            {isLogin ?
                <>
                    <Login/>
                    <button className="bg-red-500" onClick={() => setIsLogin(false)}>Create new Account</button>
                </> :
                <>
                    <CreateUser/>
                    <button className="bg-red-500" onClick={() => setIsLogin(true)}>Login</button>
                </>
            }
        </>
    )
}

export default Landing
