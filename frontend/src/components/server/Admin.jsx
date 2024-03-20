import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Space, Table, Modal, Form, Input, Pagination, Select } from 'antd';
import stringToSlug from '../../../public/constant/slug';
import transCurrency from '../../../public/constant/transCurency';

const Admin = () => {
    const navigate = useNavigate();
    let [products, setProducts] = useState([]);
    let [updateProduct, setUpdateProduct] = useState();
    let [productStatus, setProductStatus] = useState({
        status: 'true'
    })

    const [searchProduct, setSearchProduct] = useState({
        product_name: " "
    })

    const fetchProduct = async () => {
        try {
            let response = await fetch("http://localhost:3000/product/all");
            let data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3000/product", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ product_id: id })

            });
            fetchProduct();
        } catch (error) {
            console.log(error);
        }
    }

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
        let response = await fetch(`http://localhost:3000/product/${id}`);
        let data = await response.json();
        setUpdateProduct({
            status: `${data.status}`
        });
        formEdit.setFieldsValue({
            product_id: data.product_id,
            product_name: data.product_name,
            description: data.description,
            unit_price: data.unit_price,
            stock_quantity: data.stock_quantity
        });
        showModalEdit();
    }

    const initialValues = {
        status: productStatus?.status
    };
    const onFinish = async (data) => {
        try {
            let res = await fetch("http://localhost:3000/product", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            });
            fetchProduct();
            alert('cập nhật thành công')
            hideModalEdit();
        } catch (error) {
            console.log(error);
        }
    }


    const handleSearch = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:3000/product/all");
        let data = await response.json();
        if (searchProduct.product_name === "") {
            setProducts(data);
        } else {
            const returnData = data?.filter((i) => { return stringToSlug(i.product_name).includes(stringToSlug(searchProduct.product_name)) && i.status === true })
            setProducts(returnData);
        }

    }

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = products?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(products?.length / recordsPerPage);
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


    const handleSearchOption = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:3000/product/all");
        let data = await response.json();
        const numberOption = e.target.value;
        if (numberOption === "0") {
            setProducts(data);
        } else if (numberOption === "2") {
            let dataSorted = data.sort(function (a, b) {
                return parseFloat(a.stock_quantity) - parseFloat(b.stock_quantity);
            });
            setProducts(dataSorted);
        } else if (numberOption === "3") {
            let dataSorted = data.sort(function (a, b) {
                return parseFloat(a.unit_price) - parseFloat(b.unit_price);
            });
            setProducts(dataSorted);
        } else if (numberOption === "4") {
            let dataSorted = data.sort(function (a, b) {
                return new Date(a.create_at) - new Date(b.create_at);
            });
            setProducts(dataSorted);
        }
    }


    return (
        <>
            <div className="body-admin m-0">
                <div className="container container-margin-0">
                    <div className="row">
                        <div className="containt-body col-xxl-12">
                            <div className="table-nav d-flex align-items-center mt-4 mb-4">
                                <button className="btn btn-primary" onClick={() => navigate('/admin/add-product')}>Thêm mới</button>
                                <div className="search d-flex align-items-center justify-content-between me-5">
                                    <input type="text" className="no-border me-2"
                                        onChange={(e) => setSearchProduct({ product_name: e.target.value })}
                                    />
                                    <button className="btn btn-success"
                                        onClick={(e) => handleSearch(e)}
                                    >Tìm kiếm</button>
                                </div>
                                <div className="search d-flex align-items-center justify-content-between">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        defaultValue={'DEFAULT'}
                                        onChange={handleSearchOption}
                                    >
                                        <option disabled value="DEFAULT">Sắp xếp theo</option>
                                        <option value={0}>Mặc định</option>
                                        <option value={2}>Số Lượng tồn kho</option>
                                        <option value={3}>Giá</option>
                                        <option value={4}>Ngày tạo</option>
                                    </select>
                                    <button className="btn btn-info">Sắp Xếp</button>
                                </div>
                            </div>
                            <div className="body-table d-flex flex-column">
                                <table className="table table-bordered table-height">
                                    <thead>
                                        <tr>
                                            <td style={{ width: "5%" }}>produc_id</td>
                                            <td style={{ width: "10%" }}>sku</td>
                                            <td style={{ width: "15%" }}>product_name</td>
                                            <td style={{ width: "10%" }}>description</td>
                                            <td style={{ width: "5%" }}>unit_price</td>
                                            <td style={{ width: "5%" }}>stock_quantity</td>
                                            <td style={{ width: "5%" }}>image</td>
                                            <td style={{ width: "10%" }}>time create</td>
                                            <td style={{ width: "10%" }}>time update</td>
                                            <td>status</td>
                                            <td />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            records?.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{item.product_id}</td>
                                                    <td>{item.sku}</td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{transCurrency(item.unit_price)}</td>
                                                    <td>{item.stock_quantity}</td>
                                                    <td>
                                                        <img src={"../../images/" + item.image} alt="" className='image-product-admin' />

                                                    </td>
                                                    <td>{item.create_at}</td>
                                                    <td>{item.update_at}</td>
                                                    <td>{item.status ? "còn" : "đã xóa"}</td>
                                                    <td>
                                                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" onClick={(e) => handleUpdate(e, item.product_id)}>Update</button>
                                                        <button className="btn btn-danger" onClick={(e) => handleDelete(e, item.product_id)}>Delete</button>
                                                    </td>
                                                </tr>

                                            )
                                        }
                                        {/* <tr>
                                            <td>1</td>
                                            <td>ca</td>
                                            <td>cá khô 1 nắng, 2 nắng, 3 nắng, 4 nắng, 5 nắng</td>
                                            <td>cá</td>
                                            <td>10$</td>
                                            <td>1000</td>
                                            <td>abcxyz</td>
                                            <td>11/02/2024</td>
                                            <td>12/02/2024</td>
                                            <td>1</td>
                                            <td>
                                                <button className="btn btn-primary">Update</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>

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

                                    <Form name="form" layout="vertical" form={formEdit} onFinish={onFinish} initialValues={initialValues} >

                                        <Form.Item label="product_id" name="product_id" >
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="product_name" name="product_name" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="descriptiom" name="description" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="unit_price" name="unit_price" >
                                            <Input type='number' />
                                        </Form.Item>
                                        <Form.Item label="stock_quantity" name="stock_quantity" >
                                            <Input type='number' />
                                        </Form.Item>
                                        <Form.Item label="status" name="status" >
                                            <Select  >
                                                <Select.Option value="true">1</Select.Option>
                                                <Select.Option value="false">0</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit update
                                        </Button>
                                        {/* <button >Submit update</button> */}
                                    </Form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Admin