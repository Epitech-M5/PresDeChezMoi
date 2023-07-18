FROM jenkins/jenkins:lts

USER root

COPY --chown=jenkins:jenkins plugins.txt /var/jenkins_home/plugins.txt
COPY --chown=jenkins:jenkins my_jenkins.yml /var/jenkins_home/my_jenkins.yml
COPY --chown=jenkins:jenkins my_job.groovy /var/jenkins_home/my_job.groovy

#CASC -> configuration as code
ENV CASC_JENKINS_CONFIG /var/jenkins_home/my_jenkins.yml


USER jenkins
RUN jenkins-plugin-cli -f /var/jenkins_home/plugins.txt

ENV USER_MATEO_PASSWORD="U5w6x59vJ9W7FUqqe9Bg"
ENV USER_MaxenceL_PASSWORD="569kBVf2T9eiV4gDVs4s"
ENV USER_MaxenceB_PASSWORD="qC743Wd6pGkP3HkqRq26"
ENV USER_Morgan_PASSWORD="aCHUty3u7rv4f23F3C5H"
ENV USER_Meriem_PASSWORD="KwaW5pB3Sc4aTUdz4247"