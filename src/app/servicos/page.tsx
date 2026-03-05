import Link from 'next/link';
import Header from '@/components/Header';
import './servicos.css';

export default function ServicosPage() {
  return (
    <div className="container">
      <Header />

      <div className="banner">
        <h1 className="bannerTitulo">Nossos Serviços</h1>
        <p className="bannerTexto">Soluções completas para você e seu veículo</p>
      </div>

      <div className="main">
        <div className="servicosGrid">
          
          <div className="servicoCard">
            <div className="servicoIcone">💰</div>
            <h2 className="servicoTitulo">Financiamento</h2>
            <p className="servicoDescricao">
              As melhores taxas do mercado, parcelas que cabem no seu bolso 
              e aprovação rápida.
            </p>
            <ul className="servicoLista">
              <li className="servicoItem">✓ Taxas a partir de 0,99% ao mês</li>
              <li className="servicoItem">✓ Aprovação em até 24h</li>
              <li className="servicoItem">✓ Parcelamento em até 60x</li>
            </ul>
          </div>

          <div className="servicoCard">
            <div className="servicoIcone">🔧</div>
            <h2 className="servicoTitulo">Oficina</h2>
            <p className="servicoDescricao">
              Oficina completa com profissionais especializados e equipamentos 
              de última geração.
            </p>
            <ul className="servicoLista">
              <li className="servicoItem">✓ Revisão programada</li>
              <li className="servicoItem">✓ Mecânica em geral</li>
              <li className="servicoItem">✓ Funilaria e pintura</li>
            </ul>
          </div>

          <div className="servicoCard">
            <div className="servicoIcone">📋</div>
            <h2 className="servicoTitulo">Consultoria</h2>
            <p className="servicoDescricao">
              Ajudamos você a escolher o carro ideal para seu perfil e 
              necessidade. Avaliamos seu veículo usado.
            </p>
            <ul className="servicoLista">
              <li className="servicoItem">✓ Avaliação de veículos</li>
              <li className="servicoItem">✓ Consultoria personalizada</li>
              <li className="servicoItem">✓ Negociação facilitada</li>
            </ul>
          </div>
        </div>

        <div className="cta">
          <h2 className="ctaTitulo">Fale com um consultor</h2>
          <p className="ctaTexto">
            Nossa equipe está preparada para atender você da melhor forma.
          </p>
          <div className="ctaBotoes">
            <a href="https://wa.me/5518996692266" target="_blank" className="ctaBotaoWhatsApp">WhatsApp</a>
            <Link href="/contato" className="ctaBotaoContato">Formulário</Link>
          </div>
        </div>
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