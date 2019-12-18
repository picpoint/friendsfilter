let headerInfo = document.querySelector('.ff__headerInfo');
console.log(headerInfo);


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
        //console.log(response);
        if(response.session) {          
          resolve(response);
          headerInfo.textContent = `Друзья ${response.session.user.first_name} ${response.session.user.last_name}`;          
        } else {
          reject(new Error(`***ERR TO AUTHORIZ***`));
        }
      }, 2);
      
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      VK.api('users.get', {name_case: 'gen'}, (response) => {
        console.log(response);
        if(response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          headerInfo.textContent = `Друзья ${response.response[0].first_name} ${response.response[0].last_name}`;          
          resolve(response);
        }
      });
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      VK.api('friends.get', {v: '5.8', fields: 'photo_100,country,city'}, (response) => {
        if(response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response);
        }
      });
    });
  })
  .then((response) => {
    console.log(response);
  });