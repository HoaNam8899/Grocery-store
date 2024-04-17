import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangeUserInfo = () => {

    const baseURL = 'https://grocery-store-td25.onrender.com';
    const navigate = useNavigate();

    const userLogin = useSelector(status => status.userLogin) || [];
    const [changeInfo, setChangInfo] = useState({
        username: "",
        phone: "",
        address: "",
        fullname: ""
    });
    const [changePassword, setChangePassword] = useState({
        password: "",
        oldPassword: "",
        confirmPassword: ""
    })

    const dispatch = useDispatch();

    const handleSubmitChangeInfo = async (e) => {
        e.preventDefault();
        if (userLogin.length !== 0) {
            let userInfo = {
                username: changeInfo.username === "" ? userLogin.username : changeInfo.username,
                fullname: changeInfo.fullname === "" ? userLogin.fullname : changeInfo.fullname,
                phone: changeInfo.phone === "" ? userLogin.phone : changeInfo.phone,
                address: changeInfo.address === "" ? userLogin.address : changeInfo.address
            }
            try {
                let res = await fetch(`${baseURL}/user/update/${userLogin.user_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(userInfo)

                });
                const data = await res.json();
                if (data.user_id !== undefined) {
                    const action = {
                        type: "USER_LOGIN",
                        payload: data
                    }
                    dispatch(action);
                    alert("Thay đổi thông tin thành công");
                } else {
                    alert("Thay đổi KHÔNG thành công");
                }


            } catch (error) {
                console.log(error);
            }
        }

    }

    const changeOldPassword = async (e) => {
        e.preventDefault();
        if (changePassword.password === "" || changePassword.oldPassword === "" || changePassword.confirmPassword === "") {
            alert("Vui lòng nhập đủ thông tin");
        } else if (changePassword.password !== changePassword.confirmPassword) {
            alert("Xác nhận mật khẩu sai");
        } else {
            const passChange = {
                password: changePassword.password,
                oldPassword: changePassword.oldPassword
            }
            try {
                let res = await fetch(`${baseURL}/user/updatePass/${userLogin.user_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(passChange)

                });
                const data = await res.json();
                if (data === 0) {
                    alert("Sai mật khẩu hiện tại");
                } else if (data === 1) {
                    alert("Đổi mật khẩu thành công");
                    setChangePassword({
                        password: "",
                        oldPassword: "",
                        confirmPassword: ""
                    });
                    navigate("/changeUserInfo")
                } else {
                    alert("Mật khẩu mới phải từ 8 đến 20 kí tự")
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div id="body">
                <div className="body-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-7">
                                <div className="user-info">
                                    <h3>Thông tin</h3>
                                    <form action>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="username">Tên người dùng</label>
                                            <input type="text" id="username" name="username" placeholder="..." required
                                                defaultValue={userLogin.username}
                                                onChange={(e) => setChangInfo({ ...changeInfo, username: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="fullname">Họ tên</label>
                                            <input type="text" id="fullname" name="fullname" placeholder="..." required
                                                defaultValue={userLogin.fullname}
                                                onChange={(e) => setChangInfo({ ...changeInfo, fullname: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="phone">Số điện thoại</label>
                                            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="..." required
                                                defaultValue={userLogin.phone}
                                                onChange={(e) => setChangInfo({ ...changeInfo, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input type="text" id="address" name="address" placeholder="..." required
                                                defaultValue={userLogin.address}
                                                onChange={(e) => setChangInfo({ ...changeInfo, address: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-success"
                                            onClick={(e) => handleSubmitChangeInfo(e)}
                                        >Thay đổi</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-xl-5">
                                <div className="user-info">
                                    <h3>Đổi mật khẩu</h3>
                                    <form action>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="newPassword">Mật khẩu mới</label>
                                            <input type="password" id="newPassword" name="newPassword" placeholder="..." required
                                                onChange={(e) => setChangePassword({ ...changePassword, password: e.target.value })}
                                            />
                                            <span style={{ fontSize: "14px" }}><i> Lưu ý: Mật khẩu dài từ 8 đến 20 kí tự</i></span>
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="confirmPassword">Nhập lại mật khẩu mới để xác nhận</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="..." required
                                                onChange={(e) => setChangePassword({ ...changePassword, confirmPassword: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="oldPassword">Mật khẩu cũ</label>
                                            <input type="password" id="oldPassword" name="oldPassword" placeholder="..." required
                                                onChange={(e) => setChangePassword({ ...changePassword, oldPassword: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <p>
                                                lưu ý: mật khẩu phải tối thiểu 8 kí tự và tối đa 20 kí tự
                                            </p>
                                        </div>
                                        <button type="submit" className="btn btn-success"
                                            onClick={(e) => changeOldPassword(e)}
                                        >Thay đổi</button>
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

export default ChangeUserInfo