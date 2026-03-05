import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET - Listar todos os carros com a primeira imagem
export async function GET() {
  try {
    const carros = await query(`
      SELECT c.*, 
             (SELECT imagem_url FROM TAB_CARRO_IMAGEM 
              WHERE carro_id = c.id 
              ORDER BY ordem LIMIT 1) as primeira_imagem
      FROM TAB_CARRO c
      ORDER BY c.id DESC
    `);
    
    return NextResponse.json(carros);
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    return NextResponse.json({ erro: 'Erro ao buscar carros' }, { status: 500 });
  }
}

// POST - Criar novo carro
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const result = await query(
      `INSERT INTO TAB_CARRO (marca, modelo, ano, preco, descricao, disponivel)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [data.marca, data.modelo, data.ano, data.preco, data.descricao, data.disponivel]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    return NextResponse.json({ erro: 'Erro ao criar carro' }, { status: 500 });
  }
}