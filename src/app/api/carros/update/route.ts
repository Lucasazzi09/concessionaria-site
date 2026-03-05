import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    const result = await query(
      `UPDATE TAB_CARRO 
       SET marca = $1, modelo = $2, ano = $3, preco = $4, 
           imagem_url = $5, descricao = $6, disponivel = $7
       WHERE id = $8
       RETURNING *`,
      [
        data.marca, 
        data.modelo, 
        data.ano, 
        data.preco, 
        data.imagem_url || null, 
        data.descricao || '', 
        data.disponivel, 
        data.id
      ]
    );
    
    return NextResponse.json({ 
      sucesso: true, 
      carro: result[0]
    });
    
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { erro: 'Erro ao atualizar carro' },
      { status: 500 }
    );
  }
}