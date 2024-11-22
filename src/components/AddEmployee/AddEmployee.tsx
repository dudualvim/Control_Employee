import React, { useState } from "react";
import { Button, Input, Select, Switch, Checkbox, Form, Radio } from "antd";
import { ArrowLeftOutlined, PaperClipOutlined } from "@ant-design/icons";
import "./AddEmployee.scss";

const { Option } = Select;

interface AddEmployeeProps {
  onAddEmployee: (employee: any) => void;
  onCancel: () => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({
  onAddEmployee,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const [noEPI, setNoEPI] = useState(false);
  const [activities, setActivities] = useState([
    { id: Date.now(), epis: [{ id: Date.now() }] },
  ]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const activityData = activities.map((activity) => ({
        activity: values[`activity_${activity.id}`],
        epis: activity.epis.map((epi) => ({
          epi: values[`epi_${activity.id}_${epi.id}`],
          caNumber: values[`caNumber_${activity.id}_${epi.id}`],
        })),
      }));

      const newEmployee = {
        id: Math.random(),
        name: values.name,
        cpf: values.cpf,
        status: isActive ? "Ativo" : "Inativo",
        gender: values.gender,
        role: values.role,
        activities: activityData,
        healthCertificate: values.healthCertificate,
      };

      // Salvar no JSON Server
      const response = await fetch("http://localhost:3001/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        const createdEmployee = await response.json();
        onAddEmployee(createdEmployee); // Atualiza a lista de funcionários
        form.resetFields(); // Limpa o formulário
        setActivities([{ id: Date.now(), epis: [{ id: Date.now() }] }]); // Reseta as atividades
        setIsActive(true); // Reseta o status do funcionário
        alert("Funcionário salvo com sucesso!");
      } else {
        alert("Erro ao salvar funcionário.");
      }
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      alert("Erro ao validar o formulário ou salvar os dados.");
    }
  };

  const addActivityForm = () => {
    const newActivity = { id: Date.now(), epis: [{ id: Date.now() }] };
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const removeActivityForm = (id: number) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  const addEPI = (activityId: number) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, epis: [...activity.epis, { id: Date.now() }] }
          : activity
      )
    );
  };

  const removeEPI = (activityId: number, epiId: number) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              epis: activity.epis.filter((epi) => epi.id !== epiId),
            }
          : activity
      )
    );
  };
  return (
    <div className="add-employee">
      <div className="add-employee__content-right-header">
        <div className="add-employee__back-wrapper" onClick={onCancel}>
          <ArrowLeftOutlined className="add-employee__back-button" />
        </div>
        <div className="add-employee__text-wrapper">
          <h2 className="add-employee__content-right-header-text">
            Adicionar Funcionário
          </h2>
        </div>
      </div>
      <div className="add-employee__content-right-body">
        {/* Seção 1: Estado e Informações Básicas */}
        <div className="add-employee__status">
          <label className="add-employee__status-label">
            O trabalhador está ativo ou inativo?
          </label>
          <Switch
            className="custom-switch"
            checked={isActive}
            onChange={(checked) => setIsActive(checked)}
            checkedChildren="Ativo"
            unCheckedChildren="Inativo"
          />
        </div>
        <Form form={form} layout="vertical" className="add-employee__form">
          <div className="add-employee__form-section">
            <Form.Item
              name="name"
              label="Nome"
              rules={[{ required: true, message: "Por favor, insira o nome." }]}
              className="add-employee__form-item"
            >
              <Input placeholder="Nome" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Sexo"
              rules={[
                { required: true, message: "Por favor, selecione o sexo." },
              ]}
              className="add-employee__form-item"
            >
              <Radio.Group>
                <Radio value="Feminino">Feminino</Radio>
                <Radio value="Masculino">Masculino</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="add-employee__form-section">
            <Form.Item
              name="cpf"
              label="CPF"
              rules={[{ required: true, message: "Por favor, insira o CPF." }]}
              className="add-employee__form-item"
            >
              <Input placeholder="CPF" />
            </Form.Item>
            <Form.Item
              name="birthdate"
              label="Data de Nascimento"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a data de nascimento.",
                },
              ]}
              className="add-employee__form-item"
            >
              <Input placeholder="Data de Nascimento" />
            </Form.Item>
          </div>

          <div className="add-employee__form-section">
            <Form.Item
              name="rg"
              label="RG"
              rules={[{ required: true, message: "Por favor, insira o RG." }]}
              className="add-employee__form-item"
            >
              <Input placeholder="RG" />
            </Form.Item>
            <Form.Item
              name="role"
              label="Cargo"
              rules={[
                { required: true, message: "Por favor, selecione um cargo." },
              ]}
              className="add-employee__form-item"
            >
              <Select placeholder="Selecione o cargo">
                <Option value="Cargo 1">Cargo 1</Option>
                <Option value="Cargo 2">Cargo 2</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>

        {/* Seção 2: EPIs */}
        <Form
          form={form}
          layout="vertical"
          className="add-employee__form-section-epi"
        >
          <label>Quais EPIs o trabalhador usa na atividade?</label>
          <Form.Item className="add-employee__epi-question">
            <Checkbox
              onChange={(e) => setNoEPI(e.target.checked)}
              checked={noEPI}
              className="add-employee__epi-checkbox"
            >
              O trabalhador não usa EPI.
            </Checkbox>
          </Form.Item>

          {!noEPI && (
            <>
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="add-employee__form-section-epi"
                >
                  <Form.Item
                    name={`activity_${activity.id}`}
                    label="Selecione a atividade:"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione a atividade.",
                      },
                    ]}
                  >
                    <Select placeholder="Selecione a atividade">
                      <Option value="Atividade 1">Atividade 1</Option>
                      <Option value="Atividade 2">Atividade 2</Option>
                    </Select>
                  </Form.Item>

                  {activity.epis.map((epi, epiIndex) => (
                    <div
                      key={epi.id}
                      className="add-employee__form-section-epi-fields"
                    >
                      <Form.Item
                        name={`epi_${activity.id}_${epi.id}`}
                        label="Selecione o EPI:"
                        rules={[
                          {
                            required: true,
                            message: "Por favor, selecione o EPI.",
                          },
                        ]}
                      >
                        <Select placeholder="Selecione o EPI">
                          <Option value="Calçado de segurança">
                            Calçado de segurança
                          </Option>
                          <Option value="Luvas de proteção">
                            Luvas de proteção
                          </Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={`caNumber_${activity.id}_${epi.id}`}
                        label="Informe o número do CA:"
                        rules={[
                          {
                            required: true,
                            message: "Por favor, insira o número do CA.",
                          },
                        ]}
                      >
                        <Input placeholder="Número do CA" />
                      </Form.Item>

                      {/* Botão Adicionar/Remover EPI */}
                      <Button
                        type="link"
                        className="add-employee__add-activity"
                        onClick={() =>
                          epiIndex === activity.epis.length - 1
                            ? addEPI(activity.id)
                            : removeEPI(activity.id, epi.id)
                        }
                      >
                        {epiIndex === activity.epis.length - 1
                          ? "Adicionar EPI"
                          : "Remover EPI"}
                      </Button>
                    </div>
                  ))}

                  {/* Botão para Adicionar ou Remover Atividade */}
                  <div className="add-employee__epi-actions">
                    <Button
                      type="link"
                      className="add-employee__add-activity"
                      onClick={() =>
                        activities.length === 1
                          ? addActivityForm()
                          : removeActivityForm(activity.id)
                      }
                    >
                      {activities.length === 1
                        ? "Adicionar outra atividade"
                        : "Remover atividade"}
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </Form>
        <Form
          form={form}
          layout="vertical"
          className="add-employee__form-section-health"
        >
          <Form.Item
            name="healthCertificate"
            label="Adicione Atestado de Saúde (opcional):"
            className="add-employee__health-label"
          >
            <Input
              placeholder="Nenhum arquivo selecionado"
              readOnly
              suffix={<PaperClipOutlined />}
              className="add-employee__health-input"
            />
          </Form.Item>
          <Button type="link" className="add-employee__upload-button">
            Selecionar arquivo
          </Button>
        </Form>
        <div className="add-employee__save-section">
          <Button
            type="link"
            className="add-employee__save-button"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
