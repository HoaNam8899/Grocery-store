import React from 'react'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        navigate("/admin");
    }
    return (
        <>
            <div className="header-admin">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="header-nav d-flex align-items-center justify-content-between">
                                <div className='header-nav_item'>
                                    <span onClick={() => navigate("/admin")}>Sản phẩm</span>
                                    <span onClick={() => navigate("/admin/users")}>Khách hàng</span>
                                    <span onClick={() => navigate("/admin/category")}>Danh mục</span>
                                    <span onClick={() => navigate("/admin/order")}>Đơn hàng</span>
                                </div>
                                <i className="bi bi-box-arrow-right" onClick={(e) => handleLogout(e)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header