
CREATE TABLE usuario(
  id_user INT PRIMARY KEY NOT NULL IDENTITY,
  nome VARCHAR(45) NOT NULL,
  owner_email VARCHAR(45) NOT NULL,
  senha VARCHAR(16) NOT NULL,
  telefone VARCHAR(14) NULL,
  cpf VARCHAR(14) NULL,
  cep VARCHAR(8) NULL,
  endereco  VARCHAR(45) NULL,
  data_nasc DATETIME NULL,
  desc_user VARCHAR(200) NULL
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

  CREATE TABLE vagas(
  id_vagas INT NOT NULL PRIMARY KEY IDENTITY(200, 1),
  descricao VARCHAR(45) NULL,
  is_disponivel TINYINT NULL,
  fk_empresa INT NOT NULL,
  FOREIGN KEY(fk_empresa) REFERENCES empresa(id_empresa)
  );

  CREATE TABLE tags(
  id_tag INT NOT NULL PRIMARY KEY IDENTITY(300, 1),
  nome VARCHAR(45) NULL,
  tipo VARCHAR(45) NULL,
  fk_tag_user INT NOT NULL,
  fk_tag_vaga INT NOT NULL,
  FOREIGN KEY(fk_tag_user) REFERENCES empresa(id_empresa),
  FOREIGN KEY(fk_tag_user) REFERENCES vagas(id_vagas)
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

 


  



