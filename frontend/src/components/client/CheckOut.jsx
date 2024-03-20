import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import transCurrency from '../../../public/constant/transCurency';

const CheckOut = () => {

    const products = useSelector(state => state.miniCart) || [];
    const userLogin = useSelector(status => status.userLogin) || [];

    const [changeInfo, setChangInfo] = useState({
        receive_name: "",
        receive_phone: "",
        receive_address: "",
        note: ""
    });

    const dispatch = useDispatch();
    const naviagte = useNavigate();

    const total = products.map(e => parseInt(e.unit_price) * parseInt(e.order_quantity)).reduce((a, b) => a + b, 0)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let orderProducts = products.map((i) => {
            delete i.image;
            return i;
        })
        let order = {
            receive_name: changeInfo.receive_name === "" ? userLogin.fullname : changeInfo.receive_name,
            receive_phone: changeInfo.receive_phone === "" ? userLogin.phone : changeInfo.receive_phone,
            receive_address: changeInfo.receive_address === "" ? userLogin.address : changeInfo.receive_address,
            note: changeInfo.note,
            productInfo: orderProducts,
            total_price: total,
            user_id: userLogin.user_id
        }
        try {
            let res = await fetch("http://localhost:3000/order", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(order)

            });
            let data = await res.json();

            if (data === 0) {
                alert("đã xảy ra lỗi, vui lòng thử lại sau");
            } else {
                alert("đặt hàng thành công");

                const action = {
                    type: "DELETE-KEY",
                    key: userLogin.email
                }
                dispatch(action);
                naviagte('/order');
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
                            <div className="col-xl-7">
                                <div className="user-info">
                                    <h3>Điền thông tin</h3>
                                    <form action onSubmit={(e) => handleSubmit(e)}>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="receive_name">Tên người nhận</label>
                                            <input type="text" id="receive_name" name="receive_name" placeholder="nhập tên" required
                                                defaultValue={userLogin.fullname}
                                                onChange={(e) => setChangInfo({ ...changeInfo, receive_name: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="receive_phone">Số điện thoại</label>
                                            <input type="tel" id="receive_phone" name="receive_phone" pattern="[0-9]{10}" placeholder="0123-456-789" required
                                                defaultValue={userLogin.phone}
                                                onChange={(e) => setChangInfo({ ...changeInfo, receive_phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="receive_address">Địa chỉ</label>
                                            <input type="text" id="receive_address" name="receive_address" placeholder="nhập địa chỉ" required
                                                defaultValue={userLogin.address}
                                                onChange={(e) => setChangInfo({ ...changeInfo, receive_address: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-item d-flex flex-column">
                                            <label htmlFor="note">Ghi chú</label>
                                            <input type="text" id="note" name="note" placeholder="..."
                                                onChange={(e) => setChangInfo({ ...changeInfo, note: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-success" >Đặt hàng</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-xl-5">
                                <div className="products-info">
                                    <h3>Thông tin sản phẩm</h3>
                                    <div className="products-info-items">

                                        {products.length === 0 ? <></> :
                                            products?.map((i, index) =>
                                                <div className="products-info-item d-flex align-items-center justify-content-between" key={index}>
                                                    <span>{i.product_name}</span>
                                                    <span>x{i.order_quantity}</span>
                                                    <span>:</span>
                                                    <span>
                                                        {transCurrency(i.unit_price * i.order_quantity)}
                                                    </span>
                                                </div>
                                            )
                                        }


                                    </div>
                                    <div className="products-info-total">
                                        <h5>Tổng:
                                            {transCurrency(total)}
                                        </h5>
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

export default CheckOut