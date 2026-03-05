import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const tipo = formData.get('tipo') as string; // 'imagem' ou 'video'
    
    if (!file) {
      return NextResponse.json({ erro: 'Nenhum arquivo' }, { status: 400 });
    }

    // Validações
    if (tipo === 'imagem' && !file.type.startsWith('image/')) {
      return NextResponse.json({ erro: 'Arquivo não é imagem' }, { status: 400 });
    }
    
    if (tipo === 'video' && !file.type.startsWith('video/')) {
      return NextResponse.json({ erro: 'Arquivo não é vídeo' }, { status: 400 });
    }

    // Limite de tamanho (imagem: 5MB, vídeo: 50MB)
    const limite = tipo === 'imagem' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > limite) {
      return NextResponse.json(
        { erro: `Arquivo muito grande. Máximo ${tipo === 'imagem' ? '5MB' : '50MB'}` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.name.split('.').pop();
    const filename = `${tipo}-${uniqueSuffix}.${extension}`;
    
    const uploadDir = path.join(process.cwd(), 'public/midia');
    await mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    const url = `/midia/${filename}`;
    
    return NextResponse.json({ sucesso: true, url });
    
  } catch (error) {
    return NextResponse.json({ erro: 'Erro no upload' }, { status: 500 });
  }
}