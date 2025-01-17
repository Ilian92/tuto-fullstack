# Project Name

This project is a containerized web application with a database backend. Follow these instructions to set up and run the project.

## Prerequisites

Make sure you have the following installed on your system:

-   Docker
-   Docker Compose

Note: All other dependencies (Node.js, npm, etc.) are managed through Docker containers.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Build and start the containers:

```bash
docker-compose up -d --build
```

## Database Access

The database is running in a Docker container. Here's how to access it:

### Using Command Line

```bash
# Connect to the database container
docker exec -it <database-container-name> bash

# Connect to MySQL
mysql -u <username> -p <database-name>
```

### Using Database Management Tools

-   Host: localhost
-   Port: 3306 (default MySQL port)
-   Username: <username>
-   Password: <password>
-   Database: <database-name>

## Viewing the Application

1. Once the containers are running, access the application in your browser:

```
Frontend: http://localhost:3000
API: http://localhost:8000
```

2. Available pages:

-   Home: http://localhost:3000/

## Docker Commands

```bash
# View running containers
docker ps

# View container logs
docker logs <container-name>

# Stop containers
docker-compose down
```

## Troubleshooting

If you encounter any issues:

1. Make sure all required ports are available (3000 for frontend, 8000 for API, 3306 for MySQL)
2. Check container logs for errors
3. Verify that Docker daemon is running
4. Ensure all services are running:

```bash
docker-compose ps
```

## License

[Your License Information]
