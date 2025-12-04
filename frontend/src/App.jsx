import React, { useState } from 'react';
import BarraLateral from './components/BarraLateral';
import Dashboard from './pages/Dashboard';
import PaginaUsuarios from './pages/PaginaUsuarios';
import PaginaBairros from './pages/PaginaBairros';
import PaginaTiposImoveis from './pages/PaginaTiposImoveis';
import PaginaImoveis from './pages/PaginaImoveis';
import PaginaFotos from './pages/PaginaFotos';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('dashboard');

  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'dashboard': return <Dashboard />;
      case 'usuarios': return <PaginaUsuarios />;
      case 'bairros': return <PaginaBairros />;
      case 'tipos': return <PaginaTiposImoveis />;
      case 'imoveis': return <PaginaImoveis />;
      case 'fotos': return <PaginaFotos />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFFFE4]">
      <BarraLateral aoNavegar={setPaginaAtual} paginaAtual={paginaAtual} />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderizarPagina()}
        </div>
      </main>
    </div>
  );
}

export default App;
