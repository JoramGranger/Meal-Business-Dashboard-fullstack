import { Form, Input, Button, Card, InputNumber, message } from 'antd';
import { DataStore } from 'aws-amplify';
import { Dish } from '../../models';
import {useRestaurantContext} from '../../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const CreateMenuItem = () => {

    const {restaurant} = useRestaurantContext();
    const navigation = useNavigate();

    const onFinish = ({name, description, price}) => {
        DataStore.save(
            new Dish({
            name,
            description,
            price,
            restaurantID: restaurant.id,
    }));
    message.success("Dish was created");
    navigation('/menu');
    }

    const onFinishFailed = (erroInfo) => {
        console.log("Failed", erroInfo);
    }

    return ( 
        <Card title="New Menu Item" style={{margin: 20}}>
            <Form layout='vertical' wrapperCol={{span: 8}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Dish Name" required name="name" rules={[{required: true}]}>
                    <Input placeholder='Enter Dish name' />
                </Form.Item>
                <Form.Item label="Dish Description" required name="description" rules={[{required: true}]}>
                    <TextArea rows={4} placeholder="Enter dish description"/>
                </Form.Item>
                <Form.Item label="Price (UGX)" required name="price" rules={[{required: true}]}>
                    <InputNumber />                    
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>                  
                </Form.Item>
            </Form>
        </Card>
     );
}
 
export default CreateMenuItem;