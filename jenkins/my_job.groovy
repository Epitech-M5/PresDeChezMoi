pipelineJob('job-dsl-plugin') {
  definition {
    cps {
      script('''
        pipeline {
          agent any

          stages {
            stage('Hello') {
              steps {
                echo 'Hello World'
              }
            }
          }
        }
      ''')
    }
  }
}
