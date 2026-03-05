'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './dashboard.css';

export default function DashboardPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  useEffect(() => {
    const logado = sessionStorage.getItem('admin_logado');
    const nomeSalvo = sessionStorage.getItem('admin_nome');
    
    if (!logado) {
      router.push('/entrar');
    } else {
      setNome(nomeSalvo || 'Admin');
    }
  }, [router]);

  function handleLogout() {
    sessionStorage.clear();
    router.push('/entrar');
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="titulo">Painel Administrativo</h1>
        <button onClick={handleLogout} className="botaoSair">
          Sair
        </button>
      </div>

      <main className="main">
        <h2 className="boasVindas">Bem-vindo, {nome}!</h2>
        
        <div className="grid">
          <Link href="/admin/carros" className="card">
            <h3 className="cardTitulo">🚗 Carros</h3>
            <p className="cardDescricao">Gerenciar carros da loja</p>
          </Link>

          <Link href="/admin/midia" className="card">
            <h3 className="cardTitulo">📁 Mídia</h3>
            <p className="cardDescricao">Gerenciar imagens e vídeos do site</p>
          </Link>
        </div>
      </main>
    </div>
  );
}