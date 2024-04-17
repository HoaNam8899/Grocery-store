import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
const AddProduct = () => {
    const baseURL = 'https://grocery-store-td25.onrender.com';

    const navigate = useNavigate()
    const [data, setData] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(baseURL + "/product", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)

            });
            console.log(res)
            alert('tạo thành công')
            navigate("/admin");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="body-admin m-0">
                <div className="container container-margin-0">
                    <div className="row">
                        <div className="containt-body col-xxl-12">
                            <h1>Thêm sản phẩm</h1>
                            {/* <h1>Cập nhật sản phẩm</h1> */}
                            <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                                <div className="col-xxl-6">
                                    <label htmlFor="name" className="form-label">
                                        Tên sản phẩm
                                    </label>
                                    <div className="input-group has-validation">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            placeholder="Tên sản phẩm"
                                            name='productName'
                                            onChange={(e) => setData(values => ({ ...values, product_name: e.target.value }))}
                                        />
                                        <div className="invalid-feedback">
                                            Vui lòng nhập tên sản phẩm
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-6">
                                    <label htmlFor="description" className="form-label">
                                        Mô tả
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            aria-describedby="inputGroupPrepend"
                                            placeholder="Mô tả"
                                            name='description'
                                            required
                                            onChange={(e) => setData(values => ({ ...values, description: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="col-xxl-4">
                                    <label htmlFor="price" className="form-label">
                                        Giá tiền
                                    </label>
                                    <div className="input-group has-validation">
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            id="price"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            placeholder="Giá tiền"
                                            onChange={(e) => setData(values => ({ ...values, unit_price: +e.target.value }))}
                                        />
                                        <div className="invalid-feedback">Vui lòng nhập giá tiền</div>
                                    </div>
                                </div>
                                <div className="col-xxl-4">
                                    <label htmlFor="stock" className="form-label">
                                        Số lượng sản phẩm trong kho
                                    </label>
                                    <div className="input-group has-validation">
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            id="stock"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            placeholder="Số lượng trong kho"
                                            onChange={(e) => setData(values => ({ ...values, stock_quantity: +e.target.value }))}
                                        />
                                        <div className="invalid-feedback">
                                            Vui lòng nhập số lượng sản phẩm trong kho
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4">
                                    <label htmlFor="image" className="form-label">
                                        Hình ảnh
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            onChange={(e) => setData(values => ({ ...values, image: e.target.files[0].name }))}
                                        />
                                    </div>
                                </div>
                                <div className="col-xxl-4">
                                    <label htmlFor="category" className="form-label">
                                        Danh mục
                                    </label>
                                    <select className="form-select" id="category" required
                                        onChange={(e) => setData(values => ({ ...values, category_id: +e.target.value }))}
                                    >
                                        <option disabled="" value={""}>
                                            Choose...
                                        </option>
                                        <option value={4}>Rau, củ, quả</option>
                                        <option value={5}>Thịt, cá, hải sản</option>
                                        <option value={6}>Hàng đông lạnh</option>
                                        <option value={7}>Sữa tươi, sữa chua</option>
                                        <option value={8}>Bánh kẹo</option>
                                        <option value={9}>Mì gói, bún, cháo</option>
                                        <option value={10}>Kem, đồ lạnh</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary" type="submit">
                                        Submit form
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AddProduct