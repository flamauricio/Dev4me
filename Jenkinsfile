pipeline{
agent none
stages{
    stage('test'){
        agent{
            label 'VStest'
        }
        steps{
            script{
                //nothing
            }
        }
    }
}
post{
    always{
        mail to: 'pedro.henrique.sous@gmail.com',
            subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
            body: "Something is wrong with ${env.BUILD_URL}"
        echo "sent"
