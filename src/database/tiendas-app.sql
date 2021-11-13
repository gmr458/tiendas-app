-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 13-11-2021 a las 01:33:18
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendas-app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `id_store` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `id_store`, `name`, `description`, `price`, `stock`) VALUES
(1, 3, 'Colgate Total 12', 'Pasta la limpiar los dientes', 2500, 545),
(9, 3, 'Libreta grande', 'Útil escolar', 3000, 99),
(10, 4, 'Manzana', 'Fruta', 500, 1000),
(11, 3, 'Cepillo de dientes niño', 'Aseo personal', 1500, 800);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale`
--

CREATE TABLE `sale` (
  `id` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_store` int(11) NOT NULL,
  `total_price` float NOT NULL DEFAULT 0,
  `state` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sale`
--

INSERT INTO `sale` (`id`, `id_client`, `id_store`, `total_price`, `state`) VALUES
(6, 2, 3, 5500, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_product`
--

CREATE TABLE `sale_product` (
  `id_sale` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sale_product`
--

INSERT INTO `sale_product` (`id_sale`, `id_product`, `quantity`, `price`) VALUES
(6, 1, 1, 2500),
(6, 9, 1, 3000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('4aoLopj6Pqgr-alO0eg7yOvsUDMVZd-k', 1636836412, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('GNvTPYJUWsgd_HodbunqpWmg5h_bR6m3', 1636849662, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":2}}'),
('GxfZXNo2EjRWR31i53iyzKC41LnzkepY', 1636836522, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('IGlPQjFLqTI6VE9LEFolJWI5iK4xboHa', 1636836519, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('PeY4VJIpSmZ4nsrWll9kIl9cjANU5Q5F', 1636836516, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Rwfo58Apu9wGlv2us7nmDqyWO0wyDwnK', 1636836523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('iqVGvaIdvgxRCrjN1ht8vVlw_r5RBc8-', 1636836521, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `neighborhood` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `street` int(11) NOT NULL,
  `avenue` int(11) NOT NULL,
  `number` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `neighborhood`, `street`, `avenue`, `number`, `role`) VALUES
(2, 'German David', 'german@gmail.com', '$2b$10$sGhZC9.zSKmsW4HLrPqgP.KQvycKZXtcwzM32mItxSxihvp7EFs.u', 'Cruz de Mayo', 14, 25, '25-131', 'client'),
(3, 'Prueba Uno', 'prueba1@gmail.com', '$2b$10$TQXgy/JLS.YJGSjKp3Ib6.JgmJlfGeTSbzZMCg4Rouh7809IM1YLe', 'Barrio Prueba Uno', 89, 21, '32-823', 'store'),
(4, 'Tienda Uno', 'tienda1@gmail.com', '$2b$10$J1BFNiCfXVxX/K7y19quzueuLqzH4LrlVVdq/rVyWf8jZjsRW/XCu', 'El Prado', 100, 70, '23-322', 'store'),
(5, 'Tienda Dos', 'tienda2@gmail.com', '$2b$10$KnAFOfdzWuszFnQ4zozIce6fUk1o637dj8D5ajtc0bhw0tVO3E//C', 'Barrio Dos', 68, 38, '389-81', 'store'),
(6, 'Tienda Cuatro', 'tienda4@gmail.com', '$2b$10$ZjMDdE3XMp619202KSXYQOpDk722OcBI2gNy.ICjBHCPVgb4jo3Ti', 'Barrio Cuatro', 32, 4, '32-871', 'store'),
(7, 'Tienda Cinco', 'tienda5@gmail.com', '$2b$10$gwpQqs4YzxsuOQIvUutmoeWCBLZXekkPXT9P6XEnTPwV3rO/jAinu', 'Barrio Cinco', 89, 21, '21-731', 'store');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_store` (`id_store`);

--
-- Indices de la tabla `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_store` (`id_store`);

--
-- Indices de la tabla `sale_product`
--
ALTER TABLE `sale_product`
  ADD KEY `id_sale` (`id_sale`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `sale`
--
ALTER TABLE `sale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_store`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `sale_ibfk_2` FOREIGN KEY (`id_store`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `sale_product`
--
ALTER TABLE `sale_product`
  ADD CONSTRAINT `sale_product_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sale_product_ibfk_3` FOREIGN KEY (`id_sale`) REFERENCES `sale` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
