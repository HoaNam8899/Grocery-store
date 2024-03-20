
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import transCurrency from '../../../public/constant/transCurency';

const Header = () => {
    const products = useSelector(state => state.miniCart) || [];
    const userLogin = useSelector(status => status.userLogin) || [];
    const [currentUser, setCurrentUser] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const total = products.map(e => parseInt(e.unit_price) * parseInt(e.order_quantity)).reduce((a, b) => a + b, 0)

    const handleLogout = (e) => {
        e.preventDefault();

        const actionDelete = {
            type: "DELETE-KEY",
            key: userLogin.email
        }
        dispatch(actionDelete);

        const action = {
            type: "USER_LOGIN",
            payload: {}
        };
        dispatch(action);
        navigate("/");

    }

    const handleSubQT = (e, id) => {
        e.preventDefault();
        const action = {
            type: "SUB_QTY",
            payload: id,
            key: userLogin.email
        }
        dispatch(action)
    }

    const handleSumQT = (e, id) => {
        e.preventDefault();
        const action = {
            type: "SUM_QTY",
            payload: id,
            key: userLogin.email
        }
        dispatch(action)
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        const action = {
            type: "DELETE",
            payload: id,
            key: userLogin.email
        }
        dispatch(action)
    }


    return (
        <>
            <div id="header">
                <div className="navbar d-flex align-items-center px-5">
                    <div className="logo">
                        <img src="../../images/logo2s.jpg" alt="" onClick={(e) => navigate('/')} />
                    </div>
                    <div className="nav d-flex flex-column align-items-center">

                        <div>
                            <h4>Chào mừng đến với cửa hàng của chúng tôi</h4>
                        </div>
                    </div>
                    <div className="user d-flex align-items-center justify-content-between">

                        <img className="img-user" src="../../images/user.png" alt="" />
                        {/* <p>Username</p>
                        <a className="display-none login" onClick={() => navigate("/login")}>Login</a>
                        <a className="display-none regis" onClick={() => navigate("/register")}>Register</a> */}
                        {userLogin.user_id === undefined ?
                            <>
                                <p>Username</p>
                                <a className="display-none login" onClick={() => navigate("/login")}>Đăng nhập</a>
                                <a className="display-none regis" onClick={() => navigate("/register")}>Đăng kí</a>
                            </>
                            :
                            <>
                                {/* làm theo dõi đơn hàng ở đây */}
                                <span className="order-detail">{userLogin.username}
                                    <i class="bi bi-arrow-down"></i>
                                    <ul>
                                        <li onClick={(e) => navigate("/order")}>Đơn hàng của bạn</li>
                                        <li onClick={(e) => navigate("/changeUserInfo")}>Thông tin cá nhân</li>
                                        <li onClick={(e) => handleLogout(e)}>Đăng xuất</li>
                                    </ul>

                                </span>

                            </>
                        }

                        <i className="bi bi-cart cart-icon">
                            <span>{products.length}</span>
                            <div className="mini-cart d-flex flex-column justify-content-between">
                                <div className="mini-cart_items">
                                    {products?.map((i, index) =>
                                        <div className="item d-flex align-items-center justify-content-between" key={index}>
                                            <img src={`../../images/${i.image}`} alt="" />
                                            <div className="item-content">
                                                <h5 className="item-name">{i.product_name}</h5>
                                                <div className="item-qty d-flex align-items-center">
                                                    <h6 onClick={(e) => handleSubQT(e, i.product_id)}>-</h6>
                                                    <h6>{i.order_quantity}</h6>
                                                    <h6 onClick={(e) => handleSumQT(e, i.product_id)}>+</h6>
                                                </div>
                                            </div>
                                            <h5 onClick={(e) => handleDelete(e, i.product_id)}>x</h5>
                                        </div>
                                    )}
                                </div>
                                <div className="mini-cart_view d-flex align-items-end justify-content-between">
                                    {
                                        products?.length === 0 ?
                                            <div className='mini-cart-no_product d-flex align-items-center flex-column justify-content-center'>
                                                <img src="../../images/cart_png.png" alt="" />
                                                <h6>Không có sản phẩm nào</h6>
                                            </div>
                                            :
                                            <>
                                                <h6>Tổng tiền: {transCurrency(total)}</h6>
                                                <button className="btn btn-primary" onClick={() => navigate("/cart")}>Xem giỏ hàng</button>
                                            </>
                                    }

                                </div>
                            </div>
                        </i>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header