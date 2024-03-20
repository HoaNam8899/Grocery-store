import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import transCurrency from '../../../public/constant/transCurency';

const Cart = () => {
    const products = useSelector(state => state.miniCart) || [];
    const userLogin = useSelector(status => status.userLogin) || [];

    const dispatch = useDispatch();
    const naviagte = useNavigate();

    const total = products.map(e => parseInt(e.unit_price) * parseInt(e.order_quantity)).reduce((a, b) => a + b, 0)

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

    const handleCheckOut = (e) => {
        e.preventDefault();
        if (products.lenth === 0) {
            alert("Không có sản phẩm nào, quay lại shop để mua hàng")
        } else {
            naviagte("/checkOut")
        }
    }
    return (
        <>
            <div id="body">
                <div className="body-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="cart-product">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td style={{ width: '15%' }}>Ảnh</td>
                                                <td style={{ width: '20%' }}>Tên sản phẩm</td>
                                                <td style={{ width: '20%' }}>Số lượng</td>
                                                <td style={{ width: '15%' }}>Giá</td>
                                                <td style={{ width: '15%' }}>Tổng cộng</td>
                                                <td style={{ width: '15%' }}>Hành động</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((i, index) =>
                                                <tr key={index}>
                                                    <td>
                                                        <img src={`./images/${i.image}`} alt="" />
                                                    </td>
                                                    <td>{i.product_name}</td>
                                                    <td className="cart-qty">
                                                        <span onClick={(e) => handleSubQT(e, i.product_id)}>-</span>
                                                        {i.order_quantity}
                                                        <span onClick={(e) => handleSumQT(e, i.product_id)}>+</span>
                                                    </td>
                                                    <td> {transCurrency(i.unit_price)}</td>
                                                    <td> {transCurrency(i.unit_price * i.order_quantity)}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={(e) => handleDelete(e, i.product_id)}>Xóa</button>
                                                    </td>
                                                </tr>
                                            )}
                                            {/* <tr>
                                                <td>
                                                    <img src="./images//carot.jpg" alt="" />
                                                </td>
                                                <td>Cà rốt</td>
                                                <td className="cart-qty">
                                                    <span>-</span>
                                                    20
                                                    <span>+</span>
                                                </td>
                                                <td>20000đ</td>
                                                <td>400000đ</td>
                                                <td>
                                                    <button className="btn btn-danger">Xóa</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="./images//carot.jpg" alt="" />
                                                </td>
                                                <td>Cà rốt</td>
                                                <td className="cart-qty">
                                                    <span>-</span>
                                                    20
                                                    <span>+</span>
                                                </td>
                                                <td>20000đ</td>
                                                <td>400000đ</td>
                                                <td>
                                                    <button className="btn btn-danger">Xóa</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="./images//carot.jpg" alt="" />
                                                </td>
                                                <td>Cà rốt</td>
                                                <td className="cart-qty">
                                                    <span>-</span>
                                                    20
                                                    <span>+</span>
                                                </td>
                                                <td>20000đ</td>
                                                <td>400000đ</td>
                                                <td>
                                                    <button className="btn btn-danger">Xóa</button>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="cart-total">
                                    <div>
                                        <p>Tiền sản phẩm: {transCurrency(total)}</p>
                                        <p>Tiền ship: 0đ</p>
                                    </div>
                                    <div>
                                        <p>Tổng cộng: {transCurrency(total)}</p>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <button className="btn btn-success" onClick={() => naviagte("/")}>Quay lại mua hàng</button>
                                        <button className="btn btn-success" onClick={(e) => handleCheckOut(e)}>Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cart