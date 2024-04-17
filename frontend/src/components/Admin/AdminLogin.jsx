import React from 'react'
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const baseURL = 'https://grocery-store-td25.onrender.com';
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            admin: e.target[0].value,
            password: e.target[1].value
        }

        try {
            let res = await fetch(baseURL + "/admin", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            });
            let returnData = await res.json();
            if (returnData === 1) {
                navigate("/admin");
            } else {
                alert("Sai tài khoản hoặc mật khẩu")
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div>
                <header className="header-a">
                </header>
                <div className="background-a">
                </div>
                <div id="container-a">
                    <div className="content-a">
                        <h2 className="logo-a"><i className="bx bxl-firebase" />My store</h2>
                        <div className="text-sci-a">
                            <h2>Wellcome! <br /> <span>To Admin Website.</span></h2>
                            <p>Have a nice day!</p>
                        </div>
                    </div>
                    <div className="log-box-a">
                        <div className="form-box-a login-a">
                            <form action="#" onSubmit={(e) => handleLogin(e)}>
                                <h2>Sign In</h2>
                                <div className="input-box-a">
                                    <span className="icon-a"><i className="bx bxs-envelope" /></span>
                                    <input type="text" required name="admin" />
                                    <label>Admin</label>
                                </div>
                                <div className="input-box-a">
                                    <span className="icon-a"><i className="bx bxs-lock-alt" /></span>
                                    <input type="password" required name="password" />
                                    <label>Password</label>
                                </div>
                                <button type="submit" className="btn-a">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminLogin