import callAxios from "./axiosMethod.ts";


// const addItem = async (id : number, quantity : string) => {
//     try {
//         await callAxios("POST", "/api/cart", { id, quantity })

//         return true;
//     } catch (error) {
//         throw error
//     }
// }

const fetchOrders = async () => {

    let response = await callAxios("GET", "/api/orders")

    return response;
};

const cancelOrder = async (payload : any) => {
    
    try {

        await callAxios("PUT", "/api/orders/changeStatus", payload)

        return true;
    } catch (error) {
        throw error
    }
}

export { fetchOrders, cancelOrder }