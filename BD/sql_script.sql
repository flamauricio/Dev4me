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
  `owner_email` VARCHAR(45) NOT NULL,
  `senha` CHAR(16) NOT NULL,
  `data_nasc` DATETIME NULL,
  `desc_user` VARCHAR(200) NULL,
  `fk_candidatura` INT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`empresa` (
  `id_empresa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `login` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id_empresa`))
AUTO_INCREMENT = 100
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vagas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`Vagas` (
  `idVagas` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  `isDisponivel` TINYINT NULL,
  `Empresa_idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idVagas`),
  INDEX `fk_Vagas_Empresa1_idx` (`Empresa_idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Vagas_Empresa1`
    FOREIGN KEY (`Empresa_idEmpresa`)
    REFERENCES `db_devme`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 200
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`Tags` (
  `idTag` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `tipo` VARCHAR(45) NULL,
  `fkTagUser` INT NOT NULL,
  `fkTagVaga` INT NOT NULL,
  PRIMARY KEY (`idTag`),
  INDEX `fk_Tags_Usuario_idx` (`fkTagUser` ASC) VISIBLE,
  INDEX `fk_Tags_Vagas1_idx` (`fkTagVaga` ASC) VISIBLE,
  CONSTRAINT `fk_Tags_Usuario`
    FOREIGN KEY (`fkTagUser`)
    REFERENCES `db_devme`.`Usuario` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tags_Vagas1`
    FOREIGN KEY (`fkTagVaga`)
    REFERENCES `db_devme`.`Vagas` (`idVagas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 300
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`Feedback` (
  `idFeedback` INT NOT NULL AUTO_INCREMENT,
  `comentario` VARCHAR(200) NULL,
  PRIMARY KEY (`idFeedback`))
AUTO_INCREMENT = 400
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuario_has_Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`Usuario_has_Feedback` (
  `fkUser` INT NOT NULL,
  `fkFeedback` INT NOT NULL,
  INDEX `fk_Usuario_has_Feedback_Feedback1_idx` (`fkFeedback` ASC) VISIBLE,
  INDEX `fk_Usuario_has_Feedback_Usuario1_idx` (`fkUser` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_Feedback_Usuario1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `db_devme`.`Usuario` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_has_Feedback_Feedback1`
    FOREIGN KEY (`fkFeedback`)
    REFERENCES `db_devme`.`Feedback` (`idFeedback`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Candidatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_devme`.`Candidatura` (
  `fkUser` INT NOT NULL ,
  `fkVagas` INT NOT NULL,
  INDEX `fk_Usuario_has_Vagas_Vagas1_idx` (`fkVagas` ASC) VISIBLE,
  INDEX `fk_Usuario_has_Vagas_Usuario1_idx` (`fkUser` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_Vagas_Usuario1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `db_devme`.`Usuario` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_has_Vagas_Vagas1`
    FOREIGN KEY (`fkVagas`)
    REFERENCES `db_devme`.`Vagas` (`idVagas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
