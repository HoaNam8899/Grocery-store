import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const baseURL = 'https://grocery-store-td25.onrender.com';
    // const [newUser, setNewUser] = useState([]);

    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(newUser)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
            username: e.target[2].value,
            fullname: e.target[3].value,
            phone: e.target[4].value,
            address: e.target[5].value,
        }
        console.log(e.target[1].value)
        try {
            let res = await fetch(baseURL + "/user/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(user)
            });
            let data = await res.json();
            if (data === 0) {
                alert("Email đã tồn tại");
            } else if (data === 1) {
                alert("Đăng kí thành công");
                navigate("/login");
            } else {
                alert('Mật khẩu tối thiểu 8 kí tự và tối đa 20 kí tự')
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
                                        <h3>Đăng kí</h3>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" id="email" name="email" placeholder="Nhập email" required
                                            // onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required
                                            // onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                            />
                                            <span style={{ fontSize: "14px" }}><i> Lưu ý: Mật khẩu dài từ 8 đến 20 kí tự</i></span>
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="username">Tên tài khoản</label>
                                            <input type="text" id="username" name="username" placeholder="Tên tài khoản" required
                                            // onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="fullname">Họ tên</label>
                                            <input type="text" id="fullname" name="fullname" placeholder="nhập họ tên" required
                                            // onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="phone">Số điện thoại</label>
                                            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0123-456-789" required
                                            // onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input type="text" id="address" name="address" placeholder="nhập địa chỉ" required
                                            // onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-success">Đăng kí</button>
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

export default Register