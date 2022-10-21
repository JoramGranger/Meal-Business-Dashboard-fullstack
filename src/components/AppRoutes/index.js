import { Card, Descriptions, Divider, List, Button } from 'antd';
import dishes from '../../assets/data/dashboard/dishes.json';
import DetailedOrder from '../../modules/DetaileOrder';
import Orders from '../../modules/Orders';
import { Routes, Route } from 'react-router-dom';
import { Layout, Image } from 'antd';
import SideMenu from '../SideMenu';
import RestaurantMenu from '../../modules/RestaurantMenu';
import CreateMenuItem from '../../modules/CreateMenuItem';
import OrderHistory from '../../modules/OrderHistory';
import Settings from '../../modules/Settings';
const { Sider, Content, Footer } = Layout;

const AppRoutes = () => {
    return (
        <Layout>
      <Sider style={{height: '100vh', backgroundColor: 'white'}}>
        <h2 style={{fontWeight: 'bold', fontSize: 50, textAlign: 'center'}}>MEAL</h2>
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
        <Routes>
          <Route path="/" element={<Orders />}/>
          <Route path="order/:id" element={<DetailedOrder />}/>
          <Route path="menu" element={<RestaurantMenu/> }/>
          <Route path="menu/create" element={<CreateMenuItem/>} />
          <Route path="order-history" element={<OrderHistory/>} />
          <Route path="settings" element={<Settings/>} />
          </Routes>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Meal | Business Dashboard &copy; 2022
        </Footer>
      </Layout>
    </Layout>
     );
}
 
export default AppRoutes;