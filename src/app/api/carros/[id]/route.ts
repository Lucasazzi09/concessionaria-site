import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM TAB_CARRO WHERE id = $1', [params.id]);
    return NextResponse.json({ sucesso: true });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao deletar' }, { status: 500 });
  }
}