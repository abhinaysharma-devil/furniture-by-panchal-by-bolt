import {
    fetchOrders, cancelOrder,
    createOrder, addItemsInCart,
    fetchItems, fetchCategory, fetchItemBySlug, getCartDetail,
    updateCartItemQuantity, clearCartItems, clearCartItemById,
    fetchOrderById, getUsersList, addSubsEmail,
    registerUser,
    verifyOtp,
    fetchFeaturedProducts,
    userLogin,
    sendMailToAdmin,
} from "./apiController.ts"
import { useMutation, useQuery } from '@tanstack/react-query';

/******************************* Items ******************************/

export const useGetProducts = (payload: any) => {
    return useQuery({
        queryKey: ['getProducts', payload], // unique key for this query
        queryFn: () => fetchItems(payload),
    });
}

export const useGetItemBySlug = (payload: any) => {
    return useQuery({
        queryKey: ['useGetItemBySlug', payload], // unique key for this query
        queryFn: () => fetchItemBySlug(payload),
    });
}

export const useGetProductCategory = () => {
    return useQuery({
        queryKey: ['fetchCategory'], // unique key for this query
        queryFn: () => fetchCategory(),
    });
}

export const useGetFeaturedProduct = () => {
    return useQuery({
        queryKey: ['fetchFeaturedProducts'], // unique key for this query
        queryFn: () => fetchFeaturedProducts(),
    });
}

/******************************* Orders ******************************/


export const useGetAllOrders = () => {
    return useQuery({
        queryKey: ['getAllOrders'], // unique key for this query
        queryFn: () => fetchOrders(),
    });
}

export const useGetOrderById = (id: string) => {
    return useQuery({
        queryKey: ['getOrderById', id], // unique key for this query
        queryFn: () => fetchOrderById(id),
    });
}

export const useCancelOrder = () => {
    return useMutation({
        mutationFn: (payload) => cancelOrder(payload),
    });
}

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (payload) => createOrder(payload),
    });
}

/******************************* Cart *******************************/

export const useAddItemInCart = () => {
    return useMutation({
        mutationFn: (payload) => addItemsInCart(payload),
    });
}

export const useGetCartDetail = () => {
    return useQuery({
        queryKey: ['getCartDetail'], // unique key for this query
        queryFn: () => getCartDetail(),
    });
}

export const useUpdateCartItemQuantity = () => {
    return useMutation({
        mutationFn: (payload) => updateCartItemQuantity(payload),
    });
}
export const useCartClear = () => {
    return useMutation({
        mutationFn: () => clearCartItems(),
    });
}
export const useClearCartItemById = (id: string) => {
    return useMutation({
        mutationFn: () => clearCartItemById(id),
    });
}
/******************************* Other Stuff *******************************/

export const useAddSubsEmail = () => {
    return useMutation({
        mutationFn: (payload) => addSubsEmail(payload),
    });
}

export const useSendMailToAdmin = () => {
    return useMutation({
        mutationFn: (payload) => sendMailToAdmin(payload),
    });
}



/******************************* ADMIN *******************************/

/******************************* User *******************************/

export const useGetUserList = () => {
    return useQuery({
        queryKey: ['getUsersList'], // unique key for this query
        queryFn: () => getUsersList(),
    });
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (payload) => registerUser(payload)
    });
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: (payload) => verifyOtp(payload)
    });
}

export const useUserLogin = () => {
    return useMutation({
        mutationFn: (payload) => userLogin(payload)
    });
}