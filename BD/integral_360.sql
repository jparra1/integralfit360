-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2022 a las 03:09:18
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
(1, 8, 'COMPLETE', '1', '../images/sentadillas.png;../images/sprint.png', '../images/omelette.png;Omelette; Ingredientes:\n5 huevos2 cdas. de agua fría (30 ml)\nSal al gusto (3 gr)\nPimienta al gusto (3 gr)1 cda. de aceite Cocinero (15ml)\nPreparacion:\nColocar los huevos en un tazón con el agua fría y salpimentar al gusto. Batirlos ligeramente y reservar. Agregar aceite en una sartén. Llevar a fuego moderado hasta que se derrita y volcar la preparación anterior. Distribuir en forma pareja con una espátula hasta que cuaje. Cuando los bordes comienzan a despegarse, agregar, si desea, jamón picado o queso mantecoso. Doblar el omelette hacia un lado. Retirar y servir de inmediato en un plato.\n\nEsta misma preparación puede realizarse al horno, enmantequillando 4 moldes bajos y espolvoreando pan rallado en cada uno. Llevar a un horno precalentado unos 10 minutos y retirar cuando se dore.\n\nLos omelettes también quedan muy sabrosos si agregamos hierbas al gusto picadas (perejil, finas hierbas) al batido de huevos o si cambiamos el relleno por atún, pollo cocido, granos de choclo sancochados, arvejas, etcétera. El secreto es que queden jugosos por dentro.', 'n', '2222-11-27', 'ASIGNADA');

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
  `genero_usuario` varchar(11) NOT NULL,
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
(1, 'Tatiana', 'Arias', 'tatiana@gmail.com', '123123*', '23', 'M', '70', '160', 'Presento dolencias en el pie derecho y tengo una operacion de columna', 'SPORT', '2022-11-17'),
(8, 'Julian', 'Alvarez', 'julian@gmail.com', '123123*', '40', 'H', '80', '170', 'Ninguna', 'COMPLETE', '2022-11-27');

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
(3, 1, 'anual', 'SPORT', '2022-11-17'),
(4, 8, '1 año', 'COMPLETE', '2022-11-27');

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
(1, 2, 8, 'https://meet.google.com/fhn-cubu-qzg', 'AGENDADA'),
(2, 1, 8, 'https://meet.google.com/fhn-cubu-qzg', 'AGENDADA');

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
(1, 1, 'Acompanamiento deportivo', 'ASIGNADA', '14:00:00', '2022-11-29'),
(2, 3, 'Dieta deportiva', 'ASIGNADA', '11:00:00', '2022-11-29'),
(3, 2, 'Acompanamiento deportivo en casa', 'DISPONIBLE', '15:00:00', '2022-11-29'),
(5, 1, 'El arte del ejercicio en casa', 'DISPONIBLE', '14:30:00', '2022-11-29'),
(6, 3, 'Desayuno para ti', 'DISPONIBLE', '15:50:00', '2022-11-30'),
(7, 3, 'Nutricion hipercalirica', 'DISPONIBLE', '13:50:00', '2022-11-30'),
(8, 2, 'Entrenamiento funcional', 'DISPONIBLE', '13:00:00', '2022-11-29');

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
(1, 'max@360.com', 'max123', 'MAX SANCHEZ', 'SPORT'),
(2, 'alexa@360.com', 'alexa123', 'ALEXA TOLEDO', 'SPORT'),
(3, 'monica@360.com', 'monica123', 'MONICA LOPEZ', 'HEALTH');

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
  MODIFY `id_asignacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `info_usuario`
--
ALTER TABLE `info_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sesiones_agendadas`
--
ALTER TABLE `sesiones_agendadas`
  MODIFY `id_sesion_agendada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sesiones_disponibles`
--
ALTER TABLE `sesiones_disponibles`
  MODIFY `id_sesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios_interno`
--
ALTER TABLE `usuarios_interno`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
