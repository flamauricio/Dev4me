
CREATE TABLE usuario(
  id_user INT PRIMARY KEY NOT NULL IDENTITY,
  nome VARCHAR(45) NOT NULL,
  owner_email VARCHAR(45) NOT NULL,
  senha VARCHAR(16) NOT NULL,
  telefone VARCHAR(14) NULL,
  cpf VARCHAR(14) NULL,
  cep VARCHAR(8) NULL,
  endereco  VARCHAR(100) NULL,
  data_nasc DATE,
  desc_user VARCHAR(700) NULL
  );

  CREATE TABLE empresa(
  id_empresa INT NOT NULL PRIMARY KEY IDENTITY(100, 1),
  nome VARCHAR(45) NULL,
  cnpj VARCHAR(14) NOT NULL,
  login VARCHAR(45) NULL,
  senha VARCHAR(45) NULL,
  email VARCHAR(45) NULL
  );
  
  CREATE TABLE email(
  email_id INT NOT NULL PRIMARY KEY IDENTITY(100, 1),
  owner_ref VARCHAR(45) NOT NULL,
  email_from VARCHAR(45) NULL,
  email_to VARCHAR(45) NOT NULL,
  subject VARCHAR(45) NOT NULL,
  text varchar(255) NOT NULL,
  send_date_email TIMESTAMP NOT NULL,
  status_email CHAR(1) NOT NULL
  );

  CREATE TABLE vaga(
  id_vaga INT NOT NULL PRIMARY KEY IDENTITY(200, 1),
  titulo VARCHAR(45) NOT NULL,
  contrato VARCHAR(10) NOT NULL,
  localizacao VARCHAR(50) NULL,
  faixa_salarial_min DECIMAL NULL,
  faixa_salarial_max DECIMAL NULL,
  descricao VARCHAR(100) NOT NULL,
  atividades VARCHAR(200) NOT NULL,
  requisitos VARCHAR(200) NOT NULL,
  is_disponivel BIT NOT NULL,
  fk_empresa INT NOT NULL,
  FOREIGN KEY(fk_empresa) REFERENCES empresa(id_empresa)
  );

  CREATE TABLE tag(
  id_tag INT NOT NULL PRIMARY KEY IDENTITY(300, 1),
  nome VARCHAR(45) NOT NULL,
  tipo VARCHAR(45) NOT NULL,
  url VARCHAR(200) NOT NULL
  );
  
  CREATE TABLE tag_usuario (
  id_user INT NOT NULL,
  id_tag INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES [dbo].[usuario](id_user),
  FOREIGN KEY (id_tag) REFERENCES [dbo].[tags](id_tag)
  );
  
  CREATE TABLE tag_vaga (
  id_vagas INT NOT NULL,
  id_tag INT NOT NULL,
  FOREIGN KEY (id_vagas) REFERENCES [dbo].[vagas](id_vagas),
  FOREIGN KEY (id_tag) REFERENCES [dbo].[tags](id_tag)
  );

  CREATE TABLE feedback (
  id_feedback INT NOT NULL PRIMARY KEY IDENTITY(400, 1),
  comentario VARCHAR(200) NULL
  );

  CREATE TABLE usuario_has_feedback (
  fk_user INT NOT NULL,
  fk_feedback INT NOT NULL,
  FOREIGN KEY (fk_user) REFERENCES usuario(id_user),
  FOREIGN KEY (fk_feedback) REFERENCES feedback(id_feedback)
  );

CREATE TABLE candidatura(
  id_candidatura INT PRIMARY KEY IDENTITY(500, 1), 
  fk_user INT NOT NULL ,
  fk_vagas INT NOT NULL,
  FOREIGN KEY (fk_user) REFERENCES usuario(id_user),
  FOREIGN KEY (fk_vagas) REFERENCES vagas(id_vagas)
);

 


  



