import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import transCurrency from '../../../public/constant/transCurency';

const ProductDetails = () => {
  const productId = useSelector(state => state.detailsId) || [];
  const userLogin = useSelector(status => status.userLogin) || [];
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      let response = await fetch("http://localhost:3000/product/" + `${productId}`);
      let data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct()
  }, [])

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (userLogin.email === undefined) {
      alert("Đăng nhập để mua hàng");
    } else {
      let data = {
        product_id: product.product_id,
        product_name: product.product_name,
        unit_price: product.unit_price,
        image: product.image,
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

  return (
    <>
      <div id="body">
        <div className="body-content">
          <div className="container">
            <div className="row">
              <div className="col-xl-4">
                <div className="detail-img">
                  <img src={`../../images/` + product.image} alt="" />
                </div>
              </div>
              <div className="col-xl-8">
                <div className="detail-content">
                  <p className="detail-name">{product.product_name}.</p>
                  <p className="detail-text">{product.description}.</p>
                  <p className="detail-price">Giá: {transCurrency(product.unit_price)}</p>
                  <p className="detail-price">SL: {product.stock_quantity}</p>
                  <div className="detail-button">
                    <button className="btn btn-success" onClick={() => navigate("/")}>Quay lại mua hàng</button>
                    <button className="btn btn-success" onClick={(e) => handleAddProduct(e)}>Mua</button>
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

export default ProductDetails