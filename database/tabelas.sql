-- criar o bd
CREATE DATABASE imobiliaria;
USE imobiliaria;

-- tabela usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador','cliente','corretor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- tabela bairros
CREATE TABLE bairros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    cep_inicial VARCHAR(20),
    cep_final VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- tabela tipos_imoveis
CREATE TABLE tipos_imoveis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- tabela imoveis
CREATE TABLE imoveis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    
    preco_venda DECIMAL(15,2),
    preco_aluguel DECIMAL(15,2),

    finalidade ENUM('Residencial','Comercial') NOT NULL,
    status ENUM('Ativo','Inativo','Vendido','Alugado') NOT NULL,

    dormitorios INT,
    banheiros INT,
    garagem INT,

    area_total DECIMAL(15,2),
    area_construida DECIMAL(15,2),

    endereco VARCHAR(255),
    numero VARCHAR(50),
    complemento VARCHAR(255),
    cep VARCHAR(20),

    caracteristicas TEXT,
    destaque BOOLEAN DEFAULT FALSE,

    tipo_imovel_id INT,
    bairro_id INT,
    usuario_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_imovel_tipo
        FOREIGN KEY (tipo_imovel_id)
        REFERENCES tipos_imoveis(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_imovel_bairro
        FOREIGN KEY (bairro_id)
        REFERENCES bairros(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_imovel_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE SET NULL
);

-- tabela fotos_imoveis
CREATE TABLE fotos_imoveis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imovel_id INT NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho VARCHAR(500) NOT NULL,
    capa BOOLEAN DEFAULT FALSE,
    ordem INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_foto_imovel
        FOREIGN KEY (imovel_id)
        REFERENCES imoveis(id)
        ON DELETE CASCADE
);
