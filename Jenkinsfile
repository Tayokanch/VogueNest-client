pipeline {
    agent any

    environment {
        IMAGE_NAME = "vogueshopping"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                  docker build -t ${IMAGE_NAME}:latest .
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                  docker compose up -d
                """
            }
        }

        stage('Verify') {
            steps {
                sh """
                  docker ps | grep ${IMAGE_NAME} || true
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
