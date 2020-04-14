import React from "react";

import "./styles.css";

export default function SelectReport({ times = [], handleMonth, handleTime }) {
  const MONTHS = [
    { name: "Janeiro", value: 1 },
    { name: "Fevereiro", value: 2 },
    { name: "Março", value: 3 },
    { name: "Abril", value: 4 },
    { name: "Maio", value: 5 },
    { name: "Junho", value: 6 },
    { name: "Julho", value: 7 },
    { name: "Agosto", value: 8 },
    { name: "Setembro", value: 9 },
    { name: "Outubro", value: 10 },
    { name: "Novembro", value: 11 },
    { name: "Dezembro", value: 12 },
  ];

  const handleSelectTime = (e) => {
    const time = e.target.value;

    handleTime(time);
  };

  const handleSelectMonth = (e) => {
    const month = e.target.value;

    handleMonth(month);
  };

  return (
    <div className="report">
      <h3>Relatórios</h3>
      <span>Observe como o time está evoluindo</span>
      <select className="select-time" onChange={handleSelectTime}>
        <option className="item-default" defaultValue hidden>
          Selecione o time
        </option>
        {times.map((time) => (
          <option key={time.name} className="time-item" value={time.value}>
            {time.name}
          </option>
        ))}
      </select>

      <select className="select-month" onChange={handleSelectMonth}>
        <option className="item-default" defaultValue hidden>
          Selecione o mês
        </option>
        {MONTHS.map((month) => (
          <option key={month.name} className="month-item" value={month.value}>
            {month.name}
          </option>
        ))}
      </select>

      <p>
        Saber como os times estão realizando as tarefas é importante para que em
        caso de declínio de Tempo x Tarefas, possa ser feito algo para reverter
        o quadro.
      </p>
    </div>
  );
}
