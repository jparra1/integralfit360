-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2022 a las 03:55:21
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `integral_360`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones_a_usuarios`
--

CREATE TABLE `asignaciones_a_usuarios` (
  `id_asignacion` int(11) NOT NULL,
  `id_usuario_asginado` int(11) NOT NULL,
  `tipo_asignacion` text NOT NULL,
  `id_user_interno` varchar(15) NOT NULL,
  `contenido1_asignacion` text NOT NULL,
  `contenido2_asignacion` text NOT NULL,
  `comentarios_asignacion` text NOT NULL,
  `fecha_asignacion` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_usuario`
--

CREATE TABLE `info_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` text NOT NULL,
  `apellido_usuario` text NOT NULL,
  `email_usuario` text NOT NULL,
  `password_usuario` text NOT NULL,
  `edad_usuario` text NOT NULL,
  `genero_usuario` int(11) NOT NULL,
  `peso_usuario` text NOT NULL,
  `estatura_usuario` text NOT NULL,
  `observaciones_usuario` text NOT NULL,
  `plan_adquirido` text NOT NULL DEFAULT 'ninguno',
  `fecha_inscripcion` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `info_usuario`
--

INSERT INTO `info_usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `email_usuario`, `password_usuario`, `edad_usuario`, `genero_usuario`, `peso_usuario`, `estatura_usuario`, `observaciones_usuario`, `plan_adquirido`, `fecha_inscripcion`) VALUES
(1, 'prueba', 'prueba', 'email@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', 'SPORT', '2022-11-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pago` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tiempo_comprado` text NOT NULL,
  `tipo_plan` text DEFAULT NULL,
  `fecha_pago` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id_pago`, `id_usuario`, `tiempo_comprado`, `tipo_plan`, `fecha_pago`) VALUES
(1, 2, 'anual', 'SPORT', '2022-11-17'),
(2, 1, 'anual', 'SPORT', '2022-11-17'),
(3, 1, 'anual', 'SPORT', '2022-11-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones_agendadas`
--

CREATE TABLE `sesiones_agendadas` (
  `id_sesion_agendada` int(11) NOT NULL,
  `id_usuario_interno` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_sesion` int(11) NOT NULL,
  `estado_sesion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones_disponibles`
--

CREATE TABLE `sesiones_disponibles` (
  `id_sesion` int(11) NOT NULL,
  `id_usario_interno` int(11) NOT NULL,
  `titulo_sesion` text NOT NULL,
  `hora_sesiom` time NOT NULL,
  `fecha_sesion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_interno`
--

CREATE TABLE `usuarios_interno` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo_usuario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_interno`
--

INSERT INTO `usuarios_interno` (`id_usuario`, `usuario`, `contraseña`, `nombre`, `tipo_usuario`) VALUES
(7, 'prueba', 'prueba', 'PEREZ JUAN', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones_a_usuarios`
--
ALTER TABLE `asignaciones_a_usuarios`
  ADD PRIMARY KEY (`id_asignacion`);

--
-- Indices de la tabla `info_usuario`
--
ALTER TABLE `info_usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pago`);

--
-- Indices de la tabla `usuarios_interno`
--
ALTER TABLE `usuarios_interno`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones_a_usuarios`
--
ALTER TABLE `asignaciones_a_usuarios`
  MODIFY `id_asignacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_usuario`
--
ALTER TABLE `info_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios_interno`
--
ALTER TABLE `usuarios_interno`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
