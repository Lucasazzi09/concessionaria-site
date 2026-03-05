import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET - Listar todas as mídias
export async function GET() {
  try {
    const midias = await query('SELECT * FROM TAB_MIDIA ORDER BY ordem');
    return NextResponse.json(midias);
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar mídias' }, { status: 500 });
  }
}

// POST - Adicionar nova mídia
export async function POST(request: Request) {
  try {
    const { titulo, tipo, url, secao } = await request.json();
    
    const result = await query(
      `INSERT INTO TAB_MIDIA (titulo, tipo, url, secao)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo, tipo, url, secao]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao adicionar mídia' }, { status: 500 });
  }
}

// PUT - Atualizar mídia existente
export async function PUT(request: Request) {
  try {
    const { id, titulo, tipo, url, secao, ordem, ativo } = await request.json();
    
    const result = await query(
      `UPDATE TAB_MIDIA 
       SET titulo = $1, tipo = $2, url = $3, secao = $4, ordem = $5, ativo = $6
       WHERE id = $7
       RETURNING *`,
      [titulo, tipo, url, secao, ordem, ativo, id]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao atualizar mídia' }, { status: 500 });
  }
}

// DELETE - Remover mídia
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await query('DELETE FROM TAB_MIDIA WHERE id = $1', [id]);
    return NextResponse.json({ sucesso: true });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao remover mídia' }, { status: 500 });
  }
}