-- MySQL Workbench Forward Engineering
create database db_devme;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

USE `db_devme` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`usuario` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(14) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `cep` VARCHAR(8) NOT NULL,
  `endereco` VARCHAR(45) NOT NULL,
  `owner_email` VARCHAR(45) NOT NULL,
  `senha` CHAR(16) NOT NULL,
  `data_nasc` DATETIME NULL,
  `desc_user` VARCHAR(200) NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `mydb`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`empresa` (
  `id_empresa` INT NOT NULL AUTO_INCREMENT,
  `cnpj` VARCHAR(14) NOT NULL,
  `nome` VARCHAR(45) NULL,
  `login` VARCHAR(45) NULL,
  `senha` VARCHAR(16) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id_empresa`))
AUTO_INCREMENT = 100
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vagas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`vagas` (
  `id_vagas` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  `is_disponivel` TINYINT NULL,
  `fk_empresa` INT NOT NULL,
  PRIMARY KEY (`id_vagas`),
  INDEX `fk_vagas_empresa1_idx` (`fk_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_vagas_empresa1`
    FOREIGN KEY (`fk_empresa`)
    REFERENCES `db_devme`.`empresa` (`id_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 200
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`tags` (
  `id_tag` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `tipo` VARCHAR(45) NULL,
  `fk_tag_user` INT NOT NULL,
  `fk_tag_vaga` INT NOT NULL,
  PRIMARY KEY (`id_tag`),
  INDEX `fk_tags_usuario_idx` (`fk_tag_user` ASC) VISIBLE,
  INDEX `fk_tags_vagas1_idx` (`fk_tag_vaga` ASC) VISIBLE,
  CONSTRAINT `fk_tags_usuario`
    FOREIGN KEY (`fk_tag_user`)
    REFERENCES `db_devme`.`usuario` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tags_vagas1`
    FOREIGN KEY (`fk_tag_vaga`)
    REFERENCES `db_devme`.`Vagas` (`id_vagas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 300
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`feedback` (
  `id_feedback` INT NOT NULL AUTO_INCREMENT,
  `comentario` VARCHAR(200) NULL,
  PRIMARY KEY (`id_feedback`))
AUTO_INCREMENT = 400
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuario_has_Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`usuario_has_feedback` (
  `fk_user` INT NOT NULL,
  `fk_feedback` INT NOT NULL,
  INDEX `fk_usuario_has_feedback_feedback1_idx` (`fk_feedback` ASC) VISIBLE,
  INDEX `fk_usuario_has_feedback_usuario1_idx` (`fk_user` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_Feedback_Usuario1`
    FOREIGN KEY (`fk_user`)
    REFERENCES `db_devme`.`usuario` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_feedback_feedback1`
    FOREIGN KEY (`fk_feedback`)
    REFERENCES `db_devme`.`feedback` (`id_feedback`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Candidatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`candidatura` (
  `fk_user` INT NOT NULL ,
  `fk_vagas` INT NOT NULL,
  INDEX `fk_usuario_has_vagas_vagas1_idx` (`fk_vagas` ASC) VISIBLE,
  INDEX `fk_usuario_has_vagas_usuario1_idx` (`fk_user` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_vagas_usuario1`
    FOREIGN KEY (`fk_user`)
    REFERENCES `db_devme`.`usuario` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_vagas_vagas1`
    FOREIGN KEY (`fk_vagas`)
    REFERENCES `db_devme`.`vagas` (`id_vagas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
