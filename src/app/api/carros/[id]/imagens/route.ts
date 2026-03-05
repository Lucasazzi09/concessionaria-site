import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET - Listar imagens
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔵 GET /api/carros/' + params.id + '/imagens');
  
  try {
    const imagens = await query(
      'SELECT * FROM TAB_CARRO_IMAGEM WHERE carro_id = $1 ORDER BY ordem',
      [params.id]
    );
    
    console.log('✅ Imagens encontradas:', imagens.length);
    return NextResponse.json(imagens);
  } catch (error) {
    console.error('❌ Erro:', error);
    return NextResponse.json({ erro: 'Erro ao buscar imagens' }, { status: 500 });
  }
}

// POST - Adicionar imagem
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔵 POST /api/carros/' + params.id + '/imagens');
  
  try {
    const { imagem_url } = await request.json();
    console.log('📦 Imagem recebida:', imagem_url);

    if (!imagem_url) {
      return NextResponse.json({ erro: 'URL da imagem não fornecida' }, { status: 400 });
    }

    const maxOrdem = await query(
      'SELECT COALESCE(MAX(ordem), -1) as max FROM TAB_CARRO_IMAGEM WHERE carro_id = $1',
      [params.id]
    );
    
    const novaOrdem = maxOrdem[0].max + 1;
    
    const result = await query(
      `INSERT INTO TAB_CARRO_IMAGEM (carro_id, imagem_url, ordem)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [params.id, imagem_url, novaOrdem]
    );
    
    console.log('✅ Imagem salva:', result[0]);
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('❌ Erro:', error);
    return NextResponse.json({ erro: 'Erro ao adicionar imagem' }, { status: 500 });
  }
}

// DELETE - Remover imagem
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔵 DELETE /api/carros/' + params.id + '/imagens');
  
  try {
    const { imagem_url } = await request.json();
    
    await query(
      'DELETE FROM TAB_CARRO_IMAGEM WHERE carro_id = $1 AND imagem_url = $2',
      [params.id, imagem_url]
    );
    
    console.log('✅ Imagem removida');
    
    return NextResponse.json({ sucesso: true });
  } catch (error) {
    console.error('❌ Erro:', error);
    return NextResponse.json({ erro: 'Erro ao remover imagem' }, { status: 500 });
  }
}