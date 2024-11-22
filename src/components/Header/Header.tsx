import React from 'react';
import { BuildOutlined } from '@ant-design/icons';
import './Header.scss';

interface HeaderProps {
  currentStep: number;
  completedSteps: number[];
  allBlue: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentStep, completedSteps, allBlue }) => {
  const steps = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    label: `Item ${index + 1}`,
    status: completedSteps.includes(index + 1) ? 'Concluído' : '',
  }));

  return (
    <div className="header-navigation">
      <div className="header-navigation__container">
        {steps.map((step) => (
          <React.Fragment key={step.id}>
            <div className="header-navigation__step-wrapper">
              <div
                className={`header-navigation__step ${
                  step.id === currentStep
                    ? 'header-navigation__step--border header-navigation__step--active'
                    : completedSteps.includes(step.id)
                    ? 'header-navigation__step--completed'
                    : allBlue
                    ? 'header-navigation__step--active'
                    : ''
                }`}
              >
                <BuildOutlined className="header-navigation__icon" />
              </div>
              <span
                className={`header-navigation__label ${
                  step.id === currentStep ||
                  completedSteps.includes(step.id) ||
                  allBlue
                    ? 'header-navigation__label--active'
                    : ''
                }`}
              >
                {step.label}
              </span>
              {step.status === 'Concluído' && (
                <span className="header-navigation__status">Concluído</span>
              )}
            </div>
            {step.id < steps.length && <div className="header-navigation__dashed-line" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Header;
