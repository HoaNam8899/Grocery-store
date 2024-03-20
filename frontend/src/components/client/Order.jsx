import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import transCurrency from '../../../public/constant/transCurency';

const Order = () => {
    const userLogin = useSelector(status => status.userLogin) || [];

    const [productOrders, setOrders] = useState([]);
    console.log(productOrders);
    const [detailsOrder, setDetailsOrder] = useState({})

    const fetchOrder = async () => {
        try {
            let response = await fetch(`http://localhost:3000/user/userOrder/${userLogin.user_id}`);
            let data = await response.json();
            setOrders(data);
            // console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrder()
    }, [])

    const handleDetailsOrder = (e, id) => {
        e.preventDefault();
        let data = productOrders[0].orders.find((i) => i.order_id === +id)
        if (data) {
            setDetailsOrder(data);
        }
    }

    const transStatus = (number) => {
        if (number === 1) {
            return "Chờ xử lý"
        } else if (number === 2) {
            return "Đã xác thực"
        } else if (number === 3) {
            return "Đang giao hàng"
        } else if (number === 4) {
            return "Đã giao hàng"
        } else if (number === 5) {
            return "Đã thanh toán"
        } else if (number === 6) {
            return "Hoàn tất"
        } else if (number === 7) {
            return "Bị từ chối"
        }
    }

    // pagination

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = productOrders.length === 0 ? [] : productOrders[0].orders?.slice(firstIndex, lastIndex);
    const npage = Math.ceil((productOrders.length === 0 ? 0 : productOrders[0].orders?.length) / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changCpage(id) {
        setCurrentPage(id);
    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <div id="body">
                <div className="body-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="orders  d-flex flex-column">
                                    <h1>Đơn hàng</h1>
                                    <table className="checkout-table table text-center table-height-client">
                                        <thead>
                                            <tr>
                                                <td style={{ width: '25%' }}>Mã đơn hàng</td>
                                                <td style={{ width: '15%' }}>Người nhận</td>
                                                <td style={{ width: '10%' }}>Trạng thái</td>
                                                <td style={{ width: '20%' }}>Thời gian tạo</td>
                                                <td style={{ width: '15%' }}>Tổng tiền</td>
                                                <td >Xem chi tiết</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productOrders.length === 0 ?
                                                <>
                                                </>
                                                :
                                                records.map((i, index) =>
                                                    <tr key={index}>
                                                        <td>{i.serial_number}</td>
                                                        <td>{i.receive_name}</td>
                                                        <td>{transStatus(i.status)}</td>
                                                        <td>{i.create_at}</td>
                                                        <td>
                                                            {transCurrency(i.total_price)}
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"
                                                                onClick={(e) => handleDetailsOrder(e, i.order_id)}
                                                            >
                                                                Chi tiết
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                        </tbody>
                                    </table>

                                    {/* pagination */}
                                    <nav className='mt-auto align-self-center'>
                                        <ul className='pagination'>
                                            <li className='page-item'>
                                                <a className='page-link' href="#"
                                                    onClick={prePage}
                                                > Prev</a>
                                            </li>

                                            {
                                                numbers?.map((n, i) =>
                                                    <li className={`page-item ${currentPage === n ? "active" : " "}`} key={i}>
                                                        <a className='page-link' href="#"
                                                            onClick={() => changCpage(n)}
                                                        >{n}</a>
                                                    </li>
                                                )
                                            }
                                            <li className='page-item'>
                                                <a className='page-link' href="#"
                                                    onClick={nextPage}
                                                > Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                    {/* Button trigger modal */}
                                    {/* Modal */}
                                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Chi tiết đơn hàng</h5>
                                                    <button type="button" className="close btn btn-close-modal" data-bs-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="modal-item">
                                                        {detailsOrder.order_id === undefined ?
                                                            <>
                                                            </>
                                                            :
                                                            <div className="modal-address">
                                                                <p>Tên người nhận: {detailsOrder.receive_name}</p>
                                                                <p>Địa chỉ: {detailsOrder.receive_address}</p>
                                                                <p>Số điện thoại: {detailsOrder.receive_phone}</p>
                                                                <p>Thời gian mua: {detailsOrder.create_at}</p>
                                                                <p>Mã đơn: {detailsOrder.serial_number}</p>
                                                                <p>Trạng thái: {transStatus(detailsOrder.status)}</p>
                                                                <p>Ghi chú: {detailsOrder.note}</p>
                                                            </div>
                                                        }

                                                        <div className="modal-products">
                                                            {
                                                                detailsOrder.orderProducts === undefined ?
                                                                    <></>
                                                                    :
                                                                    detailsOrder.orderProducts.map((i, index) =>
                                                                        <div className="modal-product_item d-flex align-items-center" key={index}>
                                                                            <span className='d-flex align-items-center justify-content-between'>
                                                                                <p>{i.product_name}</p>

                                                                                <p>x{i.order_quantity}</p>
                                                                            </span>

                                                                            <p>
                                                                                {transCurrency(i.unit_price * i.order_quantity)}
                                                                            </p>
                                                                        </div>
                                                                    )

                                                            }

                                                        </div>
                                                        <div className="modal-total">
                                                            {detailsOrder.total_price === undefined ? <></> :
                                                                <p>Tổng tiền:
                                                                    {transCurrency(detailsOrder.total_price)}
                                                                </p>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
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

export default Order