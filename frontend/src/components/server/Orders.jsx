import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Modal, Form, Input, Pagination, Select } from 'antd';
import transCurrency from '../../../public/constant/transCurency';
import stringToSlug from '../../../public/constant/slug';

const Orders = () => {
    const baseURL = 'https://grocery-store-td25.onrender.com';
    const [orders, setOrders] = useState([]);
    const [orderProducts, setOrderProducts] = useState([])
    const [searchOrder, setSearchOrder] = useState([])

    const fetchOrder = async () => {
        try {
            let response = await fetch(baseURL + "/order");
            let data = await response.json();
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrder()
    }, [])

    // UPDATE
    const [openEdit, setOpenEdit] = useState(false);
    const [formEdit] = Form.useForm();
    const showModalEdit = () => {
        setOpenEdit(true);
    };

    const hideModalEdit = () => {
        setOpenEdit(false);
    };

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        let data = orders.find((i) => i.order_id === +id);
        formEdit.setFieldsValue({
            order_id: data.order_id,
            receive_name: data.receive_name,
            receive_address: data.receive_address,
            receive_phone: data.receive_phone,
            note: data.note
        });

        showModalEdit();
    }

    const onFinish = async (data) => {
        if (data.note === null) {
            data.note = " "
        }
        data.status = Number(data.status);
        try {
            let res = await fetch(baseURL + `/order`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            });
            fetchOrder();
            // alert('cập nhật thành công');
            hideModalEdit();
        } catch (error) {
            console.log(error);
        }
    }

    // SHOW PRODUCTS 
    const [openP, setOpenP] = useState(false);
    const [formP] = Form.useForm();
    const showModalP = () => {
        setOpenP(true);
    };

    const hideModalP = () => {
        setOpenP(false);
    };

    const handleShowProduct = async (e, id) => {
        e.preventDefault();
        let data = orders.find((i) => i.order_id === +id);
        setOrderProducts(data.orderProducts);
        showModalP();
    }

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = orders?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(orders?.length / recordsPerPage);
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

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchOrder.length !== 0) {
            let response = await fetch(baseURL + "/order");
            let data = await response.json();
            const returnData = data?.filter((i) => { return stringToSlug(i.receive_name).includes(stringToSlug(searchOrder[0].receive_name)) })
            setOrders(returnData);
        } else {
            fetchOrder();
        }
        // .replace(/\s+/g, ' ') 
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
    return (
        <>
            <div className="body-admin m-0">
                <div className="container container-margin-0">
                    <div className="row">
                        <div className="containt-body col-xxl-12">
                            <div className="table-nav d-flex align-items-center mt-4 mb-4">
                                <div className="search d-flex align-items-center justify-content-between">
                                    <input type="text" className="no-border me-2"
                                        onChange={(e) => setSearchOrder([{
                                            receive_name: e.target.value
                                        }])}
                                    />
                                    <button className="btn btn-success"
                                        onClick={(e) => handleSearch(e)}
                                    >Tìm kiếm</button>
                                </div>
                            </div>
                            <div className="body-table d-flex flex-column">
                                <table className="table table-bordered table-height">
                                    <thead>
                                        <tr>
                                            <td style={{ width: '5%' }}>order_id</td>
                                            <td style={{ width: '10%' }}>serial_number</td>
                                            <td style={{ width: '10%' }}>total_price</td>
                                            <td style={{ width: '10%' }}>note</td>
                                            <td style={{ width: '5%' }}>status</td>
                                            <td style={{ width: '5%' }}>receive_name</td>
                                            <td style={{ width: '5%' }}>receive_phone</td>
                                            <td style={{ width: '20%' }}>receive_address</td>
                                            <td style={{ width: '10%' }}>time create</td>
                                            <td style={{ width: '10%' }}>time update</td>
                                            <td />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            records?.map((i, index) =>
                                                <tr key={index}>
                                                    <td>{i.order_id}</td>
                                                    <td>{i.serial_number}</td>
                                                    <td>{transCurrency(i.total_price)}</td>
                                                    <td>{i.note}</td>
                                                    <td>{transStatus(i.status)}</td>
                                                    <td>{i.receive_name}</td>
                                                    <td>{i.receive_phone}</td>
                                                    <td>{i.receive_address}</td>
                                                    <td>{i.create_at}</td>
                                                    <td>{i.update_at}</td>
                                                    <td>
                                                        <button className="btn btn-primary mb-2" onClick={(e) => handleUpdate(e, i.order_id)}>Update</button>
                                                        <button className="btn btn-success" onClick={(e) => handleShowProduct(e, i.order_id)}>Products</button>
                                                    </td>
                                                </tr>
                                            )}

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

                                {/* edit modal */}
                                <Modal
                                    title="Modal Edit"
                                    open={openEdit}
                                    onOk={hideModalEdit}
                                    onCancel={hideModalEdit}
                                    footer={null}
                                >

                                    <Form name="form" layout="vertical"
                                        form={formEdit}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item label="order_id" name="order_id" >
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="receive_name" name="receive_name" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="receive_address" name="receive_address" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="receive_phone" name="receive_phone" >
                                            <Input type='tel' />
                                        </Form.Item>
                                        <Form.Item label="note" name="note" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="status" name="status" >
                                            <Select  >
                                                <Select.Option value="1">Chờ xác thực</Select.Option>
                                                <Select.Option value="2">Đã xác thực</Select.Option>
                                                <Select.Option value="3">Đang giao</Select.Option>
                                                <Select.Option value="4">Đã giao</Select.Option>
                                                <Select.Option value="5">Đã thanh toán</Select.Option>
                                                <Select.Option value="6">Đã hoàn tất</Select.Option>
                                                <Select.Option value="7">Bị từ chối</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit update
                                        </Button>
                                        {/* <button >Submit update</button> */}
                                    </Form>
                                </Modal>
                            </div>



                            {/* show product */}
                            <Modal
                                title="Modal show"
                                open={openP}
                                onOk={hideModalP}
                                onCancel={hideModalP}
                                footer={null}
                            >

                                <Form name="form" layout="vertical"
                                    form={formEdit}
                                    onFinish={onFinish}
                                >
                                    <div className="body-table">
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <td style={{ width: '25%' }}>order_product_id</td>
                                                    <td style={{ width: '25%' }}>product_name</td>
                                                    <td style={{ width: '25%' }}>unit_price</td>
                                                    <td style={{ width: '25%' }}>order_quantity</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orderProducts?.map((i, index) =>
                                                        <tr key={index}>
                                                            <td>{i.order_product_id}</td>
                                                            <td>{i.product_name}</td>
                                                            <td>{i.unit_price}</td>
                                                            <td>{i.order_quantity}</td>
                                                        </tr>

                                                    )
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </Form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Orders