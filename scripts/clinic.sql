/*
Navicat MySQL Data Transfer
Source Server         : localhost
Source Server Version : 517
Source Host           : localhost:3306
Source Database       : zuoyisheng
Target Server Type    : MYSQL
Target Server Version : 517
File Encoding         : 65001
Date: 2017-03-25 19:59:02
*/

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 sjy.adm 结构
DROP TABLE IF EXISTS `adm`;
CREATE TABLE IF NOT EXISTS `adm` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `aname` varchar(50) NOT NULL COMMENT '管理员账号',
  `ashowname` varchar(50) NOT NULL COMMENT '管理员姓名',
  `apwd` varchar(128) NOT NULL COMMENT '密码',
  `ahash` varchar(32) NOT NULL COMMENT 'hash',
  `regtime` int(11) NOT NULL,
  `lastlogtime` int(11) NOT NULL COMMENT '最后登录时间',
  `lastlogip` varchar(50) NOT NULL COMMENT '最后登录ip',
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- 数据导出被取消选择。


-- 导出  表 sjy.patient 结构
DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `pid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id唯一',
  `ppid` varchar(18) DEFAULT NULL COMMENT '身份证id',
  `pname` varchar(50) NOT NULL COMMENT '病人姓名',
  `ppinyin` VARCHAR(255) DEFAULT NULL COMMENT '拼音缩写，方便查询',
  `pbirdate` varchar(30) NOT NULL COMMENT '病人出生日期建议文本',
  `ptel` varchar(18) NOT NULL COMMENT '手机号',
  `paddress` varchar(255) NOT NULL COMMENT '住址',
  `pnote` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='病人表';

-- 数据导出被取消选择。


-- 导出  表 sjy.visits 结构
DROP TABLE IF EXISTS `visits`;
CREATE TABLE IF NOT EXISTS `visits` (
  `vid` int(11) NOT NULL AUTO_INCREMENT COMMENT '病例id ',
  `pid` int(11) NOT NULL COMMENT '病人id',
  `vtime` int(11) NOT NULL COMMENT '添加时间，建议时间戳',
  `vreason` varchar(1000) NOT NULL COMMENT '病情',
  `vresult` varchar(1000) NOT NULL COMMENT '诊断处方',
  `aid` int(11) NOT NULL COMMENT '添加管理员账号',
  `vnote` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`vid`),
  KEY `pid` (`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='病历表';

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
