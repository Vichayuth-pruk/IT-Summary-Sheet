-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2022 at 01:48 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it_summary_sheet`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `sheet_id` int(11) NOT NULL COMMENT 'ไอดีชีท',
  `user_id` int(11) NOT NULL COMMENT 'ไอดี user',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `sheet_id` int(11) NOT NULL COMMENT 'ไอดีชีท',
  `user_id` int(11) NOT NULL COMMENT 'ไอดี user',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `status` enum('รายการสำเร็จ') NOT NULL DEFAULT 'รายการสำเร็จ' COMMENT 'สถานะ',
  `payment_amount` decimal(10,2) NOT NULL COMMENT 'ยอดชำระ',
  `payment_method` varchar(255) NOT NULL COMMENT 'ช่องทางชำระ',
  `quantity` int(11) NOT NULL COMMENT 'จำนวนรายการ',
  `items` text NOT NULL COMMENT 'ชื่อรายการ',
  `user_id` int(11) NOT NULL COMMENT 'ไอดี user',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mysheets`
--

CREATE TABLE `mysheets` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `course_title` varchar(255) NOT NULL COMMENT 'วิชา',
  `year` varchar(255) NOT NULL COMMENT 'ชั้นปี',
  `programme` varchar(255) NOT NULL COMMENT 'หลักสูตร',
  `sheet_id` int(11) NOT NULL COMMENT 'ไอดี sheet',
  `user_id` int(11) NOT NULL COMMENT 'ไอดี user',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mysheet_files`
--

CREATE TABLE `mysheet_files` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `mysheet_id` int(11) NOT NULL COMMENT 'ไอดี mysheet',
  `file_path` varchar(255) NOT NULL COMMENT 'ที่อยู่ไฟล์',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `content` varchar(255) NOT NULL COMMENT 'รีวิว',
  `rating` enum('0','1','2','3','4','5') NOT NULL COMMENT 'เรตติ้ง',
  `sheet_id` int(11) NOT NULL COMMENT 'ไอดี sheet',
  `user_id` int(11) NOT NULL COMMENT 'ไอดี user',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sheets`
--

CREATE TABLE `sheets` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `course_title` varchar(255) NOT NULL COMMENT 'วิชา',
  `year` varchar(255) NOT NULL COMMENT 'ชั้นปี',
  `programme` varchar(255) NOT NULL COMMENT 'หลักสูตร',
  `price` decimal(10,2) NOT NULL COMMENT 'ราคา',
  `user_id` int(11) NOT NULL COMMENT 'ไอดี user',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sheet_files`
--

CREATE TABLE `sheet_files` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `sheet_id` int(11) NOT NULL COMMENT 'ไอดี sheet',
  `file_path` varchar(255) NOT NULL COMMENT 'ที่อยู่ไฟล์',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `token` varchar(255) NOT NULL COMMENT 'token',
  `user_id` int(11) NOT NULL COMMENT 'ไอดี user',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'ไอดี',
  `email` varchar(255) NOT NULL COMMENT 'อีเมล',
  `firstname` varchar(255) DEFAULT NULL COMMENT 'ชื่อ',
  `lastname` varchar(255) DEFAULT NULL COMMENT 'นามสกุล',
  `username` varchar(255) NOT NULL COMMENT 'ชื่อที่ใช้แสดง',
  `password` varchar(255) NOT NULL COMMENT 'รหัสผ่าน',
  `role` enum('admin','user') NOT NULL DEFAULT 'user' COMMENT 'ตำแหน่ง',
  `itcoin` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'itcoin',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstname`, `lastname`, `username`, `password`, `role`, `itcoin`, `timestamp`) VALUES
(1, 'akira.ajeyb@gmail.com', 'อคิราภ์', 'สีแสนยง', 'docxed', '$2a$05$WThuZDOev2vrKUNanw6wb./iEa.YUTjPTG.9U5fzSVwoY6DBOcxgG', 'user', '0.00', '2022-03-14 11:39:47'),
(2, 'akira.ajeyb2@gmail.com', 'บัณฑิต', '', 'current', '$2a$05$aqx06IGt5t8ylLN/NFD.meKTKWNeLJ91Hw0jZpqGrnGGMCgj.sZki', 'user', '0.00', '2022-03-14 12:43:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_ibfk_1` (`sheet_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sheet_id` (`sheet_id`),
  ADD KEY `favorites_ibfk_2` (`user_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `mysheets`
--
ALTER TABLE `mysheets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sheet_id` (`sheet_id`),
  ADD KEY `mysheet_ibfk_2` (`user_id`);

--
-- Indexes for table `mysheet_files`
--
ALTER TABLE `mysheet_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mysheet_id` (`mysheet_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sheet_id` (`sheet_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sheets`
--
ALTER TABLE `sheets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sheet_files`
--
ALTER TABLE `sheet_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sheet_files_ibfk_1` (`sheet_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tokens_ibfk_1` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `mysheets`
--
ALTER TABLE `mysheets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `mysheet_files`
--
ALTER TABLE `mysheet_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `sheets`
--
ALTER TABLE `sheets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `sheet_files`
--
ALTER TABLE `sheet_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี';

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี', AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `mysheets`
--
ALTER TABLE `mysheets`
  ADD CONSTRAINT `mysheets_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `mysheets_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mysheet_files`
--
ALTER TABLE `mysheet_files`
  ADD CONSTRAINT `mysheet_files_ibfk_1` FOREIGN KEY (`mysheet_id`) REFERENCES `mysheets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sheets`
--
ALTER TABLE `sheets`
  ADD CONSTRAINT `sheets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sheet_files`
--
ALTER TABLE `sheet_files`
  ADD CONSTRAINT `sheet_files_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
