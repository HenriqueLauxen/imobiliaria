import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PaginaFotos() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    carregarFotos();
  }, []);

  const carregarFotos = async () => {
    try {
      const dados = await api.get('/fotos');
      setFotos(dados);
    } catch (error) {
      console.error("Erro ao carregar fotos:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-light text-[#0B132B] mb-8 border-b border-[#0B132B]/10 pb-4">
        Galeria de Fotos
      </h1>

      <div className="bg-white p-8 rounded-lg border-2 border-dashed border-[#0B132B]/20 text-center mb-12 hover:bg-[#FFFFE4]/20 transition cursor-pointer">
        <div className="text-4xl mb-4 text-[#0B132B]/40">☁️</div>
        <h3 className="text-lg font-medium text-[#0B132B]">Arraste fotos aqui ou clique para selecionar</h3>
        <p className="text-sm text-[#0B132B]/50 mt-2">Suporta JPG, PNG (Max 5MB)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fotos.map((foto) => (
          <div key={foto.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-[#0B132B]/10">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
              {}
              Foto {foto.id}
            </div>
            <div className="absolute inset-0 bg-[#0B132B]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button className="text-[#FFFFE4] hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaginaFotos;
