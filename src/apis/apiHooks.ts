
import { fetchOrders, cancelOrder } from "./apiController.ts"
import { useQuery } from '@tanstack/react-query';

export const getAllOrdersHook = () => {
    return useQuery({
        queryKey: ['getAllOrders'], // unique key for this query
        queryFn: () => fetchOrders(),
    });
}

export const cancelOrderHook = (payload: any) => {
    return useQuery({
        queryKey: ["cancel"], // unique key for this query
        queryFn: () => cancelOrder(payload),
    });
} 