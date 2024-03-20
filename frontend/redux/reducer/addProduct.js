const initialState = [];

export const addProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            if (action.key) {
                let result = localStorage.getItem(action.key) || [];
                if (result.length === 0) {
                    result.push(action.payload)
                    localStorage.setItem(action.key, JSON.stringify(result));
                } else {
                    result = JSON.parse(result)
                    let resultIndex = result.findIndex(p => p.product_id === action.payload.product_id);
                    if (resultIndex === -1) {
                        result.push(action.payload);
                    } else {
                        result[resultIndex].order_quantity += 1;
                    }
                    localStorage.setItem(action.key, JSON.stringify(result));

                }
                return result;
            }
        case "GET_ALL_PRODUCT":
            let resultGetAll = localStorage.getItem(action.key) || [];
            if (resultGetAll.length > 0) {
                resultGetAll = JSON.parse(resultGetAll)
            }
            return resultGetAll;
        case "SUB_QTY":
            let sub = localStorage.getItem(action.key) || [];
            sub = JSON.parse(sub);

            let subIndex = sub.findIndex(p => p.product_id === +action.payload);
            if (sub[subIndex].order_quantity === 1) {
                sub[subIndex].order_quantity = 1;
            } else {
                sub[subIndex].order_quantity -= 1;
            }
            localStorage.setItem(action.key, JSON.stringify(sub));
            return sub;
        case "SUM_QTY":
            let sum = localStorage.getItem(action.key) || [];
            sum = JSON.parse(sum);
            let sumed = sum.map(p => p.product_id === +action.payload ? { ...p, order_quantity: p.order_quantity + 1 } : p);
            localStorage.setItem(action.key, JSON.stringify(sumed));
            return sumed;
        case "DELETE":
            let deleteProduct = localStorage.getItem(action.key) || [];
            deleteProduct = JSON.parse(deleteProduct);
            let deleteIndex = deleteProduct.findIndex(p => p.product_id === +action.payload);
            deleteProduct.splice(deleteIndex, 1)
            localStorage.setItem(action.key, JSON.stringify(deleteProduct));
            return deleteProduct;

        case "DELETE-KEY":
            localStorage.removeItem(action.key);
            let removeProduct = [];
            return removeProduct;

        default:
            return state;
    }
}