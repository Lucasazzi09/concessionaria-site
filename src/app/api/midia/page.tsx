'use client';

import { useState } from 'react';
import Link from 'next/link';
import GerenciarMidia from '@/components/GerenciarMidia';

export default function AdminMidiaPage() {
  const [secao, setSecao] = useState('carrossel');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.titulo}>Gerenciar Mídia</h1>
        <Link href="/admin/dashboard" style={styles.botaoVoltar}>
          ← Voltar
        </Link>
      </div>

      <div style={styles.tabs}>
        <button 
          onClick={() => setSecao('carrossel')}
          style={secao === 'carrossel' ? styles.tabAtiva : styles.tab}
        >
          🎠 Carrossel
        </button>
        <button 
          onClick={() => setSecao('sobre')}
          style={secao === 'sobre' ? styles.tabAtiva : styles.tab}
        >
          📄 Sobre Nós
        </button>
        <button 
          onClick={() => setSecao('destaque')}
          style={secao === 'destaque' ? styles.tabAtiva : styles.tab}
        >
          ⭐ Destaques
        </button>
      </div>

      <GerenciarMidia secao={secao} />
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
    color: '#333',
    margin: 0
  },
  botaoVoltar: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  tab: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  tabAtiva: {
    padding: '10px 20px',
    backgroundColor: '#ff6b00',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};