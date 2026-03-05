'use client';

import { useRouter } from 'next/navigation';

interface DeletarCarroButtonProps {
  id: number;
}

export function DeletarCarroButton({ id }: DeletarCarroButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este carro?')) return;
    
    try {
      const response = await fetch(`/api/carros/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        router.push('/admin/carros?sucesso=Carro excluído com sucesso!');
        router.refresh();
      } else {
        alert('Erro ao excluir carro');
      }
    } catch (error) {
      alert('Erro ao excluir carro');
    }
  }

  return (
    <button 
      onClick={handleDelete}
      style={styles.botaoExcluir}
    >
      Excluir
    </button>
  );
}

const styles = {
  botaoExcluir: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};