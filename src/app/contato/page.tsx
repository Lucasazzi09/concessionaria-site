'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import './contato.css';

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      assunto: formData.get('assunto'),
      mensagem: formData.get('mensagem'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setEnviado(true);
        e.currentTarget.reset();
        setTimeout(() => setEnviado(false), 5000);
      } else {
        setErro(result.erro || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      setErro('Erro de conexão');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container">
      <Header />

      <div className="banner">
        <h1 className="bannerTitulo">Entre em Contato</h1>
        <p className="bannerTexto">Estamos prontos para atender você</p>
      </div>

      <div className="main">
        <div className="contatoContainer">
          
          <div className="infoContato">
            <h2 className="infoTitulo">Informações</h2>
            
            <div className="infoItem">
              <span className="infoIcone">📍</span>
              <div>
                <h3 className="infoLabel">Endereço</h3>
                <p className="infoTexto">Av. Teste, 1000 - Centro</p>
                <p className="infoTexto">Araçatuba/SP</p>
              </div>
            </div>

            <div className="infoItem">
              <span className="infoIcone">📞</span>
              <div>
                <h3 className="infoLabel">Telefone</h3>
                <p className="infoTexto">(18) 99669-2266</p>
              </div>
            </div>

            <div className="infoItem">
              <span className="infoIcone">✉️</span>
              <div>
                <h3 className="infoLabel">Email</h3>
                <p className="infoTexto">contato@lucas.com</p>
              </div>
            </div>

            <div className="infoItem">
              <span className="infoIcone">🕒</span>
              <div>
                <h3 className="infoLabel">Horário</h3>
                <p className="infoTexto">Seg a Sex: 9h às 18h</p>
                <p className="infoTexto">Sábado: 9h às 12h</p>
              </div>
            </div>
          </div>

          <div className="formularioContato">
            <h2 className="formTitulo">Envie mensagem</h2>
            
            {enviado && <div className="mensagemSucesso">✓ Mensagem enviada com sucesso!</div>}
            {erro && <div className="mensagemErro">❌ {erro}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="campo">
                <label className="label">Nome completo</label>
                <input 
                  type="text" 
                  name="nome"
                  className="input"
                  placeholder="Digite seu nome"
                  required
                  disabled={carregando}
                />
              </div>

              <div className="campo">
                <label className="label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="input"
                  placeholder="seu@email.com"
                  required
                  disabled={carregando}
                />
              </div>

              <div className="campo">
                <label className="label">Telefone</label>
                <input 
                  type="tel" 
                  name="telefone"
                  className="input"
                  placeholder="(18) 99669-2266"
                  required
                  disabled={carregando}
                />
              </div>

              <div className="campo">
                <label className="label">Assunto</label>
                <select 
                  name="assunto" 
                  className="select"
                  required
                  disabled={carregando}
                >
                  <option value="">Selecione</option>
                  <option value="Comprar">Comprar</option>
                  <option value="Vender">Vender</option>
                  <option value="Financiamento">Financiamento</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="campo">
                <label className="label">Mensagem</label>
                <textarea 
                  name="mensagem"
                  className="textarea"
                  rows={4}
                  placeholder="Digite sua mensagem..."
                  required
                  disabled={carregando}
                />
              </div>

              <button 
                type="submit" 
                className={carregando ? 'botaoEnviarDisabled' : 'botaoEnviar'}
                disabled={carregando}
              >
                {carregando ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>
        </div>

        <div className="whatsappDestaque">
          <h3 className="whatsappTitulo">📱 WhatsApp</h3>
          <p className="whatsappTexto">Atendimento rápido e personalizado</p>
          <a 
            href="https://wa.me/5518996692266" 
            target="_blank" 
            className="botaoWhatsapp"
          >
            Falar agora
          </a>
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