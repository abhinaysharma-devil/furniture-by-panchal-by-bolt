import callAxios from "./axiosMethod.ts";

/******************************* Items ******************************/

const fetchItems = async (payload: any) => {

    let response = await callAxios("GET", `/api/category/items?slug=${payload}`)

    return response;
};

const fetchItemBySlug = async (payload: any) => {

    let response = await callAxios("GET", `/api/item/detailBySlug?slug=${payload}`)

    return response;
};

const fetchCategory = async () => {

    let response = await callAxios("GET", `/api/category/list`)

    return response;
};

/******************************* Cart *******************************/

const addItemsInCart = async (payload: any) => {
    try {
        let response = await callAxios("POST", "/api/cart/add", payload)

        return response;
    } catch (error) {
        throw error
    }
}

const getCartDetail = async () => {

    let response = await callAxios("GET", "/api/cart/get")

    return response;
};

const updateCartItemQuantity = async (payload: any) => {
    try {
        let response = await callAxios("PUT", "/api/cart/update", payload)
        return response;
    } catch (error) {
        throw error
    }
}

const clearCartItems = async () => {
    try {
        let response = await callAxios("DELETE", "/api/cart/clear")
        return response;
    } catch (error) {
        throw error
    }
}

const clearCartItemById = async (id: string) => {
    try {
        let response = await callAxios("DELETE", `/api/cart/clearCartItems/${id}`)
        return response;
    } catch (error) {
        throw error
    }
}

/******************************* Orders ******************************/

const fetchOrders = async () => {

    let response = await callAxios("GET", "/api/orders")

    return response;
};

const fetchOrderById = async (orderId: string) => {

    let response = await callAxios("GET", `/api/orders/${orderId}`)

    return response;
};


const cancelOrder = async (payload: any) => {

    try {

        await callAxios("PUT", "/api/orders/changeStatus", payload)

        return true;
    } catch (error) {
        throw error
    }
}

const createOrder = async (payload: any) => {

    try {

        let response = await callAxios("POST", "/api/orders", payload)

        return response;
    } catch (error) {
        throw error
    }
}

/******************************* Other Stuff ******************************/

const addSubsEmail = async (payload: any) => {

    try {

        let response = await callAxios("POST", "/api/stuff/addSubsEmail", payload)

        return response;
    } catch (error) {
        throw error
    }
}

/******************************* ADMIN ******************************/

/******************************* Users ******************************/


const getUsersList = async () => {

    let response = await callAxios("GET", "/api/user/list")

    return response;
};


const registerUser = async (payload: any) => {

    try {

        let response = await callAxios("POST", "/api/user/auth/register", payload)

        return response;
    } catch (error) {
        throw error
    }
}

export {
    fetchOrders, cancelOrder, createOrder, addItemsInCart,
    fetchItems, fetchCategory, fetchItemBySlug,
    getCartDetail,
    addSubsEmail, updateCartItemQuantity, clearCartItems,
    clearCartItemById,
    fetchOrderById, getUsersList, registerUser
}