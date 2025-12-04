-- usuarios
INSERT INTO usuarios (id, nome, email, senha, tipo, created_at, updated_at)
VALUES
(1, 'Administrador', 'admin@nipia.com', '123456', 'administrador', NOW(), NOW()),
(2, 'Nickolas Piaia', 'nickolas.piaia@nipia.com', '123456', 'corretor', NOW(), NOW()),

--  bairros
INSERT INTO bairros (id, nome, cidade, estado, cep_inicial, cep_final, created_at, updated_at)
VALUES
(1, 'Centro', 'Panambi', 'RS', '98280000', '98280999', NOW(), NOW()),
(2, 'Arco Íris', 'Panambi', 'RS', '98281000', '98281999', NOW(), NOW()),
(3, 'Alto Paraíso', 'Panambi', 'RS', '98282000', '98282999', NOW(), NOW()),
(4, 'Jardim Paraguai', 'Panambi', 'RS', '98283000', '98283999', NOW(), NOW()),
(5, 'Pirapó', 'Panambi', 'RS', '98284000', '98284999', NOW(), NOW());

--  tipos de imóveis
INSERT INTO tipos_imoveis (id, nome, descricao, created_at, updated_at)
VALUES
(1, 'Casa', 'Residência unifamiliar', NOW(), NOW()),
(2, 'Apartamento', 'Unidade habitacional em prédio', NOW(), NOW()),
(3, 'Terreno', 'Terrenos urbanos e rurais', NOW(), NOW()),
(4, 'Sala Comercial', 'Espaço comercial para empresas', NOW(), NOW());


-- imóveis
INSERT INTO imoveis (
    id, titulo, descricao, preco_venda, preco_aluguel, finalidade, status,
    dormitorios, banheiros, garagem, area_total, area_construida,
    endereco, numero, complemento, cep, caracteristicas, destaque,
    tipo_imovel_id, bairro_id, usuario_id, created_at, updated_at
)
VALUES
(1, 'Casa Industrial - Centro',
 'Casa espaçosa próxima ao comércio local, ideal para famílias.',
 850000.00, NULL, 'Residencial', 'Disponível',
 3, 2, 2, 300.50, 180.75,
 'Rua Hermann Meyer', '200', NULL, '98280000',
 'Churrasqueira, Jardim, Piscina', TRUE,
 1, 1, 2, NOW(), NOW()),

(2, 'Apartamento no Arco Íris',
 'Apartamento novo, ótima iluminação natural e vista panorâmica.',
 NULL, 2300.00, 'Residencial', 'Disponível',
 2, 1, 1, 90.00, 90.00,
 'Rua da Palmeira', '45', 'Apto 302', '98281000',
 'Sacada, Elevador, Portaria 24h', FALSE,
 2, 2, 3, NOW(), NOW()),

(3, 'Terreno no Pirapó',
 'Terreno plano e pronto para construção em bairro tranquilo.',
 150000.00, NULL, 'Residencial', 'Disponível',
 NULL, NULL, NULL, 450.00, NULL,
 'Avenida Presidente Kennedy', '1500', NULL, '98284000',
 'Terreno plano e bem localizado', FALSE,
 3, 5, 2, NOW(), NOW()),

(4, 'Sala comercial no Centro',
 'Sala excelente para escritório ou consultório.',
 NULL, 3500.00, 'Comercial', 'Disponível',
 NULL, 1, 1, 60.00, 60.00,
 'Rua Sete de Setembro', '101', 'Sala 04', '98280000',
 'Ar-condicionado, Recepção compartilhada', TRUE,
 4, 1, 1, NOW(), NOW());

--  fotos dos imóveis
INSERT INTO fotos_imoveis (id, imovel_id, nome_arquivo, caminho, capa, ordem, created_at, updated_at)
VALUES
(1, 1, 'casa_centro_1.jpg', '/uploads/imoveis/1/capa.jpg', TRUE, 1, NOW(), NOW()),
(2, 1, 'casa_centro_2.jpg', '/uploads/imoveis/1/area_externa.jpg', FALSE, 2, NOW(), NOW()),

(3, 2, 'apto_arcoiris_1.jpg', '/uploads/imoveis/2/sala.jpg', TRUE, 1, NOW(), NOW()),
(4, 2, 'apto_arcoiris_2.jpg', '/uploads/imoveis/2/quarto.jpg', FALSE, 2, NOW(), NOW()),

(5, 3, 'terreno_pirapo_1.jpg', '/uploads/imoveis/3/frente.jpg', TRUE, 1, NOW(), NOW()),

(6, 4, 'sala_centro_1.jpg', '/uploads/imoveis/4/capa.jpg', TRUE, 1, NOW(), NOW());
