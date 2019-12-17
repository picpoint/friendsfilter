new Promise((resolve) => {
  window.addEventListener('load', () => {
    resolve();
  });  
})
  .then(() => {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: 7250280
      });

      VK.Auth.login((response) => {
        console.log(response);
        if(response.session) {          
          resolve(response);
        } else {
          reject(new Error(`***ERR TO AUTHORIZ***`));
        }
      }, 2);
      
    });
  })