import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const baseURL = 'https://grocery-store-td25.onrender.com';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let login = {
            email: e.target[0].value,
            password: e.target[1].value
        }

        try {
            let res = await fetch(baseURL + "/user/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(login)
            });
            let data = await res.json();
            console.log(data.status, typeof data.status)
            console.log(data)
            if (data.user_id === undefined) {
                alert("Sai tài khoản hoặc mật khẩu")
            } else {
                if (data.status === true) {
                    const action = {
                        type: "USER_LOGIN",
                        payload: data
                    }
                    dispatch(action);
                    navigate("/");
                } else {
                    alert("Tài khoản này đã bị khóa do vi phạm.")
                }
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div id="body">
                <div className="body-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="login d-flex align-items-center justify-content-center">
                                    <form action onSubmit={(e) => handleSubmit(e)}>
                                        <h3>Đăng nhập</h3>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" id="email" placeholder="nhập email" required />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" placeholder="nhập mật khẩu" required />
                                        </div>
                                        <div className="form-check d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center save-acc">
                                                <input type="checkbox" />
                                                <p>Lưu tài khoản.</p>
                                            </div>
                                            <a>Quên mật khẩu.</a>
                                        </div>
                                        <button type="submit" className="btn btn-success">Đăng nhập</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login