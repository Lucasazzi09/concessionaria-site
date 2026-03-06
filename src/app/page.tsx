import { query } from '@/lib/db';
import Link from 'next/link';
import Carrossel from '@/components/carrossel';
import GaleriaSobre from '@/components/GaleriaSobre';
import './home.css'; 

export default async function Home() {
  const carros = await query(`
    SELECT c.*, 
           (SELECT imagem_url FROM TAB_CARRO_IMAGEM 
            WHERE carro_id = c.id 
            ORDER BY ordem LIMIT 1) as primeira_imagem
    FROM TAB_CARRO c
    WHERE c.disponivel = true
  `);

  const midias = await query(`
    SELECT * FROM TAB_MIDIA 
    WHERE secao = 'carrossel' 
    ORDER BY ordem
  `);

  const midiasSobre = await query(`
    SELECT * FROM TAB_MIDIA 
    WHERE secao = 'sobre' 
    ORDER BY ordem
  `);

  return (
    <div className="container">
      <header className="header">
        <div className="headerContent">
          <div className="logoArea">
            <h1 className="logo">LUCAS VEÍCULOS</h1>
            <p className="slogan">Há 10 anos realizando sonhos</p>
          </div>
          
          <nav className="menu">
            <a href="/" className="menuLink">Home</a>
            <a href="/empresa" className="menuLink">Empresa</a>
            <a href="/estoque" className="menuLink">Estoque</a>
            <a href="/servicos" className="menuLink">Serviços</a>
            <a href="/contato" className="menuLink">Contato</a>
          </nav>
        </div>
      </header>

      <Carrossel midias={midias} />

      <section className="sobre">
        <div className="sobreContainer">
          <div className="sobreTexto">
            <h2 className="sobreTitulo">SOBRE NÓS</h2>
            <p className="sobreDescricao">
              A LUCAS VEÍCULOS foi fundada em 2016, especializada na comercialização 
              de veículos novos e seminovos.
            </p>
            <p className="sobreDescricao">
              Uma empresa automotiva de multimarcas nacionais e importados, 
              com compromisso de qualidade e transparência em cada negócio.
            </p>
            <a href="/empresa" className="sobreBotao">CLIQUE AQUI PARA SABER MAIS!</a>
          </div>
          
          <div className="sobreImagem">
            <GaleriaSobre midias={midiasSobre} />
          </div>
        </div>
      </section>

      <section className="destaque">
        <h2 className="destaqueTitulo">Veículos em Destaque</h2>
        <div className="carrosGrid">
          {carros.slice(0, 3).map((carro: any) => (
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
                    href={`https://wa.me/5518996692266?text=Olá, tenho interesse no ${carro.marca} ${carro.modelo}`}
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
      </section>

      <footer className="footer">
        <div className="footerContainer">
          <div className="footerColuna">
            <h3 className="footerTitulo">LUCAS VEÍCULOS</h3>
            <p className="footerTexto">Há 10 anos realizando sonhos</p>
          </div>
          
          <div className="footerColuna">
            <h3 className="footerTitulo">Horário</h3>
            <p className="footerTexto">Seg a Sex: 9h às 18h</p>
            <p className="footerTexto">Sábado: 9h às 12h</p>
          </div>
          
          <div className="footerColuna">
            <h3 className="footerTitulo">Contato</h3>
            <p className="footerTexto">(18) 99669-2266</p>
            <p className="footerTexto">contato@lucas.com</p>
          </div>
          
          <div className="footerColuna">
            <h3 className="footerTitulo">Endereço</h3>
            <p className="footerTexto">Av. Teste, 1000</p>
            <p className="footerTexto">Centro - Araçatuba/SP</p>
          </div>
        </div>
        
        <div className="footerBottom">
          <p className="copyright">© 2026 Desenvolvido por AzSistemas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}