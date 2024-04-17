import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Space, Table, Modal, Form, Input, Pagination, Select } from 'antd';

const Category = () => {
    const baseURL = 'https://grocery-store-td25.onrender.com';
    const [category, setCategory] = useState([]);
    const [categoryStatus, setCategoryStatus] = useState();

    const fetchCategory = async () => {
        try {
            let response = await fetch(baseURL + "/category");
            let data = await response.json();
            setCategory(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory()
    }, [])


    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            let res = await fetch(`${baseURL}/category/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
            });
            fetchCategory()
        } catch (error) {
            console.log(error);
        }
    }


    // update
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
        let data = category.find((i) => i.category_id === +id)
        setCategoryStatus({
            status: `${data.status}`
        });
        formEdit.setFieldsValue({
            category_id: data.category_id,
            category_name: data.category_name,
            description: data.description,

        });
        showModalEdit();
    }

    const initialValues = {
        status: categoryStatus?.status
    };
    const onFinish = async (data) => {

        try {
            let res = await fetch(baseURL + "/category/update", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            });
            // console.log(res)
            fetchCategory();
            alert('cập nhật thành công')
            hideModalEdit();
        } catch (error) {
            console.log(error);
        }
    }

    // add new
    const [openAdd, setOpenAdd] = useState(false);
    const [formAdd] = Form.useForm();
    const showModalAdd = () => {
        setOpenAdd(true);
    };

    const hideModalAdd = () => {
        setOpenAdd(false);
    };

    const onFinishAdd = async (data) => {
        // console.log(data)
        try {
            let res = await fetch(baseURL + `/category`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            });
            // console.log(res)
            fetchCategory();
            alert('cập nhật thành công')
            hideModalAdd();
        } catch (error) {
            console.log(error);
        }
    }

    // pagination

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = category?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(category?.length / recordsPerPage);
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
            <div className="body-admin m-0">
                <div className="container container-margin-0">
                    <div className="row">
                        <div className="containt-body col-xxl-12">
                            <div className="table-nav d-flex align-items-center mt-4 mb-4">
                                <button className="btn btn-primary" onClick={() => showModalAdd()}>Thêm mới</button>
                            </div>
                            <div className="body-table d-flex flex-column">
                                <table className="table table-bordered table-height" style={{ width: '80%' }}>
                                    <thead>
                                        <tr>
                                            <td style={{ width: '5%' }}>category_id</td>
                                            <td style={{ width: '10%' }}>category_name</td>
                                            <td style={{ width: '20%' }}>description</td>
                                            <td style={{ width: '5%' }}>status</td>
                                            <td style={{ width: '15%' }}>time create</td>
                                            <td style={{ width: '15%' }}>time update</td>
                                            <td />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            records?.map((i, index) =>
                                                <tr key={index}>
                                                    <td>{i.category_id}</td>
                                                    <td>{i.category_name}</td>
                                                    <td>{i.description}</td>
                                                    <td>{i.status ? "đang dùng" : "khóa"}</td>
                                                    <td>{i.create_at}</td>
                                                    <td>{i.update_at}</td>
                                                    <td>
                                                        <button className="btn btn-primary me-2" onClick={(e) => handleUpdate(e, i.category_id)}>Update</button>
                                                        <button className="btn btn-danger" onClick={(e) => handleDelete(e, i.category_id)}>Delete</button>
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

                                    <Form name="form" layout="vertical" form={formEdit} onFinish={onFinish} initialValues={initialValues} >
                                        <Form.Item label="category_id" name="category_id" >
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="category_name" name="category_name" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="description" name="description" >
                                            <Input type='text' />
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

                                {/* add modal */}
                                <Modal
                                    title="Modal Add"
                                    open={openAdd}
                                    onOk={hideModalAdd}
                                    onCancel={hideModalAdd}
                                    footer={null}
                                >

                                    <Form name="form" layout="vertical" form={formAdd} onFinish={onFinishAdd} >

                                        <Form.Item label="category_name" name="category_name" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="description" name="description" >
                                            <Input type='text' />
                                        </Form.Item>
                                        <Form.Item label="status" name="status" >
                                            <Select  >
                                                <Select.Option value={1}>1</Select.Option>
                                                <Select.Option value={0}>0</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
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

export default Category