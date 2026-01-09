-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `prod_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (25,35,7,3,'2025-12-31 15:52:52');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` enum('Digital','Stationery','Art Supplies','Fasion','Accessories','Seasonal Products') NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_desc_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Digital'),(2,'Stationery'),(3,'Art Supplies'),(4,'Fasion'),(5,'Seasonal Products');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `prod_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,7,1,250.00),(2,2,7,2,250.00),(3,3,15,8,24999.00),(4,4,11,1,200.00),(5,4,12,1,75.00),(6,5,10,1,2000.00),(7,5,11,1,200.00),(8,5,12,1,75.00),(9,6,13,2,150.00),(10,6,10,4,2000.00),(11,6,15,1,24999.00),(12,6,7,1,250.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'Processing',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,38,250.00,'Processing','2025-12-30 16:59:04'),(2,33,500.00,'Processing','2025-12-30 17:01:09'),(3,33,199992.00,'Processing','2025-12-30 17:01:50'),(4,35,275.00,'Processing','2025-12-30 17:39:32'),(5,39,2275.00,'Processing','2025-12-31 05:32:37'),(6,35,33549.00,'Processing','2025-12-31 07:14:06');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prod_id` int NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(100) NOT NULL,
  `prod_desc` text,
  `sale_price` decimal(10,2) NOT NULL,
  `list_price` decimal(10,2) DEFAULT NULL,
  `created_by` varchar(100) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stock` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_name` enum('Digital','Stationery','Art Supplies','Fasion','Accessories','Seasonal Products') NOT NULL,
  PRIMARY KEY (`prod_id`,`created_dt`,`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (7,'A3 ruled Notebook','200 pages ruled premium notebook with elastic band',250.00,500.00,'NT','2025-12-27 00:40:08',50,'1766862477794.jpg','Stationery'),(10,'airpods','pastal blue color airpods',2000.00,3000.00,'1','2025-12-27 20:33:49',10,'1766863478320.webp','Digital'),(11,'Parker pen','parker blue pen set of 2',200.00,500.00,'1','2025-12-27 23:05:18',30,'1766863551322.webp','Stationery'),(12,'saturn scrunchise','set of 3 scrunchees',75.00,100.00,'1','2025-12-27 23:50:41',50,'1766863630536.webp','Accessories'),(13,'DOMS Watercolour pencils','Artist Grade Watercolor Water Soluble Colored Pencil Set 12 Assorted Bright Watercolor Pencils It can be used as colour pencils just like a normal colour pencil or a watercolour. It can be used by artists and students anywhere. It is easy to carry and handle.',125.00,250.00,'1','2025-12-28 01:00:26',100,'1766863826240.webp','Stationery'),(15,'One Plus Nord5','One Plus smart phone',24999.00,22999.00,'1','2025-12-28 14:11:45',10,'1766911339151.jpg','Digital');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_desc` varchar(100) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_desc_UNIQUE` (`role_desc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','2025-12-28 20:42:44'),(2,'User','2025-12-28 20:42:44');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `role_id` int NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_id_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'NT','$2b$10$9vi42PxvMt/6ClLFXTImHOLo4af2rsha036U0xRKU94XN1J0rCymG','thewierdstar@gmail.com',1,'2025-12-28 20:12:14',NULL),(23,'Hema','$2b$10$evL08PiQvWQoyNgGyv8u7udapvPQPVbqQuIVFgD21YdnulDIcJZo.','shemsasi@gmail.com',1,'2025-12-28 20:17:07',NULL),(24,'thara','$2b$10$uer2/QZjT0j607ytc.aApeiBsDYCDInTKV75yEa9Z3feF23o7J3OW','thara@gmail.com',2,'2025-12-28 20:19:46',NULL),(26,'thara','$2b$10$MfPqQLxxUCNpowJXWN5RtuvoWqc6pYwuujjK29rg6geXOsur6/31G','tharaxx@gmail.com',2,'2025-12-28 20:36:46',NULL),(32,'Anne','$2b$10$vjK33b1m2eHK0sXu53wAJe3IWwaV0enUmYAEfrfKf7B2i4FSS9MKK','anne@gmail.com',2,'2025-12-29 21:29:45',NULL),(33,'admin','$2b$10$MjcEoBHWa3Ba8J8Pf4x9aO5vjY85pVRglw1jjh.1R4HLLfWn7/WGS','admin@example.com',2,'2025-12-29 22:08:24',NULL),(34,'Nirthya','$2b$10$64O8hsNZILHeRrnugSzt5.c9V.fm4mf/wfZCmdN7sMcn6.WlubzRG','nirthyathara@gmail.com',1,'2025-12-30 13:54:33',NULL),(35,'Test User','$2b$10$ctfhABBKl6ZuDbxA8ZKkqeY6i1nUIXp8xTuBa3arAhUbrwLHFvbv.','test@test.com',2,'2025-12-30 16:08:46',NULL),(36,'Test User','$2b$10$RqYk/Q6MFGZmfmlHJPhQGeUZADcv.y2VezHHOVcKSkEpf489NKm1e','testuser_1767113847039@example.com',2,'2025-12-30 22:27:27',NULL),(38,'Test User','$2b$10$oBF09Lc011FNVPD1rhxq0u7LLrqNm3XKmV2mT/CYdDUk9DYOnF6oa','testuser_1767113943741@example.com',2,'2025-12-30 22:29:03',NULL),(39,'ad_','$2b$10$4RgybUVnXwIYHSoBKpRnyO4VFez4pATyzk3AvHxAMMuPHOpbT5UGm','ad@example.com',2,'2025-12-31 11:01:30',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-08 21:24:12
