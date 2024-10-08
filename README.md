# Docker Voting App

This project is a simple voting application where users can vote for their preferred mobile platform: Android or iOS. The application consists of a front-end for voting, a back-end API built with Node.js, a MySQL database to store the votes, and a front-end for displaying the results in a pie chart. All components are containerized using Docker.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Web Application Flow Diagram](#web-application-flow-diagram)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Vote Page**: Users can vote for their favorite platform (Android or iOS).
- **Real-Time Results**: Results are displayed in a pie chart showing the percentage of votes for each option.
- **Dockerized**: All components (frontend, backend, database) are containerized using Docker.

## Getting Started

### Prerequisites

- Docker installed on your system.
- Docker Compose (usually bundled with Docker Desktop for Windows and macOS).

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/BenArtzi4/docker-voting-app.git
    cd docker-voting-app
    ```

2. **Build and Run the Docker Containers**:
    ```bash
    docker-compose up --build
    ```

3. **Access the Application**:
   - **Vote Frontend**: [http://localhost:8080](http://localhost:8080)
   - **Results Frontend**: [http://localhost:8081](http://localhost:8081)

## Usage

- **Vote**: Open the voting page in your browser and cast your vote for either Android or iOS.
- **View Results**: Check the results page to see the live voting results, including the number of votes for Android and iOS.

## Web Application Flow Diagram

The diagram below illustrates the flow of the web application, from the user interacting with the voting page to viewing the results.

![vote-app-graph](https://github.com/user-attachments/assets/727093e7-d4fa-4973-b5ab-9ac2ae35108a)

## Screenshots

### Voting Page

![votes-page](https://github.com/user-attachments/assets/87bf3b34-2f79-4d9e-8d49-7af632156863)

### Results Page

![results-page](https://github.com/user-attachments/assets/b0a273d1-c11a-4ba9-b3ed-e37fdbb8f992)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.
