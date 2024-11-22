import React, { useEffect, useState } from 'react';
import { Layout, List, Switch, message } from 'antd';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import SideBar from '../components/SideBar/SideBar';
import InfoCard from '../components/InfoCard/InfoCard';
import ActionButtons from '../components/ActionButtons/ActionButtons';
import AddEmployee from '../components/AddEmployee/AddEmployee';
import CustomHeader from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.scss';

const { Content } = Layout;

interface Employee {
  id: number; // Certifique-se de que IDs sejam inteiros únicos
  name: string;
  cpf: string;
  status: 'Ativo' | 'Inativo';
  role: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [viewingAddEmployee, setViewingAddEmployee] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  // Fetch inicial para carregar os funcionários do banco de dados
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/employees');
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        message.error('Erro ao buscar funcionários.');
      }
    };

    fetchEmployees();
  }, []);

  // Adicionar um funcionário
  const handleAddEmployee = (newEmployee: Employee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setViewingAddEmployee(false);
  };

  // Excluir um funcionário
  const handleDeleteEmployee = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
        setFilteredEmployees((prevFilteredEmployees) =>
          prevFilteredEmployees.filter((employee) => employee.id !== id)
        );
        message.success('Funcionário excluído com sucesso!');
      } else {
        message.error('Erro ao excluir funcionário!');
      }
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      message.error('Erro ao excluir funcionário!');
    }
  };

  // Editar um funcionário
  const handleEditEmployee = (id: number) => {
    message.info(`Editar funcionário com ID: ${id}`);
    // Lógica para editar funcionário
  };

  // Filtrar funcionários ativos
  const handleViewActive = () => {
    setFilteredEmployees(employees.filter((e) => e.status === 'Ativo'));
  };

  // Limpar filtros
  const handleClearFilters = () => {
    setFilteredEmployees(employees);
  };

  // Controles de etapas
  const [currentStep, setCurrentStep] = useState(1); // Passo atual
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); // Passos concluídos
  const [allBlue, setAllBlue] = useState(false); // Controla quando todos os itens ficam azuis

  const toggleComplete = () => {
    setAllBlue((prev) => !prev); // Alterna entre azul ou não
  };

  const handleNextStep = () => {
    if (allBlue) {
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]); // Marca o passo atual como concluído
      setCurrentStep((prev) => prev + 1); // Avança para o próximo passo
      if (currentStep === 1) {
        navigate('/upcoming-steps'); // Redireciona para a tela de passos futuros no próximo passo
      }
    }
  };

  return (
    <Layout className="home-layout">
      <SideBar />
      <Layout className="home-layout__main">
        <CustomHeader currentStep={currentStep} completedSteps={completedSteps} allBlue={allBlue} />
        <Content className="home-layout__content">
          <InfoCard />
          <div className="home-layout__content-right">
            {viewingAddEmployee ? (
              <AddEmployee
                onAddEmployee={handleAddEmployee}
                onCancel={() => setViewingAddEmployee(false)}
              />
            ) : (
              <>
                <div className="home-layout__content-right-header">
                  <h2 className="home-layout__content-right-header-text">Funcionário(s)</h2>
                </div>
                <div className="home-layout__content-right-body">
                  <div className="home-layout__actions-container">
                    <ActionButtons
                      onAdd={() => setViewingAddEmployee(true)}
                      onViewActive={handleViewActive}
                      onClearFilters={handleClearFilters}
                      activeCount={filteredEmployees.filter((e) => e.status === 'Ativo').length}
                      totalCount={employees.length}
                    />
                  </div>
                  <List
                    dataSource={filteredEmployees}
                    renderItem={(employee) => (
                      <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onEdit={handleEditEmployee}
                        onDelete={handleDeleteEmployee}
                      />
                    )}
                  />
                  <div className="home-layout__switch">
                    <label className="home-layout__switch-label">A etapa está concluída?</label>
                    <Switch
                      className="custom-switch"
                      checked={allBlue}
                      onChange={toggleComplete}
                      checkedChildren={<span style={{ color: 'White' }}>Sim</span>}
                      unCheckedChildren={<span style={{ color: 'White' }}>Não</span>}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Content>
        <div className="home-layout__footer">
          <button
            className={`next-step-button ${allBlue ? 'enabled' : ''}`}
            onClick={handleNextStep}
            disabled={!allBlue}
          >
            Próximo passo
          </button>
        </div>
      </Layout>
    </Layout>
  );
};

export default Home;
