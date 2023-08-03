pipelineJob('Update_Deployment') {
    definition {
        cps {
            script('''
                pipeline {
                    agent any

                    stages {
                        stage('Check version git') {
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[credentialsId: 'b16498d8-2f6c-4f93-b6b7-2c04d1cf8839', url: 'git@github.com:EpitechMscProPromo2025/T-YEP-600-MAR-6-1-finalproject-mateo.salvy.git']]])
                            }
                        }
                        stage('Déploiement') {
                            steps {
                                script {
                                    def remoteServer = '129.151.234.208'
                                    def remoteUser = 'ubuntu'

                                    sh "ssh ${remoteUser}@${remoteServer} sudo docker stop t-yep-600-mar-6-1-finalproject-mateosalvy-back-1 && sudo docker rm t-yep-600-mar-6-1-finalproject-mateosalvy-back-1"
                                    sh "ssh ${remoteUser}@${remoteServer} sudo docker stop t-yep-600-mar-6-1-finalproject-mateosalvy-front-1 && sudo docker rm t-yep-600-mar-6-1-finalproject-mateosalvy-front-1"
                                    sh "ssh ${remoteUser}@${remoteServer} sudo docker rmi t-yep-600-mar-6-1-finalproject-mateosalvy-back"
                                    sh "ssh ${remoteUser}@${remoteServer} sudo docker rmi t-yep-600-mar-6-1-finalproject-mateosalvy-front"
                                    sh "ssh ${remoteUser}@${remoteServer} sudo git clone https://github.com/EpitechMscProPromo2025/T-YEP-600-MAR-6-1-finalproject-mateo.salvy.git /path/to/destination"
                                    sh "ssh ${remoteUser}@${remoteServer} cd /path/to/destination && sudo docker-compose up -d"
                                }
                            }
                        }
                    }
                }
            ''')
        }
    }
}
