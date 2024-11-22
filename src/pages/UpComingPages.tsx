import { Layout } from 'antd';
import SideBar from '../components/SideBar/SideBar';
import '../styles/Home.scss';

const { Content } = Layout;

const UpComingPages: React.FC = () => {

  return (
    <Layout className="home-layout">
      <SideBar />
      <Layout className="home-layout__main">
    
        <Content className="home-layout__content">
          <div className="home-layout__content-right upcoming-content">
            <h2 className="upcoming-content-title">Em breve</h2>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UpComingPages;
