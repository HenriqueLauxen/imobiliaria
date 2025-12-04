import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PaginaImoveis() {
  const [modo, setModo] = useState('lista');
  
  const [bairros, setBairros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [imoveis, setImoveis] = useState([]);

  const [formulario, setFormulario] = useState({
    titulo: '',
    preco: '',
    bairro: null,
    tipoImovel: null,
    area: '',
    descricao: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [imoveisData, bairrosData, tiposData] = await Promise.all([
        api.get('/imoveis'),
        api.get('/bairros'),
        api.get('/tiposimoveis')
      ]);
      setImoveis(imoveisData);
      setBairros(bairrosData);
      setTipos(tiposData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const salvarImovel = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formulario,
        bairro: bairros.find(b => b.id == formulario.bairroId),
        tipoImovel: tipos.find(t => t.id == formulario.tipoId)
      };

      if (formulario.id) {
        await api.put(`/imoveis/${formulario.id}`, payload);
      } else {
        await api.post('/imoveis', payload);
      }
      await carregarDados();
      setModo('lista');
      setFormulario({ titulo: '', preco: '', bairroId: '', tipoId: '', area: '', descricao: '' });
    } catch (error) {
      alert('Erro ao salvar imóvel');
    }
  };

  const deletarImovel = async (id) => {
    if (confirm('Tem certeza?')) {
      try {
        await api.delete(`/imoveis/${id}`);
        await carregarDados();
      } catch (error) {
        alert('Erro ao excluir imóvel');
      }
    }
  };

  const editarImovel = (imovel) => {
    setFormulario({
      ...imovel,
      bairroId: imovel.bairro?.id,
      tipoId: imovel.tipoImovel?.id
    });
    setModo('formulario');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 border-b border-[#0B132B]/10 pb-4">
        <h1 className="text-3xl font-light text-[#0B132B]">Imóveis</h1>
        {modo === 'lista' && (
          <button 
            onClick={() => setModo('formulario')}
            className="px-4 py-2 rounded-md bg-[#0B132B] text-[#FFFFE4] hover:bg-[#0B132B]/90 transition shadow-lg"
          >
            + Novo Imóvel
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {imoveis.map((imovel) => (
            <div key={imovel.id} className="bg-white p-6 rounded-lg border border-[#0B132B]/10 hover:shadow-lg transition group flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                <span className="text-xs">Sem Foto</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#0B132B] mb-2">{imovel.titulo}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button onClick={() => editarImovel(imovel)} className="text-blue-600 text-sm hover:underline">Editar</button>
                    <button onClick={() => deletarImovel(imovel.id)} className="text-red-600 text-sm hover:underline">Excluir</button>
                  </div>
                </div>
                <p className="text-2xl font-light text-[#0B132B] mb-2">R$ {imovel.preco}</p>
                <div className="flex flex-wrap gap-2 text-sm text-[#0B132B]/70">
                  <span className="bg-[#0B132B]/5 px-2 py-1 rounded">{imovel.bairro?.nome}</span>
                  <span className="bg-[#0B132B]/5 px-2 py-1 rounded">{imovel.tipoImovel?.nome}</span>
                  <span className="bg-[#0B132B]/5 px-2 py-1 rounded">{imovel.area} m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border border-[#0B132B]/10 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-[#0B132B]">Dados do Imóvel</h2>
          <form onSubmit={salvarImovel} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Título do Anúncio</label>
              <input 
                type="text" 
                required
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition"
                value={formulario.titulo}
                onChange={e => setFormulario({...formulario, titulo: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Preço (R$)</label>
              <input 
                type="number" 
                required
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition"
                value={formulario.preco}
                onChange={e => setFormulario({...formulario, preco: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Área Total (m²)</label>
              <input 
                type="number" 
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition"
                value={formulario.area}
                onChange={e => setFormulario({...formulario, area: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Bairro</label>
              <select 
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition bg-white"
                value={formulario.bairroId || ''}
                onChange={e => setFormulario({...formulario, bairroId: e.target.value})}
              >
                <option value="">Selecione...</option>
                {bairros.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Tipo de Imóvel</label>
              <select 
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition bg-white"
                value={formulario.tipoId || ''}
                onChange={e => setFormulario({...formulario, tipoId: e.target.value})}
              >
                <option value="">Selecione...</option>
                {tipos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#0B132B] mb-2">Descrição Detalhada</label>
              <textarea 
                className="w-full border border-[#0B132B]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition h-32 resize-none"
                value={formulario.descricao}
                onChange={e => setFormulario({...formulario, descricao: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 pt-4 flex justify-end gap-4 border-t border-[#0B132B]/10 mt-4">
              <button 
                type="button"
                onClick={() => setModo('lista')}
                className="px-6 py-2 rounded-md border border-[#0B132B]/20 text-[#0B132B] hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2 rounded-md bg-[#0B132B] text-[#FFFFE4] hover:bg-[#0B132B]/90 transition shadow-md"
              >
                Salvar Imóvel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PaginaImoveis;
