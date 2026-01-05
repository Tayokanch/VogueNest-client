pipeline {
    agent any

    environment {
        REACT_APP_NAME = "vogueshopping"
        COMPOSE_DIR = "/opt/nginx" 
        HOST_PORT = "5050"         
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build React Docker Image') {
            steps {
                sh """
                docker build -t ${REACT_APP_NAME}:latest .
                """
            }
        }

        stage('Deploy React Frontend') {
            steps {
                sh """
                docker compose up -d
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                sh """
                docker ps | grep vogueshopping_website
                docker logs vogueshopping_website --tail 20
                """
            }
        }
    }

    post {
        always {
            echo "Vogueshopping pipeline completed"
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
    }
}
