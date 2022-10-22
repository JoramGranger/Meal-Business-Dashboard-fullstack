/* import orders from '../../assets/data/dashboard/orders.json'; */
import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, OrderStatus } from '../../models';
import {useRestaurantContext} from '../../context/RestaurantContext';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const {restaurant} = useRestaurantContext();

    const navigate = useNavigate();

    useEffect(() => {
        if(!restaurant) {
            return;
        }
        DataStore.query(Order, (order) => 
        order.orderRestaurantId("eq", restaurant.id)
        .or((orderStatus) => 
        orderStatus
            .status("eq", 'NEW')
            .status("eq", 'COOKING')
            .status("eq", 'ACCEPTED')
            .status("eq", 'READY_FOR_PICKUP')
        )
        ).then(setOrders);
    }, [restaurant]);

    console.log(orders);

    const renderOrderStatus = (orderStatus) => {
        
        const statusToColor = {
            [OrderStatus.NEW]: 'green',
            [OrderStatus.COOKING]: 'orange',
            [OrderStatus.READY_FOR_PICKUP]: 'red',
            [OrderStatus.ACCEPTED]: 'purple',
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
            render: (price) => `UGX, ${price.toFixed(0)}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: renderOrderStatus
        }
    ];


    return (
        <Card title={"Orders"} style={{margin: 20}}>
            <Table 
                dataSource={orders}
                columns={tableColumns}
                rowKey="id"
                onRow={(orderItem) => ({
                    onClick: () => navigate(`order/${orderItem.id}`)
                })}
            />
        </Card>
    );
};

export default Orders;