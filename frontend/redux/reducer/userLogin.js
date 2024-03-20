const initialState = [];

export const userLoginReducer = (state = initialState, action) => {
    // tạo userReducer để chứa current user
    switch (action.type) {
        case "USER_LOGIN":
            return action.payload;
        default:
            return state;
    }
}