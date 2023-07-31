FROM jenkins/jenkins:lts

USER root

COPY --chown=jenkins:jenkins plugins.txt /var/jenkins_home/plugins.txt
COPY --chown=jenkins:jenkins my_jenkins.yml /var/jenkins_home/my_jenkins.yml
COPY --chown=jenkins:jenkins my_job.groovy /var/jenkins_home/my_job.groovy
COPY --chown=jenkins:jenkins UpdateDeploymentARM.yml /var/jenkins_home/UpdateDeploymentARM.yml

# Copie de la clé SSH dans le conteneur
COPY id_rsa /tmp/id_rsa
COPY id_rsa.pub /tmp/id_rsa.pub

# Ajout de la clé SSH à Jenkins
RUN mkdir -p /var/jenkins_home/.ssh \
    && mv /tmp/id_rsa /var/jenkins_home/.ssh/id_rsa \
    && mv /tmp/id_rsa.pub /var/jenkins_home/.ssh/id_rsa.pub \
    && chown -R jenkins:jenkins /var/jenkins_home/.ssh \
    && chmod 700 /var/jenkins_home/.ssh \
    && chmod 600 /var/jenkins_home/.ssh/id_rsa \
    && chmod 644 /var/jenkins_home/.ssh/id_rsa.pub

#CASC -> configuration as code
ENV CASC_JENKINS_CONFIG /var/jenkins_home/my_jenkins.yml


USER jenkins
RUN jenkins-plugin-cli -f /var/jenkins_home/plugins.txt

ENV USER_MATEO_PASSWORD="U5w6x59vJ9W7FUqqe9Bg"
ENV USER_MaxenceL_PASSWORD="569kBVf2T9eiV4gDVs4s"
ENV USER_MaxenceB_PASSWORD="qC743Wd6pGkP3HkqRq26"
ENV USER_Morgan_PASSWORD="aCHUty3u7rv4f23F3C5H"
ENV USER_Meriem_PASSWORD="KwaW5pB3Sc4aTUdz4247"