import orders from '../../assets/data/dashboard/orders.json';
import OrdersHistory from '../../assets/data/dashboard/orders-history.json';
import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {

    const navigate = useNavigate();
    const renderOrderStatus = (orderStatus) => {
        if(orderStatus === 'Delivered') { return <Tag color={'green'}>{orderStatus}</Tag>}       
       return <Tag color={'orange'}>{orderStatus}</Tag>    
    }

    const tableColumns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID',            
        },
        {
            title: 'Delivery Address',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',            
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price', 
            render: (price) => `${price} UGX`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag color={status === 'Delivered' ? 'green' : 'red'}>{status}</Tag>
        }
    ];


    return (
        <Card title={"Order History"} style={{margin: 20}}>
            <Table 
                dataSource={OrdersHistory}
                columns={tableColumns}
                rowKey="orderID"
            />
        </Card>
    );
};

export default OrderHistory;