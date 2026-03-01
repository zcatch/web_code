// 第三阶段：运行 PHP 项目（3-4天）
export const chapter3 = {
  id: 'docker-php',
  title: '第三阶段：运行 PHP 项目（3-4天）',
  sections: [
    {
      title: '3.1 单独运行 PHP-FPM',
      content: `PHP-FPM 是 PHP 的 FastCGI 进程管理器，用于处理 PHP 请求。

PHP-FPM 特点：
• 独立的进程，不依赖 Web 服务器
• 通过 9000 端口与 Nginx 通信
• 支持多版本 PHP 共存

镜像选择：
• php:8.2-fpm - PHP 8.2
• php:8.1-fpm - PHP 8.1
• php:7.4-fpm - PHP 7.4`,
      code: `# 创建 PHP 测试文件
mkdir -p ~/docker-test/php
echo "<?php phpinfo();" > ~/docker-test/php/index.php

# 运行 PHP-FPM 容器
docker run -d \\
  -v ~/docker-test/php:/var/www/html \\
  --name php-fpm \\
  php:8.2-fpm

# 查看容器状态
docker ps

# 查看 PHP 版本
docker exec php-fpm php -v

# 查看 PHP 配置
docker exec php-fpm php -i

# 进入容器查看
docker exec -it php-fpm bash
ls /var/www/html
cat /var/www/html/index.php
exit`,
      language: 'bash'
    },
    {
      title: '3.2 Nginx + PHP-FPM 联动',
      content: `Nginx 负责处理静态文件和转发 PHP 请求给 PHP-FPM。

工作流程：
1. 用户访问 .php 文件
2. Nginx 接收请求
3. Nginx 转发给 PHP-FPM（9000端口）
4. PHP-FPM 处理并返回结果
5. Nginx 返回给用户

关键配置：
• fastcgi_pass php-fpm:9000
• 容器名作为主机名`,
      code: `# 创建 Nginx 配置文件
mkdir -p ~/docker-test
cat > ~/docker-test/nginx.conf << 'EOF'
server {
    listen 80;
    root /var/www/html;
    index index.php index.html;

    location ~ \\.php$ {
        fastcgi_pass php-fpm:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
EOF

# 创建网络（让容器互相通信）
docker network create php-net

# 运行 PHP-FPM
docker run -d \\
  --network php-net \\
  --name php-fpm \\
  -v ~/docker-test/php:/var/www/html \\
  php:8.2-fpm

# 运行 Nginx
docker run -d \\
  --network php-net \\
  --name nginx \\
  -p 8080:80 \\
  -v ~/docker-test/php:/var/www/html \\
  -v ~/docker-test/nginx.conf:/etc/nginx/conf.d/default.conf \\
  nginx

# 访问 localhost:8080 看到 phpinfo`,
      language: 'bash'
    },
    {
      title: '3.3 测试 PHP 功能',
      content: `创建测试文件验证 PHP 环境是否正常。`,
      code: `# 创建测试文件
cat > ~/docker-test/php/test.php << 'EOF'
<?php
echo "<h1>PHP 测试</h1>";
echo "<p>PHP 版本：" . PHP_VERSION . "</p>";
echo "<p>当前时间：" . date('Y-m-d H:i:s') . "</p>";

// 测试文件操作
$file = '/var/www/html/test.txt';
file_put_contents($file, "Hello from PHP!");
echo "<p>文件写入成功</p>";

// 测试数组
$arr = ['name' => '张三', 'age' => 25];
echo "<pre>";
print_r($arr);
echo "</pre>";
?>
EOF

# 访问 localhost:8080/test.php`,
      language: 'bash'
    },
    {
      title: '3.4 常见问题排查',
      content: `遇到问题时的排查步骤。

常见问题：
• 502 Bad Gateway - PHP-FPM 未启动或网络不通
• 404 Not Found - 文件路径不对
• 403 Forbidden - 权限问题
• File not found - Nginx 和 PHP 挂载路径不一致`,
      code: `# 检查容器是否运行
docker ps

# 检查 PHP-FPM 日志
docker logs php-fpm

# 检查 Nginx 日志
docker logs nginx

# 检查网络连接
docker exec nginx ping php-fpm

# 进入 Nginx 容器检查文件
docker exec nginx ls -la /var/www/html

# 进入 PHP 容器检查文件
docker exec php-fpm ls -la /var/www/html

# 测试 PHP-FPM 是否监听 9000 端口
docker exec php-fpm netstat -tuln | grep 9000

# 重启容器
docker restart php-fpm nginx`,
      language: 'bash'
    }
  ]
};

