import { Form, Input, Card, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import {DataStore} from 'aws-amplify';
import { Restaurant } from '../../models';
import { useRestaurantContext } from '../../context/RestaurantContext';

const Settings = () => {


    const [name, setName] = useState("");
    const [address, setAddress] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    const {sub, restaurant, setRestaurant} = useRestaurantContext();

    useEffect(() => {
        if(restaurant) {
            setName(restaurant.name);
            setCoordinates({lat: restaurant.latitude, lng: restaurant.longitude});

        }
    }, [restaurant])
    const getAddressLatLng = async (address) => {
        setAddress(address);

        const geocodedByAddress = await geocodeByAddress(address.label);
        const latLng = await getLatLng(geocodedByAddress[0]);
        setCoordinates(latLng);
    };

    const onSubmit = async () => {
        if(!restaurant) {
            await createNewRestaurant();
        } else {
            await updateRestaurant();
        }
    }

    const createNewRestaurant = async () => {
        const newRestaurant =  await DataStore.save(new Restaurant({
            name,
            image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg',
            deliveryFee: 0,
            minDeliveryTime: 15,
            maxDeliveryTime: 60,
            address: address.label,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            adminSub: sub,
        }));
        setRestaurant(newRestaurant);
        message.success('Restaurant has been created');
    }

    const updateRestaurant = async () => {
        const updatedRestaurant = await DataStore.save(
            Restaurant.copyOf(restaurant, (updated) => {
                updated.name = name;
                if(address) {
                    updated.address = address.label;
                    updated.latitude = coordinates.lat;
                    updated.longitude = coordinates.lng;
                }
            })
        )
        setRestaurant(updatedRestaurant);
        message.success('Restaurant updated');
    }

    return ( 
        <Card title="Restaurant Details" style={{margin: 20}}>
            <Form layout='vertical' wrapperCol={{span: 8}} onFinish={onSubmit}>
                <Form.Item label="Restaurant Name" required>
                    <Input placeholder='Enter Restaurant Name here' value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Restaurant Address" required>
                    <GooglePlacesAutocomplete 
                    apiKey="AIzaSyDYj8QLP7gEVH2SchTLYZ0VkjQzC9teRBY"
                    selectProps={{
                        value: address,
                        onChange: getAddressLatLng
                    }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
            <span>{coordinates?.lat} - {coordinates?.lng}</span>
        </Card>
     );
}
 
export default Settings;
 