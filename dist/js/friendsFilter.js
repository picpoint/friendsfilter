let headerInfo = document.querySelector('.ff__selecthdr').firstElementChild;
let pplleftblock = document.querySelector('.ff__pplleftblock');

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
        //console.log(response);
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
    //console.log(response);
    let friend = response.response.items;
    for(let key in friend) {
      //console.log(friend[key].first_name);            
      let leftblockfriend = document.createElement('div');
      leftblockfriend.classList.add('ff__leftblockfriend');
      pplleftblock.appendChild(leftblockfriend);

      let frienddata = document.createElement('div');
      frienddata.classList.add('ff__frienddata');

      leftblockfriend.appendChild(frienddata);
      
      let img = document.createElement('img');
      img.src = friend[key].photo_100;
      img.style.height = '80%';
      img.style.marginLeft = '10px';
      img.style.borderRadius = '50%';
      frienddata.appendChild(img);

      let spanFienddata = document.createElement('span');
      frienddata.appendChild(spanFienddata);
      spanFienddata.innerText = `${friend[key].first_name} ${friend[key].last_name}`;
      spanFienddata.style.marginLeft = '20px';

      let friendadd = document.createElement('div');
      friendadd.classList.add('ff__friendadd');
      leftblockfriend.appendChild(friendadd);
      
      let spanFriendadd = document.createElement('span');      
      friendadd.appendChild(spanFriendadd);
      spanFriendadd.innerText = '+';
      
    }
  });