// 第四阶段：添加 MySQL 和 Redis（2-3天）
export const chapter4 = {
  id: 'docker-database',
  title: '第四阶段：添加 MySQL 和 Redis（2-3天）',
  sections: [
    {
      title: '4.1 运行 MySQL 容器',
      content: `MySQL 是最常用的关系型数据库。

环境变量：
• MYSQL_ROOT_PASSWORD - root 密码（必需）
• MYSQL_DATABASE - 创建数据库
• MYSQL_USER - 创建用户
• MYSQL_PASSWORD - 用户密码`,
      code: `# 运行 MySQL 容器
docker run -d \\
  --network php-net \\
  --name mysql \\
  -e MYSQL_ROOT_PASSWORD=root123 \\
  -e MYSQL_DATABASE=tp6_test \\
  -p 3306:3306 \\
  mysql:8.0

# 查看 MySQL 日志
docker logs mysql

# 等待 MySQL 启动完成（看到 ready for connections）

# 进入 MySQL 容器
docker exec -it mysql bash

# 连接 MySQL
mysql -uroot -proot123

# 查看数据库
SHOW DATABASES;

# 使用数据库
USE tp6_test;

# 创建测试表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(100)
);

# 插入测试数据
INSERT INTO users (name, email) VALUES ('张三', 'zhangsan@example.com');

# 查询数据
SELECT * FROM users;

# 退出
exit
exit`,
      language: 'bash'
    },
    {
      title: '4.2 运行 Redis 容器',
      content: `Redis 是高性能的键值存储数据库，常用于缓存。

Redis 特点：
• 内存存储，速度快
• 支持多种数据类型
• 持久化支持
• 发布订阅功能`,
      code: `# 运行 Redis 容器
docker run -d \\
  --network php-net \\
  --name redis \\
  -p 6379:6379 \\
  redis:alpine

# 查看 Redis 日志
docker logs redis

# 进入 Redis 容器
docker exec -it redis sh

# 连接 Redis
redis-cli

# 测试 Redis
SET name "张三"
GET name
KEYS *

# 退出
exit
exit`,
      language: 'bash'
    },
    {
      title: '4.3 PHP 安装扩展',
      content: `PHP 需要安装 MySQL 和 Redis 扩展才能连接数据库。

常用扩展：
• pdo_mysql - MySQL 扩展
• redis - Redis 扩展
• gd - 图像处理
• zip - 压缩文件`,
      code: `# 进入 PHP 容器
docker exec -it php-fpm bash

# 安装 MySQL 扩展
docker-php-ext-install pdo_mysql

# 安装 Redis 扩展
pecl install redis
docker-php-ext-enable redis

# 查看已安装的扩展
php -m

# 退出容器
exit

# 重启 PHP 容器使扩展生效
docker restart php-fpm`,
      language: 'bash'
    },
    {
      title: '4.4 PHP 连接 MySQL',
      content: `测试 PHP 连接 MySQL 数据库。`,
      code: `# 创建测试文件
cat > ~/docker-test/php/mysql-test.php << 'EOF'
<?php
try {
    $pdo = new PDO(
        'mysql:host=mysql;dbname=tp6_test',
        'root',
        'root123'
    );
    echo "<h2>MySQL 连接成功！</h2>";
    
    // 查询数据
    $stmt = $pdo->query("SELECT * FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<pre>";
    print_r($users);
    echo "</pre>";
    
} catch (PDOException $e) {
    echo "连接失败：" . $e->getMessage();
}
?>
EOF

# 访问 localhost:8080/mysql-test.php`,
      language: 'bash'
    },
    {
      title: '4.5 PHP 连接 Redis',
      content: `测试 PHP 连接 Redis。`,
      code: `# 创建测试文件
cat > ~/docker-test/php/redis-test.php << 'EOF'
<?php
try {
    $redis = new Redis();
    $redis->connect('redis', 6379);
    
    echo "<h2>Redis 连接成功！</h2>";
    
    // 设置值
    $redis->set('test_key', 'Hello Redis!');
    
    // 获取值
    $value = $redis->get('test_key');
    echo "<p>test_key = $value</p>";
    
    // 设置过期时间（60秒）
    $redis->setex('temp_key', 60, 'Temporary Value');
    
    // 查看所有键
    $keys = $redis->keys('*');
    echo "<pre>";
    print_r($keys);
    echo "</pre>";
    
} catch (Exception $e) {
    echo "连接失败：" . $e->getMessage();
}
?>
EOF

# 访问 localhost:8080/redis-test.php`,
      language: 'bash'
    },
    {
      title: '4.6 完整的 LNMP 环境',
      content: `现在我们已经搭建了完整的 LNMP 环境。

环境组成：
• L - Linux（Docker 宿主机）
• N - Nginx（Web 服务器）
• M - MySQL（数据库）
• P - PHP（编程语言）

额外组件：
• Redis（缓存）

下一步：
• 使用 Docker Compose 简化管理
• 一键启动所有服务`,
      code: `# 查看所有容器
docker ps

# 应该看到：
# - nginx
# - php-fpm
# - mysql
# - redis

# 查看网络
docker network inspect php-net

# 测试完整流程
# 1. 访问 localhost:8080 - 看到 phpinfo
# 2. 访问 localhost:8080/mysql-test.php - 测试 MySQL
# 3. 访问 localhost:8080/redis-test.php - 测试 Redis

# 停止所有容器
docker stop nginx php-fpm mysql redis

# 删除所有容器
docker rm nginx php-fpm mysql redis

# 删除网络
docker network rm php-net`,
      language: 'bash'
    }
  ]
};

