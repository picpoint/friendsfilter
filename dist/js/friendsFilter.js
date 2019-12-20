let headerInfo = document.querySelector('.ff__selecthdr').firstElementChild;
let contentblock = document.querySelector('.ff__pplleftblock');
console.log(headerInfo);
console.log(contentblock);



// function vkApi(method, options) {
//   return new Promise((resolve, reject) => {
//     VK.api(method, options, response, () => {
//       if(response.error) {
//         reject(new Error(response.error.error_msg));
//       } else {
//         resolve(response);
//       }
//     });
//   });
// }


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
      VK.api('users.get', {v: '5.8', name_case: 'gen'}, (response) => {
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
    let friend = response.response.items;
    for(let key in friend) {
      console.log(friend[key].first_name);
      
      // let blockfriend = document.createElement('div');
      // blockfriend.classList.add('ff__blockonefriend');
      // contentblock.appendChild(blockfriend);
      let imgfriend = document.createElement('img');   
      imgfriend.setAttribute('src', friend[key].photo_100);      
      console.log(imgfriend);
      contentblock.appendChild(imgfriend);
    }
  });