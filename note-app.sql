-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 21, 2025 at 02:44 PM
-- Server version: 8.0.43
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `note-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id_note` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int NOT NULL,
  `id_priority` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id_note`, `title`, `content`, `deadline`, `created_at`, `id_user`, `id_priority`) VALUES
(1, 'Belajar Update Catatan', 'Sekarang kita test update REST API', '2025-08-27 12:08:00', '2025-08-27 04:30:00', 1, 1),
(7, 'Belajar Docker', 'ini kita belajar saja membuatnya Docekr', '2025-08-27 12:08:00', '2025-09-16 08:41:58', 1, 1),
(8, 'Belajar Docker', 'ini kita belajar saja membuatnya Docekr', '2025-08-27 12:08:00', '2025-09-16 08:41:59', 1, 1),
(9, 'Belajar Docker', 'ini kita belajar saja membuatnya Docekr', '2025-08-27 12:08:00', '2025-09-16 08:42:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `note_tag`
--

CREATE TABLE `note_tag` (
  `id_note` int NOT NULL,
  `id_tag` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `priority`
--

CREATE TABLE `priority` (
  `id_priority` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `level` int DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `priority`
--

INSERT INTO `priority` (`id_priority`, `name`, `level`, `color`) VALUES
(1, 'tugas bahasa indonesia', 2, 'yellow'),
(3, 'Program', 1, 'red');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id_tag` int NOT NULL,
  `nama_tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `id_timetable` int NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `id_note` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `email`, `password`) VALUES
(1, 'enji', 'enji@gmai.com', 'cok'),
(2, 'Budi', 'Budi@gmail.com', 'password'),
(3, 'Budi Ganteng', 'Budi1@gmail.com', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id_note`),
  ADD KEY `fk_note_user` (`id_user`),
  ADD KEY `fk_note_priority` (`id_priority`);

--
-- Indexes for table `note_tag`
--
ALTER TABLE `note_tag`
  ADD PRIMARY KEY (`id_note`,`id_tag`),
  ADD KEY `fk_notetag_tag` (`id_tag`);

--
-- Indexes for table `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`id_priority`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id_timetable`),
  ADD KEY `fk_timetable_note` (`id_note`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id_note` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `priority`
--
ALTER TABLE `priority`
  MODIFY `id_priority` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id_timetable` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `fk_note_priority` FOREIGN KEY (`id_priority`) REFERENCES `priority` (`id_priority`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_note_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `note_tag`
--
ALTER TABLE `note_tag`
  ADD CONSTRAINT `fk_notetag_note` FOREIGN KEY (`id_note`) REFERENCES `note` (`id_note`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notetag_tag` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `fk_timetable_note` FOREIGN KEY (`id_note`) REFERENCES `note` (`id_note`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
