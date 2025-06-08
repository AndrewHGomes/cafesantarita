import { useEffect, useState } from "react";
import {
  salvarEntrega,
  carregarEntregas,
  formatarData,
  limparEntregas,
} from "./utilidades";

const App = () => {
  const [formAberto, setFormAberto] = useState(false);
  const [listaAberta, setListaAberta] = useState(false);

  const [dataEntrega, setDataEntrega] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [qtdCafe, setQtdCafe] = useState("");
  const [qtdLeite, setQtdLeite] = useState("");
  const [qtdCafeLeite, setQtdCafeLeite] = useState("");

  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    setEntregas(carregarEntregas());
  }, []);

  const abrirFormulario = () => {
    setFormAberto(!formAberto);
  };

  const abrirLista = () => setListaAberta(!listaAberta);

  const handleSalvar = (e) => {
    e.preventDefault();

    const novaEntrega = {
      id: Date.now(),
      dataEntrega,
      nomeEmpresa,
      qtdCafe,
      qtdLeite,
      qtdCafeLeite,
    };

    salvarEntrega(novaEntrega);

    setEntregas(carregarEntregas());

    // setDataEntrega("");
    setNomeEmpresa("");
    setQtdCafe("");
    setQtdLeite("");
    setQtdCafeLeite("");
  };

  const handleLimparTudo = () => {
    limparEntregas();
    setEntregas([]);
    setListaAberta(false);
  };

  return (
    <>
      <header>
        <h3>Lista de Café da Manhã</h3>
      </header>
      <main>
        <section>
          <h4 onClick={abrirFormulario}>MARCAR ENTREGAS</h4>
          {formAberto && (
            <div>
              <form onSubmit={handleSalvar}>
                <div>
                  <label>
                    <span>Data da entrega:</span>
                    <input
                      type="date"
                      id="dataEntrega"
                      value={dataEntrega}
                      onChange={(e) => setDataEntrega(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Empresa:</span>
                    <input
                      type="text"
                      id="nomeEmpresa"
                      placeholder="Nome da empresa"
                      value={nomeEmpresa}
                      onChange={(e) =>
                        setNomeEmpresa(e.target.value.toUpperCase())
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Quantidade de Café:</span>
                    <input
                      type="text"
                      id="qtdCafe"
                      value={qtdCafe}
                      onChange={(e) => setQtdCafe(e.target.value.toUpperCase())}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Quantidade de Leite:</span>
                    <input
                      type="text"
                      id="qtdLeite"
                      value={qtdLeite}
                      onChange={(e) =>
                        setQtdLeite(e.target.value.toUpperCase())
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Quantidade de Café com Leite:</span>
                    <input
                      type="text"
                      id="qtdCafeLeite"
                      value={qtdCafeLeite}
                      onChange={(e) =>
                        setQtdCafeLeite(e.target.value.toUpperCase())
                      }
                    />
                  </label>
                </div>
                <button>SALVAR</button>
              </form>
            </div>
          )}
        </section>
        <section>
          <h4 onClick={abrirLista}>VER ENTREGAS</h4>
          {listaAberta && (
            <div>
              {entregas.length === 0 ? (
                <p>Nenhuma entrega foi agendada.</p>
              ) : (
                <>
                  {entregas.map((entrega) => (
                    <div className="entrega" key={entrega.id}>
                      <ul>
                        <li>Data: {formatarData(entrega.dataEntrega)}</li>
                        <li>Empresa: {entrega.nomeEmpresa}</li>
                        <li>Café: {entrega.qtdCafe} </li>
                        <li>Leite: {entrega.qtdLeite} </li>
                        <li>Café c/ Leite: {entrega.qtdCafeLeite} </li>
                      </ul>
                    </div>
                  ))}
                </>
              )}
              <button onClick={handleLimparTudo}>LIMPAR TUDO</button>
            </div>
          )}
        </section>
      </main>
      <footer>
        <h5>Santa Rita &copy; 2025</h5>
      </footer>
    </>
  );
};

export default App;
