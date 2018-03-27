/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.20-log : Database - recruit
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`recruit` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `recruit`;

/*Table structure for table `attachement` */

DROP TABLE IF EXISTS `attachement`;

CREATE TABLE `attachement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `file_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `attachement` */

/*Table structure for table `exam_information` */

DROP TABLE IF EXISTS `exam_information`;

CREATE TABLE `exam_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `sex` varchar(5) DEFAULT NULL,
  `origin_place` varchar(20) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `face` varchar(20) DEFAULT NULL,
  `education` varchar(20) DEFAULT NULL,
  `school` varchar(20) DEFAULT NULL,
  `gradul_time` varchar(20) DEFAULT NULL,
  `major` varchar(20) DEFAULT NULL,
  `cell_phone` varchar(20) DEFAULT NULL,
  `experience` varchar(300) DEFAULT NULL,
  `serial_num` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `exam_information` */

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `news_log` varchar(50) DEFAULT NULL,
  `news_status` int(2) DEFAULT NULL,
  `news_type` int(2) DEFAULT NULL,
  `hitCount` int(11) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `publish_time` varchar(20) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `publish_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `news` */

/*Table structure for table `news_type` */

DROP TABLE IF EXISTS `news_type`;

CREATE TABLE `news_type` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `news_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `news_type` */

/*Table structure for table `permission` */

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `url` varchar(50) DEFAULT NULL,
  `method` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `permission` */

insert  into `permission`(`id`,`name`,`description`,`url`,`method`,`email`,`telephone`) values (1,'PERMISSION_HOME','主页','/',NULL,NULL,NULL),(2,'PERMISSION_ADMIN','管理员页面集','/admin/',NULL,NULL,NULL),(3,'PERMISSION_PUBLISHER','职位发布者页面集','/publisher/',NULL,NULL,NULL),(4,'PERMISSION_USER','普通用户页面集','/user/',NULL,NULL,NULL);

/*Table structure for table `position_exam` */

DROP TABLE IF EXISTS `position_exam`;

CREATE TABLE `position_exam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exam_information_id` int(11) DEFAULT NULL,
  `position_info_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `position_exam` */

/*Table structure for table `position_info` */

DROP TABLE IF EXISTS `position_info`;

CREATE TABLE `position_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `dept_code` varchar(20) DEFAULT NULL,
  `dept_name` varchar(20) DEFAULT NULL,
  `employing_department` varchar(20) DEFAULT NULL,
  `dept_property` varchar(20) DEFAULT NULL,
  `job_name` varchar(20) DEFAULT NULL,
  `job_property` varchar(20) DEFAULT NULL,
  `job_location` varchar(20) DEFAULT NULL,
  `job_decription` varchar(20) DEFAULT NULL,
  `job_code` varchar(20) DEFAULT NULL,
  `dept_level` varchar(20) DEFAULT NULL,
  `exam_type` varchar(20) DEFAULT NULL,
  `person_nums` int(2) DEFAULT NULL,
  `person_major` varchar(50) DEFAULT NULL,
  `person_education` varchar(50) DEFAULT NULL,
  `person_face` varchar(20) DEFAULT NULL,
  `job_base_work_time` int(3) DEFAULT NULL,
  `job_base_work_experience` varchar(200) DEFAULT NULL,
  `job_interview_major` int(2) DEFAULT NULL,
  `job_proportion` int(3) DEFAULT NULL,
  `job_workplace` varchar(20) DEFAULT NULL,
  `person_residence` varchar(20) DEFAULT NULL,
  `site` varchar(20) DEFAULT NULL,
  `cell_phone` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `position_info` */

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`id`,`name`) values (1,'ROLE_ADMIN'),(2,'ROLE_PUBLISHER'),(3,'ROLE_USER');

/*Table structure for table `role_permission` */

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_role_permission_id` (`role_id`),
  KEY `fk_permission_id` (`permission_id`),
  CONSTRAINT `fk_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  CONSTRAINT `fk_role_permission_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `role_permission` */

insert  into `role_permission`(`id`,`role_id`,`permission_id`) values (1,1,2),(2,2,3),(3,3,4);

/*Table structure for table `role_user` */

DROP TABLE IF EXISTS `role_user`;

CREATE TABLE `role_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_role_id` (`role_id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `role_user` */

insert  into `role_user`(`id`,`role_id`,`user_id`) values (1,1,1),(2,2,2),(3,3,3);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `u_enabled` int(2) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`u_enabled`,`email`,`telephone`) values (1,'junbao','3b948e1af0335453f6b329ea823e3510',1,NULL,NULL),(2,'tom','3b948e1af0335453f6b329ea823e3510',1,NULL,NULL),(3,'dog','3b948e1af0335453f6b329ea823e3510',1,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
