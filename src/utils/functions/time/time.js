const convertTimestampToDate = (time) => {
  return new Date(time * 1000);
}

const convertWeekday = (time) => {
  const weekDay = convertTimestampToDate(time).getDay();

  switch (weekDay) {
    case 0:
      return { value: 0, description: 'Domingo' };
    case 1:
      return { value: 1, description: 'Segunda' };
    case 2:
      return { value: 2, description: 'Terça' };
    case 3:
      return { value: 3, description: 'Quarta' };
    case 4:
      return { value: 4, description: 'Quinta' };
    case 5:
      return { value: 5, description: 'Sexta' };
    case 6:
      return { value: 6, description: 'Sábado' };
  };
}

export { convertTimestampToDate, convertWeekday };