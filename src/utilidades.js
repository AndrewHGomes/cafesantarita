const LISTA_ENTREGAS = "listaDeCafeDaManha";

export const salvarEntrega = (novaEntrega) => {
  const entregasExistentes = carregarEntregas();
  const listaAtualizada = [...entregasExistentes, novaEntrega];
  localStorage.setItem(LISTA_ENTREGAS, JSON.stringify(listaAtualizada));
};

export const carregarEntregas = () => {
  const entregasString = localStorage.getItem(LISTA_ENTREGAS);

  if (!entregasString) {
    return [];
  }

  try {
    return JSON.parse(entregasString);
  } catch (erro) {
    console.error("ERRO: ", erro);
    return [];
  }
};

export const formatarData = (dataString) => {
  if (!dataString) {
    return "";
  }
  const [ano, mes, dia] = dataString.split("-");
  const anoCurto = ano.substring(2);
  return `${dia}/${mes}/${anoCurto}`;
};

export const limparEntregas = () => {
  localStorage.clear();
};
