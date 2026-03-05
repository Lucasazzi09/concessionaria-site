import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { erro: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Validações
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { erro: 'Arquivo não é uma imagem' },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      return NextResponse.json(
        { erro: 'Imagem muito grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Converte para buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cria nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.name.split('.').pop();
    const filename = `carro-${uniqueSuffix}.${extension}`;
    
    // Caminho para salvar (pasta public/uploads)
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Garante que a pasta existe
    await mkdir(uploadDir, { recursive: true });
    
    // Caminho completo do arquivo
    const filepath = path.join(uploadDir, filename);
    
    // Salva o arquivo
    await writeFile(filepath, buffer);
    
    // URL pública da imagem (para acessar no navegador)
    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ 
      sucesso: true, 
      imagem_url: imageUrl 
    });
    
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { erro: 'Erro ao fazer upload' },
      { status: 500 }
    );
  }
}