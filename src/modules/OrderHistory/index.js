import orders from '../../assets/data/dashboard/orders.json';
import OrdersHistory from '../../assets/data/dashboard/orders-history.json';
import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, OrderStatus } from '../../models';
import {useRestaurantContext} from '../../context/RestaurantContext';

const OrderHistory = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const {restaurant} = useRestaurantContext();

    /* const renderOrderStatus = (orderStatus) => {
        if(orderStatus === 'Delivered') { return <Tag color={'green'}>{orderStatus}</Tag>}       
       return <Tag color={'orange'}>{orderStatus}</Tag>    
    } */

    useEffect(() => {
        if(!restaurant) {
            return;
        }
        DataStore.query(Order, (order) => 
        order.orderRestaurantId("eq", restaurant.id)
        .or((orderStatus) => 
        orderStatus
            .status("eq", 'PICKED_UP')
            .status("eq", 'COMPLETED')
            .status("eq", 'DECLINED_BY_RESTAURANT')
        )
        ).then(setOrders);
    }, [restaurant]);

    const renderOrderStatus = (orderStatus) => {
        
        const statusToColor = {
            [OrderStatus.PICKED_UP]: 'orange',
            [OrderStatus.COMPLETED]: 'green',
            [OrderStatus.DECLINED_BY_RESTAURANT]: 'red',
        };        
        return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>; 
    }

    const tableColumns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',            
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',            
        },
        {
            title: 'Price',
            dataIndex: 'total',
            key: 'total', 
            render: (price) => `UGX, ${price?.toFixed(0)}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: renderOrderStatus
        }
    ];


    return (
        <Card title={"Order History"} style={{margin: 20}}>
            <Table 
                dataSource={orders}
                columns={tableColumns}
                rowKey="id"
            />
        </Card>
    );
};

export default OrderHistory;