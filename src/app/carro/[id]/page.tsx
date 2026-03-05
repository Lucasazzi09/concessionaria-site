import { query } from '@/lib/db';
import Link from 'next/link';
import GaleriaCarro from '@/components/GaleriaCarro';
import './detalhe.css';

export default async function DetalheCarroPage({ params }: { params: { id: string } }) {
  const carros = await query('SELECT * FROM TAB_CARRO WHERE id = $1', [params.id]);
  const carro = carros[0];

  if (!carro) {
    return (
      <div className="container">
        <h1>Carro não encontrado</h1>
        <Link href="/">Voltar para home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <Link href="/" className="logo">
          <h1 className="titulo">LUCAS VEÍCULOS</h1>
          <p className="subtitulo">Há 10 anos realizando sonhos</p>
        </Link>
        <Link href="/admin/login" className="linkAdmin">
          Área do Gerente
        </Link>
      </header>

      <Link href="/estoque" className="botaoVoltar">
        ← Voltar para lista
      </Link>

      <div className="detalheContainer">
        <div className="galeriaContainer">
          <GaleriaCarro carroId={carro.id} />
        </div>

        <div className="infoContainer">
          <h1 className="tituloDetalhe">{carro.marca} {carro.modelo}</h1>
          <p className="anoDetalhe">Ano {carro.ano}</p>
          <p className="precoDetalhe">
            R$ {Number(carro.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>

          {carro.descricao && (
            <div className="descricao">
              <h2 className="descricaoTitulo">Sobre o veículo</h2>
              <p className="descricaoTexto">{carro.descricao}</p>
            </div>
          )}

          <div className="caracteristicas">
            <div className="caracteristicaItem">
              <span className="caracteristicaLabel">Marca</span>
              <span className="caracteristicaValor">{carro.marca}</span>
            </div>
            <div className="caracteristicaItem">
              <span className="caracteristicaLabel">Modelo</span>
              <span className="caracteristicaValor">{carro.modelo}</span>
            </div>
            <div className="caracteristicaItem">
              <span className="caracteristicaLabel">Ano</span>
              <span className="caracteristicaValor">{carro.ano}</span>
            </div>
            <div className="caracteristicaItem">
              <span className="caracteristicaLabel">Preço</span>
              <span className="caracteristicaValor">
                R$ {Number(carro.preco).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          <a 
            href={`https://wa.me/5518996692266?text=Olá, tenho interesse no ${carro.marca} ${carro.modelo} ${carro.ano}`}
            target="_blank"
            rel="noopener noreferrer"
            className="botaoWhatsApp"
          >
            Falar com vendedor no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}