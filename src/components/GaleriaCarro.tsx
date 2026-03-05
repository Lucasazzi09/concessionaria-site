'use client';

import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface GaleriaCarroProps {
  carroId: number;
}

export default function GaleriaCarro({ carroId }: GaleriaCarroProps) {
  const [imagens, setImagens] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [lightboxAberto, setLightboxAberto] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);

  useEffect(() => {
    fetch(`/api/carros/${carroId}/imagens`)
      .then(res => res.json())
      .then(data => {
        const urls = data.map((img: any) => img.imagem_url);
        setImagens(urls);
      })
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, [carroId]);

  function abrirLightbox(index: number) {
    setImagemSelecionada(index);
    setLightboxAberto(true);
    // Trava o scroll do body
    document.body.style.overflow = 'hidden';
  }

  function fecharLightbox() {
    setLightboxAberto(false);
    // Libera o scroll do body
    document.body.style.overflow = 'auto';
  }

  function proximaImagem() {
    setImagemSelecionada((prev) => (prev + 1) % imagens.length);
  }

  function imagemAnterior() {
    setImagemSelecionada((prev) => (prev - 1 + imagens.length) % imagens.length);
  }

  if (carregando) {
    return <div style={styles.carregando}>Carregando...</div>;
  }

  if (imagens.length === 0) {
    return (
      <div style={styles.semImagem}>
        <span style={styles.icone}>🚗</span>
      </div>
    );
  }

  return (
    <>
      <div style={styles.container}>
        <Carousel
          showArrows={true}
          showStatus={true}
          showIndicators={true}
          infiniteLoop={true}
          showThumbs={true}
          useKeyboardArrows={true}
          swipeable={true}
          dynamicHeight={false}
          emulateTouch={true}
          onClickItem={(index) => abrirLightbox(index)} // ← Clique na imagem abre o lightbox
        >
          {imagens.map((url, index) => (
            <div key={index} style={styles.slide}>
              <img 
                src={url} 
                alt={`Foto ${index + 1}`}
                style={styles.imagem}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* LIGHTBOX (TELA CHEIA) */}
      {lightboxAberto && (
        <div style={styles.lightboxOverlay} onClick={fecharLightbox}>
          <div style={styles.lightboxContainer} onClick={(e) => e.stopPropagation()}>
            <button style={styles.lightboxFechar} onClick={fecharLightbox}>✕</button>
            
            {imagens.length > 1 && (
              <>
                <button style={{...styles.lightboxNavegacao, left: '20px'}} onClick={imagemAnterior}>
                  ←
                </button>
                <button style={{...styles.lightboxNavegacao, right: '20px'}} onClick={proximaImagem}>
                  →
                </button>
              </>
            )}
            
            <img 
              src={imagens[imagemSelecionada]} 
              alt={`Foto ${imagemSelecionada + 1}`}
              style={styles.lightboxImagem}
            />
            
            <div style={styles.lightboxInfo}>
              {imagemSelecionada + 1} de {imagens.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto'
  },
  slide: {
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer'
  },
  imagem: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const
  },
  carregando: {
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px'
  },
  semImagem: {
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    fontSize: '60px',
    color: '#ccc'
  },
  icone: {
    fontSize: '60px',
    color: '#ccc'
  },
  
  // LIGHTBOX STYLES
  lightboxOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightboxContainer: {
    position: 'relative' as const,
    width: '90vw',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightboxImagem: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const
  },
  lightboxFechar: {
    position: 'absolute' as const,
    top: '20px',
    right: '20px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightboxNavegacao: {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightboxInfo: {
    position: 'absolute' as const,
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px'
  }
};