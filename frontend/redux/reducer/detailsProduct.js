const initialState = [];

export const detailsProductReducer = (state = initialState, action) => {
    // tạo userReducer để chứa current user
    switch (action.type) {
        case "SEND_ID":
            return action.payload;
        default:
            return state;
    }
}