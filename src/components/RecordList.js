import React, { useState } from 'react';

const RecordList = () => {
  const maxLength = 50; // Максимальная длина записи
  const [records, setRecords] = useState([]); // Список задач
  const [newRecord, setNewRecord] = useState(''); // Текущая задача
  const [filter, setFilter] = useState('all'); // Фильтрация по типу задач

  // Добавление новой записи
  const addRecord = () => {
    if (newRecord.trim().length > 0 && newRecord.length <= maxLength) {
      const newTask = {
        id: Date.now(),
        text: newRecord,
        completed: false,
      };
      setRecords([...records, newTask]);
      setNewRecord('');
    } else {
      alert(`Запись должна быть не длиннее ${maxLength} символов.`);
    }
  };

  // Переключение статуса задачи
  const toggleStatus = (id) => {
    setRecords(records.map(record => 
      record.id === id ? { ...record, completed: !record.completed } : record
    ));
  };

  // Фильтрация записей
  const filteredRecords = records.filter(record => {
    if (filter === 'completed') return record.completed;
    if (filter === 'current') return !record.completed;
    return true;
  });

  // Подсчёт выполненных и невыполненных задач
  const completedCount = records.filter(record => record.completed).length;
  const currentCount = records.filter(record => !record.completed).length;

  return (
    <div className="container mt-5">
      <h2>Список Записей</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
          placeholder="Добавьте новую запись"
        />
        <button className="btn btn-primary mt-2" onClick={addRecord}>Добавить</button>
      </div>

      <div className="mb-3">
        <button 
          className={`btn ${filter === 'all' ? 'btn-info' : 'btn-secondary'}`} 
          onClick={() => setFilter('all')}>Все</button>
        <button 
          className={`btn ${filter === 'completed' ? 'btn-info' : 'btn-secondary'}`} 
          onClick={() => setFilter('completed')}>Выполненные</button>
        <button 
          className={`btn ${filter === 'current' ? 'btn-info' : 'btn-secondary'}`} 
          onClick={() => setFilter('current')}>Невыполненные</button>
      </div>

      <ul className="list-group">
        {filteredRecords.map(record => (
          <li key={record.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span 
              style={{ textDecoration: record.completed ? 'line-through' : 'none' }} 
              onClick={() => toggleStatus(record.id)} 
              className="cursor-pointer"
            >
              {record.text}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => setRecords(records.filter(r => r.id !== record.id))}>Удалить</button>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <p>Выполненные записи: {completedCount}</p>
        <p>Невыполненные записи: {currentCount}</p>
      </div>
    </div>
  );
};

export default RecordList;
