// 第六阶段：自定义镜像（Dockerfile）（3-5天）
export const chapter6 = {
  id: 'docker-dockerfile',
  title: '第六阶段：自定义镜像（Dockerfile）（3-5天）',
  sections: [
    {
      title: '6.1 为什么需要自定义镜像',
      content: `官方 PHP 镜像缺少很多扩展和工具，需要自定义。

官方镜像的问题：
• 没有 MySQL、Redis 扩展
• 没有 Composer
• 没有常用工具（git、zip等）
• 每次都要手动安装

自定义镜像的优势：
• 一次构建，到处使用
• 包含所有需要的扩展
• 团队统一环境
• 加快部署速度`,
      code: null
    },
    {
      title: '6.2 编写 Dockerfile',
      content: `Dockerfile 是构建镜像的配置文件。

常用指令：
• FROM - 基础镜像
• RUN - 执行命令
• COPY - 复制文件
• WORKDIR - 工作目录
• EXPOSE - 暴露端口
• CMD - 启动命令`,
      code: `# 创建 Dockerfile
cat > Dockerfile << 'EOF'
# 基于官方 PHP 8.2 FPM 镜像
FROM php:8.2-fpm

# 安装系统依赖
RUN apt-get update && apt-get install -y \\
    git \\
    zip \\
    unzip \\
    libzip-dev \\
    && rm -rf /var/lib/apt/lists/*

# 安装 PHP 扩展
RUN docker-php-ext-install \\
    pdo_mysql \\
    zip \\
    opcache

# 安装 Redis 扩展
RUN pecl install redis && docker-php-ext-enable redis

# 安装 Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 设置工作目录
WORKDIR /var/www/html

# 暴露 9000 端口
EXPOSE 9000

# 启动 PHP-FPM
CMD ["php-fpm"]
EOF`,
      language: 'dockerfile'
    },
    {
      title: '6.3 构建镜像',
      content: `使用 docker build 命令构建自定义镜像。

构建参数：
• -t 镜像名:标签
• . 构建上下文（当前目录）
• -f 指定 Dockerfile`,
      code: `# 构建镜像
docker build -t my-php:8.2 .

# 查看构建过程
# Step 1/8 : FROM php:8.2-fpm
# Step 2/8 : RUN apt-get update...
# ...
# Successfully built abc123
# Successfully tagged my-php:8.2

# 查看镜像
docker images | grep my-php

# 测试镜像
docker run -d --name test-php my-php:8.2

# 进入容器验证
docker exec test-php php -m | grep -E "pdo_mysql|redis"

# 验证 Composer
docker exec test-php composer --version

# 删除测试容器
docker rm -f test-php`,
      language: 'bash'
    },
    {
      title: '6.4 在 Compose 中使用自定义镜像',
      content: `修改 docker-compose.yml 使用自定义镜像。`,
      code: `# 方式一：使用已构建的镜像
version: '3.8'

services:
  php:
    image: my-php:8.2
    volumes:
      - ./php:/var/www/html
    networks:
      - app-net

# 方式二：自动构建
version: '3.8'

services:
  php:
    build: .
    # 或者指定 Dockerfile 路径
    # build:
    #   context: .
    #   dockerfile: Dockerfile
    volumes:
      - ./php:/var/www/html
    networks:
      - app-net

# 构建并启动
docker compose up -d --build`,
      language: 'yaml'
    },
    {
      title: '6.5 优化 Dockerfile',
      content: `优化 Dockerfile 减小镜像体积，提升构建速度。

优化技巧：
• 合并 RUN 指令
• 清理缓存文件
• 使用 .dockerignore
• 多阶段构建`,
      code: `# 优化后的 Dockerfile
FROM php:8.2-fpm

# 合并命令，减少层数
RUN apt-get update && apt-get install -y \\
    git zip unzip libzip-dev \\
    && docker-php-ext-install pdo_mysql zip opcache \\
    && pecl install redis && docker-php-ext-enable redis \\
    && rm -rf /var/lib/apt/lists/* \\
    && apt-get clean

# 安装 Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 配置 PHP
RUN echo "memory_limit = 256M" > /usr/local/etc/php/conf.d/memory.ini \\
    && echo "upload_max_filesize = 20M" >> /usr/local/etc/php/conf.d/memory.ini

WORKDIR /var/www/html

EXPOSE 9000

CMD ["php-fpm"]

# 创建 .dockerignore
cat > .dockerignore << 'EOF'
.git
.gitignore
README.md
.env
node_modules
vendor
EOF`,
      language: 'dockerfile'
    },
    {
      title: '6.6 常用 PHP 扩展安装',
      content: `整理常用 PHP 扩展的安装方法。`,
      code: `# 完整的 PHP 镜像（包含常用扩展）
FROM php:8.2-fpm

# 安装系统依赖
RUN apt-get update && apt-get install -y \\
    git zip unzip \\
    libzip-dev \\
    libpng-dev \\
    libjpeg-dev \\
    libfreetype6-dev \\
    && rm -rf /var/lib/apt/lists/*

# 安装 PHP 核心扩展
RUN docker-php-ext-install \\
    pdo_mysql \\
    zip \\
    opcache \\
    bcmath

# 安装 GD 扩展（图像处理）
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \\
    && docker-php-ext-install gd

# 安装 PECL 扩展
RUN pecl install redis && docker-php-ext-enable redis

# 安装 Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# PHP 配置
COPY php.ini /usr/local/etc/php/conf.d/custom.ini

WORKDIR /var/www/html

CMD ["php-fpm"]`,
      language: 'dockerfile'
    }
  ]
};

