import React, { useState } from 'react';
import { Layout } from 'antd';
import SideBar from '../components/SideBar/SideBar';
import CustomHeader from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.scss';

const { Content } = Layout;

const UpComingSteps: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]); 
  const [allBlue] = useState(true); 
  const handleNextStep = () => {
    if (currentStep < 9) {
      setCompletedSteps((prev) => Array.from(new Set([...prev, currentStep])));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setCompletedSteps((prev) => prev.filter((step) => step !== currentStep - 1));
      if (currentStep === 2) navigate('/'); 
    }
  };

  return (
    <Layout className="home-layout">
      <SideBar />
      <Layout className="home-layout__main">
        <CustomHeader currentStep={currentStep} completedSteps={completedSteps} allBlue={allBlue} />
        <Content className="home-layout__content">
          <div className="home-layout__content-right upcoming-content">
            <h2 className="upcoming-content-title">Em breve</h2>
          </div>
        </Content>
        <div className="home-layout__footer upcoming-footer">
          <button
            className="previous-step-button enabled"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
          >
            Passo anterior
          </button>
          <button
            className={`next-step-button ${currentStep < 9 ? 'enabled' : ''}`}
            onClick={handleNextStep}
            disabled={currentStep === 9}
          >
            Próximo passo
          </button>
        </div>
      </Layout>
    </Layout>
  );
};

export default UpComingSteps;
