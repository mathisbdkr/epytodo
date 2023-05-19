-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : lun. 15 mai 2023 à 14:52
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21

CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `epytodo`
--

-- --------------------------------------------------------

--
-- Structure de la table `todo`
--

CREATE TABLE IF NOT EXISTS `todo` (
  id_table int(11) NOT NULL AUTO_INCREMENT,
  title varchar(150) NOT NULL,
  description text NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  due_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status enum('not started','todo','in progress','done') NOT NULL,
  id_user int(11) NOT NULL,
  CONSTRAINT id PRIMARY KEY (id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user_table`
--

CREATE TABLE IF NOT EXISTS user_table (
  id_user int(100) NOT NULL AUTO_INCREMENT,
  email_user varchar(150) NOT NULL,
  password_user text NOT NULL,
  name_user text NOT NULL,
  firstname_user text NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT id PRIMARY KEY (id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
