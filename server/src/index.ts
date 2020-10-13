import server from './Server';

//Set port number of app
const port = 3000;

const starter = new server().start(port)
  .then(port => console.log('Running on port ' + port))
  .catch(error => {
    console.log(error)
  });

export default starter;
