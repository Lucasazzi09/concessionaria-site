import { query } from '@/lib/db';
import Link from 'next/link';
import { DeletarCarroButton } from './DeletarCarroButton';

interface SearchParams {
  sucesso?: string;
  erro?: string;
}

export default async function AdminCarrosPage({ 
  searchParams 
}: { 
  searchParams?: SearchParams 
}) {
  // Busca carros direto do banco (isso roda no servidor)
  const carros = await query('SELECT * FROM TAB_CARRO ORDER BY id DESC');
  
  const mensagemSucesso = searchParams?.sucesso;
  const mensagemErro = searchParams?.erro;

  return (
    <div style={styles.container}>
      {/* Mensagens de retorno */}
      {mensagemSucesso && (
        <div style={styles.mensagemSucesso}>
          ✅ {mensagemSucesso}
        </div>
      )}
      
      {mensagemErro && (
        <div style={styles.mensagemErro}>
          ❌ {mensagemErro}
        </div>
      )}

      <div style={styles.header}>
        <h1 style={styles.titulo}>Gerenciar Carros</h1>
        <Link href="/admin/carros/novo" style={styles.botaoNovo}>
          + Novo Carro
        </Link>
      </div>

      <div style={styles.tabelaContainer}>
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Marca</th>
              <th style={styles.th}>Modelo</th>
              <th style={styles.th}>Ano</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {carros.map((carro: any) => (
              <tr key={carro.id}>
                <td style={styles.td}>{carro.id}</td>
                <td style={styles.td}>{carro.marca}</td>
                <td style={styles.td}>{carro.modelo}</td>
                <td style={styles.td}>{carro.ano}</td>
                <td style={styles.td}>
                  R$ {Number(carro.preco).toLocaleString('pt-BR')}
                </td>
                <td style={styles.td}>
                  <span style={carro.disponivel ? styles.statusDisponivel : styles.statusIndisponivel}>
                    {carro.disponivel ? 'Disponível' : 'Vendido'}
                  </span>
                </td>
                <td style={styles.td}>
                  <Link href={`/admin/carros/editar/${carro.id}`} style={styles.botaoEditar}>
                    Editar
                  </Link>
                  <DeletarCarroButton id={carro.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  mensagemSucesso: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px 20px',
    borderRadius: '5px',
    marginBottom: '20px',
    border: '1px solid #c3e6cb',
    textAlign: 'center' as const,
    fontWeight: 'bold'
  },
  mensagemErro: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px 20px',
    borderRadius: '5px',
    marginBottom: '20px',
    border: '1px solid #f5c6cb',
    textAlign: 'center' as const,
    fontWeight: 'bold'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  titulo: {
    fontSize: '24px',
    margin: 0,
    color: '#333'
  },
  botaoNovo: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '14px'
  },
  tabelaContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'auto'
  },
  tabela: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  th: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dee2e6',
    fontWeight: 'bold',
    color: '#333'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    color: '#666'
  },
  statusDisponivel: {
    padding: '3px 8px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '3px',
    fontSize: '12px',
    display: 'inline-block'
  },
  statusIndisponivel: {
    padding: '3px 8px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '3px',
    fontSize: '12px',
    display: 'inline-block'
  },
  botaoEditar: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '3px',
    marginRight: '5px',
    fontSize: '12px',
    display: 'inline-block'
  }
};