// 第七阶段：TP6 实战项目（5-7天）
export const chapter7 = {
  id: 'docker-tp6',
  title: '第七阶段：TP6 实战项目（5-7天）',
  sections: [
    {
      title: '7.1 创建 TP6 项目',
      content: `使用 Composer 创建 ThinkPHP 6 项目。

项目结构：
• app/ - 应用目录
• config/ - 配置文件
• public/ - 入口文件
• runtime/ - 运行时文件
• vendor/ - 依赖包`,
      code: `# 创建项目目录
mkdir -p ~/tp6-docker
cd ~/tp6-docker

# 使用 Composer 创建 TP6 项目
docker run --rm \\
  -v $(pwd):/app \\
  composer:latest \\
  create-project topthink/think tp6

# 查看项目结构
ls -la tp6/

# 设置权限
chmod -R 777 tp6/runtime/`,
      language: 'bash'
    },
    {
      title: '7.2 配置 Nginx 支持 TP6',
      content: `配置 Nginx 支持 TP6 的路由规则。

关键配置：
• root 指向 public 目录
• try_files 支持路由
• fastcgi_param 传递参数`,
      code: `# 创建 Nginx 配置
cat > nginx.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /var/www/html/tp6/public;
    index index.php index.html;

    # TP6 路由支持
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP 处理
    location ~ \\.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # 禁止访问隐藏文件
    location ~ /\\. {
        deny all;
    }
}
EOF`,
      language: 'nginx'
    },
    {
      title: '7.3 完整的 docker-compose.yml',
      content: `为 TP6 项目创建完整的 Docker Compose 配置。`,
      code: `cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./:/var/www/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - php
    networks:
      - tp6-net
    restart: always

  php:
    build: .
    volumes:
      - ./:/var/www/html
    networks:
      - tp6-net
    restart: always

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: tp6_db
      MYSQL_USER: tp6_user
      MYSQL_PASSWORD: tp6_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - tp6-net
    restart: always

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    networks:
      - tp6-net
    restart: always

networks:
  tp6-net:
    driver: bridge

volumes:
  mysql-data:
EOF`,
      language: 'yaml'
    },
    {
      title: '7.4 配置 TP6 数据库连接',
      content: `修改 TP6 的数据库配置文件。`,
      code: `# 修改 tp6/.env 文件
cat > tp6/.env << 'EOF'
APP_DEBUG = true

[APP]
DEFAULT_TIMEZONE = Asia/Shanghai

[DATABASE]
TYPE = mysql
HOSTNAME = mysql
DATABASE = tp6_db
USERNAME = tp6_user
PASSWORD = tp6_pass
HOSTPORT = 3306
CHARSET = utf8mb4
DEBUG = true

[REDIS]
HOST = redis
PORT = 6379
PASSWORD =
SELECT = 0
EOF

# 测试数据库连接
# 创建测试控制器
mkdir -p tp6/app/controller
cat > tp6/app/controller/Test.php << 'EOF'
<?php
namespace app\\controller;

use think\\facade\\Db;

class Test
{
    public function index()
    {
        // 测试数据库连接
        try {
            $result = Db::query('SELECT VERSION()');
            return json([
                'code' => 200,
                'msg' => '数据库连接成功',
                'data' => $result
            ]);
        } catch (\\Exception $e) {
            return json([
                'code' => 500,
                'msg' => '数据库连接失败：' . $e->getMessage()
            ]);
        }
    }
}
EOF`,
      language: 'bash'
    },
    {
      title: '7.5 启动项目',
      content: `启动完整的 TP6 项目。`,
      code: `# 启动所有服务
docker compose up -d --build

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f

# 等待 MySQL 启动完成
docker compose logs mysql | grep "ready for connections"

# 访问项目
# http://localhost:8080
# http://localhost:8080/test

# 进入 PHP 容器
docker compose exec php bash

# 在容器内执行 TP6 命令
php think version
php think make:controller User

# 退出容器
exit`,
      language: 'bash'
    },
    {
      title: '7.6 常用开发命令',
      content: `TP6 项目开发中的常用 Docker 命令。`,
      code: `# 查看服务状态
docker compose ps

# 重启 PHP 服务（修改配置后）
docker compose restart php

# 查看 PHP 日志
docker compose logs -f php

# 查看 Nginx 日志
docker compose logs -f nginx

# 进入 PHP 容器执行命令
docker compose exec php php think migrate:run
docker compose exec php php think optimize:schema

# 安装新的 Composer 包
docker compose exec php composer require topthink/think-queue

# 清理缓存
docker compose exec php php think clear

# 数据库迁移
docker compose exec php php think migrate:run

# 停止所有服务
docker compose down

# 完全清理（包括数据卷）
docker compose down -v`,
      language: 'bash'
    },
    {
      title: '7.7 项目部署到生产环境',
      content: `将 TP6 项目部署到生产服务器。

部署步骤：
1. 上传代码到服务器
2. 修改环境变量
3. 启动服务
4. 配置域名和 HTTPS`,
      code: `# 1. 在服务器上克隆项目
git clone https://github.com/your/project.git
cd project

# 2. 修改生产环境配置
cat > tp6/.env << 'EOF'
APP_DEBUG = false

[DATABASE]
TYPE = mysql
HOSTNAME = mysql
DATABASE = tp6_db
USERNAME = tp6_user
PASSWORD = your_secure_password
HOSTPORT = 3306

[REDIS]
HOST = redis
PORT = 6379
EOF

# 3. 修改 docker-compose.yml 端口
# 将 8080:80 改为 80:80

# 4. 启动服务
docker compose up -d --build

# 5. 配置 Nginx 反向代理（如果需要）
# 6. 配置 SSL 证书（Let's Encrypt）

# 7. 设置定时任务
# 在宿主机 crontab 中添加：
# */5 * * * * cd /path/to/project && docker compose exec -T php php think queue:work

# 8. 监控和日志
docker compose logs -f --tail=100`,
      language: 'bash'
    }
  ]
};

export default {
  chapter6,
  chapter7
};
