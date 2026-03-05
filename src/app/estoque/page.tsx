'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header'; 
import './estoque.css';

interface Carro {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  primeira_imagem: string | null;
  disponivel: boolean;
}

export default function EstoquePage() {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [carrosFiltrados, setCarrosFiltrados] = useState<Carro[]>([]);
  const [carregando, setCarregando] = useState(true);
  
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');
  const [ordenacao, setOrdenacao] = useState('menor-preco');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('/api/carros')
      .then(res => res.json())
      .then(data => {
        setCarros(data);
        setCarrosFiltrados(data);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  useEffect(() => {
    let resultado = [...carros];

    if (marcaSelecionada) {
      resultado = resultado.filter(carro => carro.marca === marcaSelecionada);
    }

    if (anoSelecionado) {
      resultado = resultado.filter(carro => carro.ano.toString() === anoSelecionado);
    }

    if (busca) {
      resultado = resultado.filter(carro => 
        carro.modelo.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (ordenacao === 'menor-preco') {
      resultado.sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === 'maior-preco') {
      resultado.sort((a, b) => b.preco - a.preco);
    } else if (ordenacao === 'ano-novo') {
      resultado.sort((a, b) => b.ano - a.ano);
    } else if (ordenacao === 'ano-velho') {
      resultado.sort((a, b) => a.ano - b.ano);
    }

    setCarrosFiltrados(resultado);
  }, [marcaSelecionada, anoSelecionado, ordenacao, busca, carros]);

  const marcas = [...new Set(carros.map(carro => carro.marca))].sort();
  const anos = [...new Set(carros.map(carro => carro.ano))].sort((a, b) => b - a);

  function limparFiltros() {
    setMarcaSelecionada('');
    setAnoSelecionado('');
    setOrdenacao('menor-preco');
    setBusca('');
  }

  if (carregando) {
    return <div className="carregando">Carregando veículos...</div>;
  }

  return (
    <div className="container">
      {/* 👇 USA O MESMO HEADER DAS OUTRAS PÁGINAS */}
      <Header />

      <div className="banner">
        <h1 className="bannerTitulo">Nosso Estoque</h1>
        <p className="bannerTexto">Confira todos os veículos disponíveis</p>
      </div>

      <div className="filtros">
        <div className="filtrosContainer">
          <select 
            className="select"
            value={marcaSelecionada}
            onChange={(e) => setMarcaSelecionada(e.target.value)}
          >
            <option value="">Todas as marcas</option>
            {marcas.map(marca => <option key={marca} value={marca}>{marca}</option>)}
          </select>
          
          <select 
            className="select"
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(e.target.value)}
          >
            <option value="">Todos os anos</option>
            {anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
          </select>
          
          <select 
            className="select"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <option value="menor-preco">Preço: menor para maior</option>
            <option value="maior-preco">Preço: maior para menor</option>
            <option value="ano-novo">Ano: mais novo</option>
            <option value="ano-velho">Ano: mais velho</option>
          </select>
          
          <input 
            type="text" 
            placeholder="Buscar por modelo..."
            className="input"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          {(marcaSelecionada || anoSelecionado || busca || ordenacao !== 'menor-preco') && (
            <button className="botaoLimpar" onClick={limparFiltros}>
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <div className="main">
        <p className="resultadoInfo">{carrosFiltrados.length} veículo(s) encontrado(s)</p>

        {carrosFiltrados.length === 0 ? (
          <div className="semCarros">
            <p>Nenhum veículo encontrado</p>
            <button className="botaoLimparGrande" onClick={limparFiltros}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="carrosGrid">
            {carrosFiltrados.map((carro) => (
              <div key={carro.id} className="card">
                <div className="cardImagem">
                  {carro.primeira_imagem ? (
                    <img src={carro.primeira_imagem} alt={carro.modelo} />
                  ) : (
                    <div className="semImagem">🚗</div>
                  )}
                </div>
                <div className="cardInfo">
                  <h3 className="cardModelo">{carro.marca} {carro.modelo}</h3>
                  <p className="cardAno">Ano {carro.ano}</p>
                  <p className="cardPreco">
                    R$ {Number(carro.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="cardBotoes">
                    <Link href={`/carro/${carro.id}`} className="botaoDetalhes">
                      Ver detalhes
                    </Link>
                    <a 
                      href={`https://wa.me/5518996692266?text=Olá, tenho interesse no ${carro.marca} ${carro.modelo} ${carro.ano}`}
                      target="_blank"
                      className="botaoWhatsApp"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footerContainer">
          <div>
            <h3 className="footerTitulo">LUCAS VEÍCULOS</h3>
            <p className="footerTexto">Há 10 anos realizando sonhos</p>
          </div>
          <div>
            <h3 className="footerTitulo">Horário</h3>
            <p className="footerTexto">Seg a Sex: 9h às 18h</p>
            <p className="footerTexto">Sábado: 9h às 12h</p>
          </div>
          <div>
            <h3 className="footerTitulo">Contato</h3>
            <p className="footerTexto">(18) 99669-2266</p>
            <p className="footerTexto">contato@lucas.com</p>
          </div>
          <div>
            <h3 className="footerTitulo">Endereço</h3>
            <p className="footerTexto">Av. Teste, 1000</p>
            <p className="footerTexto">Araçatuba/SP</p>
          </div>
        </div>
        <div className="footerBottom">
          <p className="copyright">© 2026 Lucas Veículos</p>
        </div>
      </footer>
    </div>
  );
}