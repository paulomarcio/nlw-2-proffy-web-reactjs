import React, { useState } from "react";
import { Form } from "@unform/web";

import "./styles.css";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

interface TeacherFormData {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
  schedules: Array<{
    week_day: number;
    from: string;
    to: string;
  }>;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: null,
      from: "",
      to: "",
    },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: null, from: "", to: "" }]);
  }

  async function handleSubmit(data: TeacherFormData) {
    await api.post("classes", data);
    history.push("/");
  }

  return (
    <>
      <div id="page-teacher-form" className="container">
        <PageHeader
          title="Que incrível que você quer dar aulas."
          description="O primeiro passo é preencher esse formulário de inscrição"
        />

        <main>
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Seus dados</legend>

              <Input name="name" label="Nome completo" />
              <Input name="avatar" label="Avatar" />
              <Input name="whatsapp" label="WhatsApp" />
              <TextArea name="bio" label="Biografia" />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>

              <Select
                name="subject"
                label="Matéria"
                options={[
                  { value: "Artes", label: "Artes" },
                  { value: "Biologia", label: "Biologia" },
                  { value: "Ciências", label: "Ciências" },
                  { value: "Educação Física", label: "Educação Física" },
                  { value: "Física", label: "Física" },
                  { value: "Geografia", label: "Geografia" },
                  { value: "História", label: "História" },
                  { value: "Matemática", label: "Matemática" },
                  { value: "Português", label: "Português" },
                  { value: "Química", label: "Química" },
                ]}
              />
              <Input
                type="number"
                name="cost"
                label="Custo da sua hora por aula (em R$)"
              />
            </fieldset>

            <fieldset>
              <legend>
                Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
                </button>
              </legend>

              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={index} className="schedule-item">
                    <Select
                      name={`schedule[${index}].week_day`}
                      label="Dia da Semana"
                      options={[
                        { value: "0", label: "Domingo" },
                        { value: "1", label: "Segunda-feira" },
                        { value: "2", label: "Terça-feira" },
                        { value: "3", label: "Quarta-feira" },
                        { value: "4", label: "Quinta-feira" },
                        { value: "5", label: "Sexta-feira" },
                        { value: "6", label: "Sábado" },
                      ]}
                    />
                    <Input
                      type="time"
                      label="Das"
                      name={`schedule[${index}].from`}
                    />
                    <Input
                      type="time"
                      label="Até"
                      name={`schedule[${index}].to`}
                    />
                  </div>
                );
              })}
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso importante" />
                Importante! <br />
                Preencha todos os dados
              </p>
              <button>Salvar cadastro</button>
            </footer>
          </Form>
        </main>
      </div>
    </>
  );
};

export default TeacherForm;
