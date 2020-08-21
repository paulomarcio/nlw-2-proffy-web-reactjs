import React, { useState } from 'react';
import { Form } from "@unform/web";

import './styles.css';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

interface TeacherSearchData {
  subject: string;
  week_day: number;
  time: string;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  async function handleTeacherSearch(data: TeacherSearchData){
    const response = await api.get('classes', {
      params: data
    });
    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <Form onSubmit={handleTeacherSearch} id="search-teachers">
          <Select 
            name="subject" 
            label="Matéria"
            options={[
              {value: 'Artes', label: 'Artes'},
              {value: 'Biologia', label: 'Biologia'},
              {value: 'Ciências', label: 'Ciências'},
              {value: 'Educação Física', label: 'Educação Física'},
              {value: 'Física', label: 'Física'},
              {value: 'Geografia', label: 'Geografia'},
              {value: 'História', label: 'História'},
              {value: 'Matemática', label: 'Matemática'},
              {value: 'Português', label: 'Português'},
              {value: 'Química', label: 'Química'},
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da Semana"
            options={[
              {value: '0', label: 'Domingo'},
              {value: '1', label: 'Segunda-feira'},
              {value: '2', label: 'Terça-feira'},
              {value: '3', label: 'Quarta-feira'},
              {value: '4', label: 'Quinta-feira'},
              {value: '5', label: 'Sexta-feira'},
              {value: '6', label: 'Sábado'},
            ]}
          />
          <Input type="time" label="Hora" name="time" />

          <button type="submit">
            Buscar
          </button>
        </Form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  );
}

export default TeacherList;