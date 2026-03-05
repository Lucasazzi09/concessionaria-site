'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function DetalheCarro() {
  const params = useParams();
  const id = Number(params.id);
  

  if (!carro) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Carro não encontrado</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Concessionária XYZ
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Voltar para lista
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* FOTO */}
            <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
              <div className="relative w-full h-96">
                <Image
                  src={carro.imagem_base64}
                  alt={`${carro.marca} ${carro.modelo}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* INFORMAÇÕES */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-2">
                {carro.marca} {carro.modelo}
              </h1>
              
              <p className="text-gray-600 text-lg mb-4">Ano {carro.ano}</p>
              
              <p className="text-3xl font-bold text-green-600 mb-6">
                R$ {carro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                <p className="text-gray-700">{carro.descricao}</p>
              </div>

              {/* CARACTERÍSTICAS */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500">Marca</span>
                  <p className="font-semibold">{carro.marca}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500">Modelo</span>
                  <p className="font-semibold">{carro.modelo}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500">Ano</span>
                  <p className="font-semibold">{carro.ano}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500">Preço</span>
                  <p className="font-semibold text-green-600">
                    R$ {carro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* BOTÃO WHATSAPP */}
              <a
                href={`https://wa.me/5511999999999?text=Olá, tenho interesse no ${carro.marca} ${carro.modelo} ${carro.ano}`}
                target="_blank"
                className="block w-full bg-green-600 text-white text-center py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Falar com vendedor no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}