import { Button, Dropdown, Menu } from 'antd';
import './EmployeeCard.scss';

interface Employee {
  id: number;
  name: string;
  cpf: string;
  status: 'Ativo' | 'Inativo';
  role: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onDelete }) => {
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'edit') {
      onEdit(employee.id);
    } else if (key === 'delete') {
      onDelete(employee.id);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Editar</Menu.Item>
      <Menu.Item key="delete" danger>
        Excluir
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={`employee-card ${
        employee.status === 'Ativo' ? 'employee-card--active' : 'employee-card--inactive'
      }`}
    >
      <div className="employee-card__info">
        <h3 className="employee-card__name">{employee.name}</h3>
        <div className="employee-card__tags">
          <span className="employee-card__tag">{employee.cpf}</span>
          <span className="employee-card__tag">{employee.status}</span>
          <span className="employee-card__tag">{employee.role}</span>
        </div>
      </div>
      <div className="employee-card__actions">
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="text" className="employee-card__button">
            ...
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default EmployeeCard;
