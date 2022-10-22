import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from 'aws-amplify';
import { Restaurant } from "../models";

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({children}) => {
    const [user, setUser] = useState();
    const [restaurant, setRestaurant] = useState();
    const sub = user?.attributes?.sub;

    // fetch restaurant admin
    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(setUser);
    }, []);

    // fetch the restaurant managed by restaurant admin
    useEffect(() => {
        if(!sub) {
            return;
        }
        DataStore.query(Restaurant, (r) => r.adminSub("eq", sub)).then(
            (restaurants) => setRestaurant(restaurants[0])
            ); 
    },[sub])

    console.log(sub);

    return (
        <RestaurantContext.Provider value={{ restaurant, sub, setRestaurant }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);