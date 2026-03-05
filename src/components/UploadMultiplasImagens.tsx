'use client';

import { useState, useEffect } from 'react';

interface UploadMultiplasImagensProps {
  carroId: number;
}

export default function UploadMultiplasImagens({ carroId }: UploadMultiplasImagensProps) {
  const [imagens, setImagens] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Carrega as imagens existentes
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      const formData = new FormData();
      formData.append('file', file);

      try {
        // 1. Faz upload do arquivo
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadRes.json();

        if (uploadRes.ok) {
          // 2. Salva a referência no banco
          const saveRes = await fetch(`/api/carros/${carroId}/imagens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imagem_url: uploadData.imagem_url })
          });

          if (saveRes.ok) {
            // 3. Atualiza a lista
            setImagens(prev => [...prev, uploadData.imagem_url]);
          }
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    }

    setUploading(false);
  }

  async function handleDelete(imagemUrl: string) {
    if (!confirm('Remover esta imagem?')) return;

    try {
      await fetch(`/api/carros/${carroId}/imagens`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagem_url: imagemUrl })
      });

      setImagens(prev => prev.filter(url => url !== imagemUrl));
    } catch (error) {
      alert('Erro ao remover imagem');
    }
  }

  if (carregando) {
    return <div style={styles.carregando}>Carregando imagens...</div>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>📸 Fotos do Carro</h3>
      
      <div style={styles.uploadArea}>
        <label style={styles.uploadButton}>
          {uploading ? 'Enviando...' : 'Selecionar múltiplas imagens'}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
        <p style={styles.uploadInfo}>
          Você pode selecionar várias fotos de uma vez. Formatos: JPG, PNG, WEBP (máx 5MB cada)
        </p>
      </div>

      {imagens.length > 0 && (
        <>
          <p style={styles.totalFotos}>{imagens.length} foto(s) cadastrada(s)</p>
          <div style={styles.galeria}>
            {imagens.map((url, index) => (
              <div key={index} style={styles.thumbContainer}>
                <img 
                  src={url} 
                  alt={`Foto ${index + 1}`}
                  style={styles.thumb}
                />
                <button 
                  onClick={() => handleDelete(url)}
                  style={styles.botaoRemover}
                  title="Remover imagem"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {imagens.length === 0 && !uploading && (
        <p style={styles.semImagens}>Nenhuma foto cadastrada ainda.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    border: '1px solid #eee'
  },
  titulo: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '15px'
  },
  carregando: {
    padding: '20px',
    textAlign: 'center' as const,
    color: '#666'
  },
  uploadArea: {
    border: '2px dashed #ddd',
    padding: '20px',
    textAlign: 'center' as const,
    marginBottom: '20px',
    backgroundColor: 'white',
    borderRadius: '8px'
  },
  uploadButton: {
    background: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '14px'
  },
  uploadInfo: {
    fontSize: '12px',
    color: '#999',
    marginTop: '10px'
  },
  totalFotos: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px'
  },
  galeria: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '15px'
  },
  thumbContainer: {
    position: 'relative' as const,
    paddingTop: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  thumb: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  botaoRemover: {
    position: 'absolute' as const,
    top: '5px',
    right: '5px',
    background: 'rgba(220, 53, 69, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px'
  },
  semImagens: {
    textAlign: 'center' as const,
    color: '#999',
    fontStyle: 'italic'
  }
};