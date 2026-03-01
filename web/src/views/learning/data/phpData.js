export default {
  id: 'php',
  name: 'PHP',
  icon: '🐘',
  status: 'planned',
  description: 'PHP 后端开发从入门到精通',
  chapters: [
    {
      id: 'php-basics',
      title: '第一章：PHP 基础语法',
      sections: [
        {
          title: '1.1 PHP 简介与环境搭建',
          content: `PHP 是一种广泛使用的服务器端脚本语言，特别适合 Web 开发。

PHP 特点：
• 易学易用，语法简洁
• 丰富的框架生态（Laravel、Symfony、ThinkPHP）
• 强大的数据库支持
• 大量的开源项目和社区资源
• 跨平台支持

应用场景：
• Web 网站开发
• API 接口开发
• 内容管理系统（WordPress、Drupal）
• 电商系统（Magento、OpenCart）`,
          code: null
        },
        {
          title: '1.2 PHP 基本语法',
          content: `PHP 代码嵌入在 HTML 中，使用 <?php ?> 标签。

基本规则：
• PHP 文件以 .php 结尾
• 语句以分号结束
• 变量以 $ 开头
• 大小写敏感（变量）
• 支持单行和多行注释`,
          code: `<?php
// 单行注释

/*
 * 多行注释
 */

// 输出
echo "Hello, World!";
print "Hello, PHP!";

// 变量
$name = "张三";
$age = 25;
$price = 99.99;
$isActive = true;

// 数组
$fruits = array("苹果", "香蕉", "橙子");
$person = [
    "name" => "张三",
    "age" => 25
];

// 常量
define("SITE_NAME", "我的网站");
const API_KEY = "abc123";

?>`,
          language: 'php'
        }
      ]
    }
  ]
};
