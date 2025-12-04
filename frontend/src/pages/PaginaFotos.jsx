import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PaginaFotos() {
  const [modo, setModo] = useState('lista');
  const [fotos, setFotos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [formulario, setFormulario] = useState({ 
    nomeArquivo: '', 
    caminho: '', 
    capa: false, 
    ordem: 1,
    imovelId: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [fotosData, imoveisData] = await Promise.all([
        api.get('/fotos'),
        api.get('/imoveis')
      ]);
      setFotos(fotosData);
      setImoveis(imoveisData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const salvarFoto = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formulario,
        imovel: imoveis.find(i => i.id == formulario.imovelId)
      };

      if (formulario.id) {
        await api.put(`/fotos/${formulario.id}`, payload);
      } else {
        await api.post('/fotos', payload);
      }
      await carregarDados();
      setModo('lista');
      setFormulario({ nomeArquivo: '', caminho: '', capa: false, ordem: 1, imovelId: '' });
    } catch (error) {
      alert('Erro ao salvar foto');
    }
  };

  const deletarFoto = async (id) => {
    if (confirm('Deseja excluir esta foto?')) {
      try {
        await api.delete(`/fotos/${id}`);
        await carregarDados();
      } catch (error) {
        alert('Erro ao excluir foto');
      }
    }
  };

  const editarFoto = (foto) => {
    setFormulario({
      ...foto,
      imovelId: foto.imovel?.id
    });
    setModo('formulario');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 border-b border-[#0B132B]/10 pb-4">
        <h1 className="text-3xl font-light text-[#0B132B]">Galeria de Fotos</h1>
        {modo === 'lista' && (
          <button 
            onClick={() => setModo('formulario')}
            className="px-4 py-2 rounded-md bg-[#0B132B] text-[#FFFFE4] hover:bg-[#0B132B]/90 transition shadow-lg"
          >
            + Adicionar Foto
          </button>
        )}
        {modo === 'formulario' && (
          <button 
            onClick={() => setModo('lista')}
            className="px-4 py-2 rounded-md border border-[#0B132B] text-[#0B132B] hover:bg-[#0B132B] hover:text-[#FFFFE4] transition"
          >
            Voltar
          </button>
        )}
      </div>

      {modo === 'lista' ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fotos.map((foto) => (
              <div key={foto.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-[#0B132B]/10">
                {foto.caminho ? (
                  <img 
                    src={foto.caminho} 
                    alt={foto.nomeArquivo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-200">
                    <span className="text-sm font-medium">{foto.nomeArquivo}</span>
                    <span className="text-xs mt-1">Imóvel: {foto.imovel?.titulo || 'N/A'}</span>
                  </div>
                )}
                {foto.capa && (
                  <span className="absolute top-2 left-2 bg-[#0B132B] text-[#FFFFE4] text-xs px-2 py-1 rounded">
                    Capa
                  </span>
                )}
                <div className="absolute inset-0 bg-[#0B132B]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => editarFoto(foto)}
                    className="text-[#FFFFE4] hover:scale-110 transition"
                    title="Editar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => deletarFoto(foto.id)}
                    className="text-[#FFFFE4] hover:scale-110 transition"
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {fotos.length === 0 && (
            <div className="text-center py-12 text-[#0B132B]/50">
              Nenhuma foto cadastrada. Clique em "+ Adicionar Foto" para começar.
            </div>
          )}
        </>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg border border-[#0B132B]/10 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-[#0B132B]">
            {formulario.id ? 'Editar Foto' : 'Nova Foto'}
          </h2>
          <form onSubmit={salvarFoto} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Nome do Arquivo</label>
              <input 
                type="text" 
                required
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition"
                value={formulario.nomeArquivo}
                onChange={e => setFormulario({...formulario, nomeArquivo: e.target.value})}
                placeholder="Ex: foto_frente.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">URL/Caminho da Imagem</label>
              <input 
                type="text" 
                required
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition"
                value={formulario.caminho}
                onChange={e => setFormulario({...formulario, caminho: e.target.value})}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Imóvel</label>
              <select 
                required
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition bg-white"
                value={formulario.imovelId || ''}
                onChange={e => setFormulario({...formulario, imovelId: e.target.value})}
              >
                <option value="">Selecione um imóvel...</option>
                {imoveis.map(i => <option key={i.id} value={i.id}>{i.titulo}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Ordem de Exibição</label>
              <input 
                type="number" 
                min="1"
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition"
                value={formulario.ordem}
                onChange={e => setFormulario({...formulario, ordem: parseInt(e.target.value) || 1})}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#0B132B] cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-[#0B132B]/20"
                  checked={formulario.capa || false}
                  onChange={e => setFormulario({...formulario, capa: e.target.checked})}
                />
                Definir como foto de capa
              </label>
            </div>
            <div className="pt-4 flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => {
                  setModo('lista');
                  setFormulario({ nomeArquivo: '', caminho: '', capa: false, ordem: 1, imovelId: '' });
                }}
                className="px-6 py-2 rounded-md border border-[#0B132B]/20 text-[#0B132B] hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2 rounded-md bg-[#0B132B] text-[#FFFFE4] hover:bg-[#0B132B]/90 transition shadow-md"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PaginaFotos;
