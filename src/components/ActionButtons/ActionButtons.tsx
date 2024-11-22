import React, { useState } from 'react';
import './ActionButtons.scss';

interface ActionButtonsProps {
  onAdd: () => void;
  onViewActive: () => void;
  onClearFilters: () => void;
  activeCount: number; 
  totalCount: number; 
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAdd,
  onViewActive,
  onClearFilters,
  activeCount,
  totalCount,
}) => {
  const [activeButton, setActiveButton] = useState<'viewActive' | 'clearFilters' | null>(null);

  const handleViewActive = () => {
    setActiveButton('viewActive');
    onViewActive();
  };

  const handleClearFilters = () => {
    setActiveButton(null);
    onClearFilters();
  };

  return (
    <div className="action-buttons">
      <button className="action-buttons__add" onClick={onAdd}>
        + Adicionar Funcionário
      </button>
      <div className="action-buttons__other">
        <button
          className={`action-buttons__button ${activeButton === 'viewActive' ? 'active' : ''}`}
          onClick={handleViewActive}
        >
          Ver apenas ativos
        </button>
        <button
          className={`action-buttons__button ${activeButton === null ? 'active' : ''}`}
          onClick={handleClearFilters}
        >
          Limpar filtros
        </button>
        <p className="action-buttons__info">
          Ativos: {activeCount}/{totalCount}
        </p>
      </div>
    </div>
  );
};

export default ActionButtons;
