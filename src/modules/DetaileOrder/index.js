import { Card, Descriptions, Divider, List, Button } from 'antd';
import dishes from '../../assets/data/dashboard/dishes.json';
import { useParams } from 'react-router-dom';

const DetailedOrder = () => {
  const {id} = useParams();
  return (
    <Card title={`Order ${id}`} style={{margin: 20}}>
      <Descriptions bordered column={{lg: 1, md: 1, sm: 1}}>
        <Descriptions.Item label="Customer">Micheal Harvian</Descriptions.Item>
        <Descriptions.Item label="Address">24 Kampala Road</Descriptions.Item>
      </Descriptions>
      <Divider />
      <List dataSource={dishes} 
        renderItem={(dishItem) => (
          <List.Item>
            <div style={{fontWeight: 'bold'}}>{dishItem.name} x{dishItem.quantity}</div>
            {/* <div>{dishItem.quantity}</div> */}
            <div>UGX {dishItem.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total: </h2>
        <h2 style={styles.totalPrice}>UGX 45000</h2>
      </div>
      <Divider />
      <div style={styles.buttonsContainer}>
        <Button block type='danger' size='large' style={styles.button}>Decline Order</Button>
        <Button block type='primary' size='large' style={styles.button}>Accept Order</Button>
      </div>
      <Button block type='primary' size='large'>Food is Done</Button>
    </Card>
  );
}

const styles = {
  totalSumContainer: {
    flexDirection: 'row',
    display: 'flex',        
  },
  totalPrice: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  }
}

export default DetailedOrder;
