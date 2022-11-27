-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2022 a las 21:12:55
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
  `id_usuario_asignado` int(11) NOT NULL,
  `tipo_asignacion` text NOT NULL,
  `id_user_interno` varchar(15) NOT NULL,
  `contenido1_asignacion` text NOT NULL,
  `contenido2_asignacion` text NOT NULL,
  `comentarios_asignacion` text NOT NULL,
  `fecha_asignacion` date NOT NULL,
  `estado_asignacion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asignaciones_a_usuarios`
--

INSERT INTO `asignaciones_a_usuarios` (`id_asignacion`, `id_usuario_asignado`, `tipo_asignacion`, `id_user_interno`, `contenido1_asignacion`, `contenido2_asignacion`, `comentarios_asignacion`, `fecha_asignacion`, `estado_asignacion`) VALUES
(1, 1, 'SPORT', '1', '../images/sentadrllas.png;../images/sprint.png', '', '', '2022-11-26', 'ASIGNADA'),
(2, 1, 'HEALTH', '1', '', '..../images/omelette.png; Ingredientes:\n5 huevos2 cdas. de agua fría (30 ml)\nSal al gusto (3 gr)\nPimienta al gusto (3 gr)1 cda. de aceite Cocinero (15ml)\nPreparacion:\nColocar los huevos en un tazón con el agua fría y salpimentar al gusto. Batirlos ligeramente y reservar. Agregar aceite en una sartén. Llevar a fuego moderado hasta que se derrita y volcar la preparación anterior. Distribuir en forma pareja con una espátula hasta que cuaje. Cuando los bordes comienzan a despegarse, agregar, si desea, jamón picado o queso mantecoso. Doblar el omelette hacia un lado. Retirar y servir de inmediato en un plato.\n\nEsta misma preparación puede realizarse al horno, enmantequillando 4 moldes bajos y espolvoreando pan rallado en cada uno. Llevar a un horno precalentado unos 10 minutos y retirar cuando se dore.\n\nLos omelettes también quedan muy sabrosos si agregamos hierbas al gusto picadas (perejil, finas hierbas) al batido de huevos o si cambiamos el relleno por atún, pollo cocido, granos de choclo sancochados, arvejas, etcétera. El secreto es que queden jugosos por dentro.', '', '2022-11-26', 'ASIGNADA'),
(3, 1, 'COMPLETE', '1', '../images/sentadrllas.png;../images/sprint.png', '..../images/omelette.png; Ingredientes:\n5 huevos2 cdas. de agua fría (30 ml)\nSal al gusto (3 gr)\nPimienta al gusto (3 gr)1 cda. de aceite Cocinero (15ml)\nPreparacion:\nColocar los huevos en un tazón con el agua fría y salpimentar al gusto. Batirlos ligeramente y reservar. Agregar aceite en una sartén. Llevar a fuego moderado hasta que se derrita y volcar la preparación anterior. Distribuir en forma pareja con una espátula hasta que cuaje. Cuando los bordes comienzan a despegarse, agregar, si desea, jamón picado o queso mantecoso. Doblar el omelette hacia un lado. Retirar y servir de inmediato en un plato.\n\nEsta misma preparación puede realizarse al horno, enmantequillando 4 moldes bajos y espolvoreando pan rallado en cada uno. Llevar a un horno precalentado unos 10 minutos y retirar cuando se dore.\n\nLos omelettes también quedan muy sabrosos si agregamos hierbas al gusto picadas (perejil, finas hierbas) al batido de huevos o si cambiamos el relleno por atún, pollo cocido, granos de choclo sancochados, arvejas, etcétera. El secreto es que queden jugosos por dentro.', '', '2022-11-26', 'ASIGNADA'),
(6, 1, 'SPORT', '7', '1', '1', '1', '2222-11-27', 'ASIGNADA'),
(7, 1, 'SPORT', '7', '1', '2', '3', '2222-11-27', 'ASIGNADA');

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
  `plan_adquirido` text NOT NULL,
  `fecha_inscripcion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `info_usuario`
--

INSERT INTO `info_usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `email_usuario`, `password_usuario`, `edad_usuario`, `genero_usuario`, `peso_usuario`, `estatura_usuario`, `observaciones_usuario`, `plan_adquirido`, `fecha_inscripcion`) VALUES
(1, 'prueba', 'prueba ', 'email@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', 'SPORT', '2022-11-17'),
(2, 'prueba', 'prueba', 'email2@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', 'COMPLETE', '2022-11-18'),
(3, 'prueba', 'prueba', 'email3@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', '', '0000-00-00'),
(4, 'prueba', 'prueba', 'email4@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', '', '0122-10-18'),
(5, 'prueba', 'prueba', 'email5@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', '', '2022-11-18'),
(6, 'prueba', 'prueba', 'email6@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', '', '0000-00-00'),
(7, 'prueba', 'prueba', 'email9@prueba.com', '123123', '23', 0, '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', '', '2022-11-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pago` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tiempo_comprado` text NOT NULL,
  `tipo_plan` text DEFAULT NULL,
  `fecha_pago` date NOT NULL
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
  `id_sesion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `url_sesion_meet` text NOT NULL,
  `estado_sesion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sesiones_agendadas`
--

INSERT INTO `sesiones_agendadas` (`id_sesion_agendada`, `id_sesion`, `id_usuario`, `url_sesion_meet`, `estado_sesion`) VALUES
(1, 1, 4, 'url_de_sesion', 'AGENDADA'),
(2, 3, 1, 'https://meet.google.com/fhn-cubu-qzg', 'AGENDADA'),
(3, 1, 2, 'https://meet.google.com/fhn-cubu-qzg', 'AGENDADA'),
(4, 3, 2, 'https://meet.google.com/fhn-cubu-qzg', 'AGENDADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones_disponibles`
--

CREATE TABLE `sesiones_disponibles` (
  `id_sesion` int(11) NOT NULL,
  `id_usuario_interno` int(11) NOT NULL,
  `titulo_sesion` text NOT NULL,
  `estado_sesion` text NOT NULL,
  `hora_sesion` time NOT NULL,
  `fecha_sesion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sesiones_disponibles`
--

INSERT INTO `sesiones_disponibles` (`id_sesion`, `id_usuario_interno`, `titulo_sesion`, `estado_sesion`, `hora_sesion`, `fecha_sesion`) VALUES
(1, 7, 'Acompanamiento deportivo', 'ASIGNADA', '14:00:00', '2022-11-29'),
(2, 8, 'Dieta deportiva y suplementaria ', 'DISPONIBLE', '11:00:00', '2022-11-29'),
(3, 7, 'Acompanamiento deportivo en casa', 'ASIGNADA', '15:00:00', '2022-11-29'),
(5, 0, 'El arte del ejercicio en casa', 'DISPONIBLE', '14:30:00', '2022-11-29'),
(6, 7, 'titulo 2', 'DISPONIBLE', '15:50:00', '2022-11-30'),
(7, 7, 'titulo 1', 'DISPONIBLE', '13:50:00', '2022-11-30'),
(8, 7, 'titulo 3', 'DISPONIBLE', '13:00:00', '2022-11-29'),
(9, 7, 'cita 2', 'DISPONIBLE', '13:00:00', '2022-12-01'),
(10, 7, '4', 'DISPONIBLE', '16:00:00', '2022-11-29');

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
(7, 'prueba', 'prueba', 'JUAN PEREZ', 'SPORT'),
(8, 'pruebas2', 'pruebas', 'MONICA LOPEZ', 'HEALTH');

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
-- Indices de la tabla `sesiones_agendadas`
--
ALTER TABLE `sesiones_agendadas`
  ADD PRIMARY KEY (`id_sesion_agendada`);

--
-- Indices de la tabla `sesiones_disponibles`
--
ALTER TABLE `sesiones_disponibles`
  ADD PRIMARY KEY (`id_sesion`);

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
  MODIFY `id_asignacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `info_usuario`
--
ALTER TABLE `info_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sesiones_agendadas`
--
ALTER TABLE `sesiones_agendadas`
  MODIFY `id_sesion_agendada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sesiones_disponibles`
--
ALTER TABLE `sesiones_disponibles`
  MODIFY `id_sesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios_interno`
--
ALTER TABLE `usuarios_interno`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
