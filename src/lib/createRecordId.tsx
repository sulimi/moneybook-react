let id = parseInt(window.localStorage.getItem('idRecord') || '0');
const createRecordId = () => {
  id++;
  window.localStorage.setItem('idRecord', id.toString());
  return id;
};

export {createRecordId};