// 第五阶段：使用 Docker Compose（3-4天）
export const chapter5 = {
  id: 'docker-compose',
  title: '第五阶段：使用 Docker Compose（3-4天）',
  sections: [
    {
      title: '5.1 Docker Compose 简介',
      content: `Docker Compose 是用于定义和运行多容器应用的工具。

为什么需要 Compose：
• 手动管理多个容器太麻烦
• 容器之间的依赖关系复杂
• 需要记住很多命令和参数

Compose 的优势：
• 一个文件定义所有服务
• 一条命令启动所有容器
• 自动创建网络
• 管理容器依赖关系`,
      code: `# 安装 Docker Compose（Ubuntu）
sudo apt-get install docker-compose-plugin

# 验证安装
docker compose version

# 输出类似：
# Docker Compose version v2.20.0`,
      language: 'bash'
    },
    {
      title: '5.2 编写 docker-compose.yml',
      content: `创建 docker-compose.yml 文件定义所有服务。

文件结构：
• version: Compose 文件版本
• services: 定义所有服务
• networks: 定义网络
• volumes: 定义数据卷`,
      code: `# 创建项目目录
mkdir -p ~/docker-compose-test
cd ~/docker-compose-test

# 创建 docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  nginx:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./php:/var/www/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - php
    networks:
      - app-net

  php:
    image: php:8.2-fpm
    volumes:
      - ./php:/var/www/html
    networks:
      - app-net

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: tp6_test
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - app-net

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    networks:
      - app-net

networks:
  app-net:

volumes:
  mysql-data:
EOF`,
      language: 'yaml'
    },
    {
      title: '5.3 Compose 常用命令',
      content: `掌握 Docker Compose 的常用命令。

基本命令：
• up - 启动服务
• down - 停止并删除服务
• ps - 查看服务状态
• logs - 查看日志
• restart - 重启服务`,
      code: `# 启动所有服务（后台运行）
docker compose up -d

# 查看服务状态
docker compose ps

# 查看所有服务日志
docker compose logs

# 查看特定服务日志
docker compose logs php

# 实时查看日志
docker compose logs -f

# 停止所有服务
docker compose stop

# 启动所有服务
docker compose start

# 重启特定服务
docker compose restart php

# 停止并删除所有服务
docker compose down

# 停止并删除服务、网络、数据卷
docker compose down -v

# 重新构建并启动
docker compose up -d --build`,
      language: 'bash'
    },
    {
      title: '5.4 完整项目示例',
      content: `创建一个完整的项目，包含所有配置文件。`,
      code: `# 创建项目结构
mkdir -p ~/my-project/{php,nginx}
cd ~/my-project

# 创建 PHP 测试文件
cat > php/index.php << 'EOF'
<?php
phpinfo();
?>
EOF

# 创建 Nginx 配置
cat > nginx.conf << 'EOF'
server {
    listen 80;
    root /var/www/html;
    index index.php index.html;

    location ~ \\.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
EOF

# 创建 docker-compose.yml（使用上面的配置）

# 启动项目
docker compose up -d

# 查看状态
docker compose ps

# 访问 localhost:8080`,
      language: 'bash'
    }
  ]
};

// 导出所有章节
export default {
  chapter3,
  chapter4,
  chapter5
};
