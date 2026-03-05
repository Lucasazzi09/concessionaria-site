import { query } from '@/lib/db';
import Link from 'next/link';
import Header from '@/components/Header';
import GaleriaSobre from '@/components/GaleriaSobre';

export default async function EmpresaPage() {
  // Busca as mídias da seção "empresa"
  const midiasEmpresa = await query(`
    SELECT * FROM TAB_MIDIA 
    WHERE secao = 'empresa' 
    ORDER BY ordem
  `);

  return (
    <div style={styles.container}>
      <Header />
p
      <div style={styles.banner}>
        <h1 style={styles.bannerTitulo}>Nossa História</h1>
        <p style={styles.bannerTexto}>Conheça a trajetória de sucesso da LUCAS VEÍCULOS</p>
      </div>

      <div style={styles.main}>
        <div style={styles.sobreContainer}>
          <div style={styles.sobreTexto}>
            <h2 style={styles.titulo}>Sobre a LUCAS VEÍCULOS</h2>
            
            <p style={styles.paragrafo}>
              Fundada em 2016, a LUCAS VEÍCULOS nasceu do sonho de dois amigos que sempre foram apaixonados por carros. 
              Com muito trabalho e dedicação, construímos uma das maiores redes de concessionárias da região.
            </p>
            
            <p style={styles.paragrafo}>
              Especializada na comercialização e intermediação de automóveis 0 km e seminovos, 
              somos uma empresa automotiva de multimarcas nacionais e importados.
            </p>

            <div style={styles.numeros}>
              <div style={styles.numeroItem}>
                <span style={styles.numeroValor}>10</span>
                <span style={styles.numeroLabel}>Anos de história</span>
              </div>
              <div style={styles.numeroItem}>
                <span style={styles.numeroValor}>5000+</span>
                <span style={styles.numeroLabel}>Clientes satisfeitos</span>
              </div>
              <div style={styles.numeroItem}>
                <span style={styles.numeroValor}>10</span>
                <span style={styles.numeroLabel}>Marcas parceiras</span>
              </div>
            </div>
          </div>

          {/* Galeria de imagens/vídeos da empresa */}
          <div style={styles.sobreImagem}>
            <GaleriaSobre midias={midiasEmpresa} />
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerColuna}>
            <h3 style={styles.footerTitulo}>LUCAS VEÍCULOS</h3>
            <p style={styles.footerTexto}>Há 10 anos realizando sonhos</p>
          </div>
          
          <div style={styles.footerColuna}>
            <h3 style={styles.footerTitulo}>Horário</h3>
            <p style={styles.footerTexto}>Seg a Sex: 9h às 18h</p>
            <p style={styles.footerTexto}>Sábado: 9h às 12h</p>
          </div>
          
          <div style={styles.footerColuna}>
            <h3 style={styles.footerTitulo}>Contato</h3>
            <p style={styles.footerTexto}>(18) 99669-2266</p>
            <p style={styles.footerTexto}>contato@lucas.com</p>
          </div>
          
          <div style={styles.footerColuna}>
            <h3 style={styles.footerTitulo}>Endereço</h3>
            <p style={styles.footerTexto}>Av. Teste, 1000</p>
            <p style={styles.footerTexto}>Centro - Araçatuba/SP</p>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2026 Desenvolvido por AzSistemas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5'
  },
  banner: {
    backgroundColor: '#333',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center' as const,
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  bannerTitulo: {
    fontSize: '36px',
    marginBottom: '10px'
  },
  bannerTexto: {
    fontSize: '18px',
    color: '#ccc'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px'
  },
  sobreContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    alignItems: 'center'
  },
  titulo: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '20px'
  },
  paragrafo: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.8',
    marginBottom: '20px'
  },
  numeros: {
    display: 'flex',
    gap: '30px',
    marginTop: '30px'
  },
  numeroItem: {
    textAlign: 'center' as const
  },
  numeroValor: {
    display: 'block',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ff6b00'
  },
  numeroLabel: {
    fontSize: '14px',
    color: '#666'
  },
  sobreImagem: {
    backgroundColor: '#f0f0f0',
    height: '400px',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    paddingTop: '40px'
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px'
  },
  footerColuna: {},
  footerTitulo: {
    fontSize: '16px',
    marginBottom: '15px',
    color: '#ff6b00'
  },
  footerTexto: {
    fontSize: '14px',
    color: '#ccc',
    margin: '5px 0'
  },
  footerBottom: {
    borderTop: '1px solid #333',
    marginTop: '40px',
    padding: '20px',
    textAlign: 'center' as const
  },
  copyright: {
    fontSize: '12px',
    color: '#666',
    margin: 0
  }
};