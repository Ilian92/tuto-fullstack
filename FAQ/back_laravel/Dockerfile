FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www/html

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Create start script
USER root
RUN echo '#!/bin/bash\n\
\n\
echo "Waiting for MySQL to be ready..."\n\
MAX_TRIES=30\n\
TRIES=0\n\
while ! php artisan db:monitor > /dev/null 2>&1; do\n\
    TRIES=$((TRIES+1))\n\
    if [ $TRIES -gt $MAX_TRIES ]; then\n\
        echo "Error: MySQL did not become ready in time"\n\
        exit 1\n\
    fi\n\
    echo "Waiting for MySQL... (attempt $TRIES/$MAX_TRIES)"\n\
    sleep 2\n\
done\n\
\n\
echo "Running database migrations..."\n\
php artisan migrate --force\n\
\n\
echo "Installing npm dependencies..."\n\
npm install --legacy-peer-deps\n\
\n\
echo "Starting servers..."\n\
(php artisan serve --host=0.0.0.0 --port=8000 &)\n\
npm run dev' > /usr/local/bin/start.sh \
&& chmod +x /usr/local/bin/start.sh

# Change current user to www-data
USER www-data

# Expose ports for both Laravel and Vite
EXPOSE 8000 5173

# Use the start script as the entry point
CMD ["/usr/local/bin/start.sh"]
