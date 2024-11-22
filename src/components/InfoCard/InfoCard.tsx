import React from 'react';
import './InfoCard.scss';
import Figure from '../../assets/img/Figure.png';

const InfoCard: React.FC = () => {
  return (
    <div className="info-card">
      <p className="info-card__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit suscipit porttitor.
        Suspendisse ex lorem, rhoncus nec ante eu, venenatis aliquam turpis. Nulla facilisi.
        Curabitur nec mattis dolor. Nulla finibus bibendum ligula tempus vehicula. Ut at tristique
        libero, nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, tempus nec justo eget,
        luctus scelerisque velit. Nam sollicitudin purus urna, vitae ornare neque tincidunt vel.
        Proin ac lacinia erat, et commodo felis. Phasellus tempor tellus eu vulputate tempus.
      </p>
      <div className="info-card__avatar">
        <img
          src={Figure}
          alt="Avatar"
          className="info-card__image"
        />
      </div>
    </div>
  );
};

export default InfoCard;
