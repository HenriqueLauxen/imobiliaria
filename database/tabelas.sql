-- criar tabela usuarios
CREATE TABLE usuarios (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('administrador','cliente','corretor')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- criar tabela bairros
CREATE TABLE bairros (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome TEXT NOT NULL,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    cep_inicial TEXT,
    cep_final TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- criar tabela tipos_imoveis
CREATE TABLE tipos_imoveis (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- criar tabela imoveis
CREATE TABLE imoveis (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    
    preco_venda NUMERIC(15,2),
    preco_aluguel NUMERIC(15,2),

    finalidade TEXT NOT NULL CHECK (finalidade IN ('Residencial','Comercial')),
    status TEXT NOT NULL CHECK (status IN ('Ativo','Inativo','Vendido','Alugado')),

    dormitorios INT,
    banheiros INT,
    garagem INT,

    area_total NUMERIC(15,2),
    area_construida NUMERIC(15,2),

    endereco TEXT,
    numero TEXT,
    complemento TEXT,
    cep TEXT,

    caracteristicas TEXT,
    destaque BOOLEAN DEFAULT FALSE,

    tipo_imovel_id INT REFERENCES tipos_imoveis(id) ON DELETE SET NULL,
    bairro_id INT REFERENCES bairros(id) ON DELETE SET NULL,
    usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- criar tabela fotos_imoveis
CREATE TABLE fotos_imoveis (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    imovel_id INT NOT NULL REFERENCES imoveis(id) ON DELETE CASCADE,
    nome_arquivo TEXT NOT NULL,
    caminho TEXT NOT NULL,
    capa BOOLEAN DEFAULT FALSE,
    ordem INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- função para atualizar updated_at
CREATE OR REPLACE FUNCTION atualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- triggers usuarios
CREATE TRIGGER trg_usuarios_update
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION atualizar_updated_at();

-- triggers bairros
CREATE TRIGGER trg_bairros_update
BEFORE UPDATE ON bairros
FOR EACH ROW EXECUTE FUNCTION atualizar_updated_at();

-- triggers tipos_imoveis
CREATE TRIGGER trg_tipos_update
BEFORE UPDATE ON tipos_imoveis
FOR EACH ROW EXECUTE FUNCTION atualizar_updated_at();

-- triggers imoveis
CREATE TRIGGER trg_imoveis_update
BEFORE UPDATE ON imoveis
FOR EACH ROW EXECUTE FUNCTION atualizar_updated_at();

-- triggers fotos_imoveis
CREATE TRIGGER trg_fotos_update
BEFORE UPDATE ON fotos_imoveis
FOR EACH ROW EXECUTE FUNCTION atualizar_updated_at();
