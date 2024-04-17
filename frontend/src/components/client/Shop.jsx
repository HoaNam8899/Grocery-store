import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import stringToSlug from '../../../public/constant/slug'
import transCurrency from '../../../public/constant/transCurency'


const Shop = () => {
    const baseURL = 'https://grocery-store-td25.onrender.com';

    const [products, setProducts] = useState([]);
    // console.log(products)
    const userLogin = useSelector(status => status.userLogin) || [];
    const [searchProduct, setSearchProduct] = useState({
        product_name: " "
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const fetchProduct = async () => {
        try {
            let response = await fetch(baseURL + "/product");
            let data = await response.json();
            let newData = data.filter((i) => i.status === true);
            setProducts(newData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleDetail = (e, id) => {
        e.preventDefault();
        const action = {
            type: "SEND_ID",
            payload: id
        }
        dispatch(action);
        navigate("/product-details");
    }

    // product_name
    // unit_price
    // order_quantity
    // product_id
    // image

    const handleAddProduct = (e, id, name, price, image) => {
        e.preventDefault();
        if (userLogin.email === undefined) {
            alert("Đăng nhập để mua hàng");
        } else {
            let data = {
                product_id: id,
                product_name: name,
                unit_price: price,
                image: image,
                order_quantity: 1
            }
            const action = {
                type: "ADD_PRODUCT",
                payload: data,
                key: userLogin.email
            }
            dispatch(action);
        }

    }

    const handleGetAllCategory = (e) => {
        e.preventDefault();
        fetchProduct();
    }

    const handleGetOneCategory = async (e, id) => {
        e.preventDefault();
        try {
            let response = await fetch(`${baseURL}/category/${id}`);
            let data = await response.json();
            let newData = data[0].products.filter((i) => i.status === true);
            setProducts(newData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        let response = await fetch(baseURL + "/product");
        let data = await response.json();
        const returnData = data?.filter((i) => { return stringToSlug(i.product_name).includes(stringToSlug(searchProduct.product_name)) && i.status === true })
        console.log(returnData)
        setProducts(returnData);
    }

    const handleSort = async (e) => {
        e.preventDefault();

        let response = await fetch(baseURL + "/product");
        let data = await response.json();
        let newData = data.filter((i) => i.status === true);

        const text = e.target.textContent;

        if (text === "Tất cả") {
            setProducts(newData);
        } else if (text === "Giá tăng dần") {
            let dataSorted = newData.sort(function (a, b) {
                return parseFloat(a.unit_price) - parseFloat(b.unit_price);
            });
            setProducts(dataSorted);
        } else if (text === "Giá giảm dần") {
            let dataSorted = newData.sort(function (a, b) {
                return parseFloat(b.unit_price) - parseFloat(a.unit_price);
            });
            setProducts(dataSorted);
        } else if (text === "Sản phẩm mới") {
            let dataSorted = newData.sort(function (a, b) {
                return new Date(b.create_at) - new Date(a.create_at);
            });
            console.log(dataSorted);
            setProducts(dataSorted);
        }
    }


    // pagination

    // const newData = products.filter((i) => i.status === true)
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
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



    return (
        <>
            <div id="body">
                <div className="body-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-2">
                                <div className="category-navbar">
                                    <div className="category-navbar_content">
                                        <h3>Danh mục</h3>
                                    </div>
                                    <div className="category">
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetAllCategory(e)}
                                        >
                                            <span>Tất cả sản phẩm</span>
                                        </div>
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetOneCategory(e, 4)}
                                        >
                                            <span>Rau, củ, quả</span>
                                        </div>
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetOneCategory(e, 5)}
                                        >
                                            <span>Thịt,cá, hải sản</span>
                                        </div>
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetOneCategory(e, 6)}
                                        >
                                            <span>Hàng đông lạnh</span>
                                        </div>
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetOneCategory(e, 7)}
                                        >
                                            <span>Sữa tươi, sữa chua</span>
                                        </div>
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetOneCategory(e, 8)}
                                        >
                                            <span>Bánh, kẹo</span>
                                        </div>
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetOneCategory(e, 9)}
                                        >
                                            <span>Mì gói, bún, cháo</span>
                                        </div>
                                        <div className="category-item d-flex align-items-center justify-content-between"
                                            onClick={(e) => handleGetOneCategory(e, 10)}
                                        >
                                            <span>Kem, đồ lạnh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-10">
                                <div className="product-container">
                                    <div className="product-list d-flex flex-column">
                                        <div className="search-product d-flex flex-row align-items-center justify-content-between">
                                            <i className="bi bi-search"
                                                onClick={(e) => handleSearch(e)}
                                            />
                                            <input type="text" placeholder="Tìm kiếm sản phẩm..."
                                                onChange={(e) => setSearchProduct({
                                                    product_name: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="product-list_sort">
                                            <span
                                                onClick={(e) => handleSort(e)}
                                            >Sản phẩm mới</span>
                                            <span
                                                onClick={(e) => handleSort(e)}
                                            >Sản phẩm bán chạy</span>
                                            <span
                                                onClick={(e) => handleSort(e)}
                                            >Giá tăng dần</span>
                                            <span
                                                onClick={(e) => handleSort(e)}
                                            >Giá giảm dần</span>
                                            <span
                                                onClick={(e) => handleSort(e)}
                                            >Tất cả</span>
                                        </div>
                                        <div className="product-items">
                                            <div className="row ">
                                                {
                                                    records.map((i, index) =>

                                                        < div className="col-xl-3" key={index} >
                                                            <div className="product-item">
                                                                <img src={`../../images/` + i.image} alt="" />
                                                                <div className="product-item_name">
                                                                    <p>{i.product_name}</p>
                                                                    <span onClick={(e) => handleDetail(e, i.product_id)}>Chi tiết...</span>
                                                                </div>
                                                                <div className="product-item_price">SL: {i.stock_quantity}</div>
                                                                <div className="product-item_price">Giá: {transCurrency(i.unit_price)}</div>
                                                                <div className="product-item_buy">
                                                                    <button className="btn btn-success" onClick={(e) => handleAddProduct(e, i.product_id, i.product_name, i.unit_price, i.image)}>Mua</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )}

                                            </div>
                                        </div>
                                        {/* pagination */}
                                        <div className="product-pagination mt-auto ">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Previous"
                                                            onClick={prePage}
                                                        >
                                                            <span aria-hidden="true">«</span>
                                                        </a>
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
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Next"
                                                            onClick={nextPage}
                                                        >
                                                            <span aria-hidden="true">»</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        {/* pagination */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </div>
        </>
    )
}

export default Shop;