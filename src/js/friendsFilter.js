let headerInfo = document.querySelector('.ff__selecthdr').firstElementChild;          	// заголовок формы
let pplleftblock = document.querySelector('.ff__pplleftblock');	                      	// левая часть формы где друзья
let pplrightblock = document.querySelector('.ff__pplrightblock');                       // правая часть формы куда добавляются друзья
let leftarr = [];                                                                       // определяем массив левого блока    
let rightarr = [];                                                                      // определяем массив правого блока


new Promise((resolve) => {	                                                          	// создаём промис
  window.addEventListener('load', () => {		                                            // по событию загрузки страницы разрешаем промис
    resolve();
  });  
})
  .then(() => {		                                                                      // тогда 
    return new Promise((resolve, reject) => {		                                        // новый промис
      VK.init({		                                                                      // инициализируем вк по определённому ID
        apiId: 7250280
      });

      VK.Auth.login((response) => {		                                                  // авторизуемся
        //console.log(response);
        if(response.session) {                                                          // если прошла авторизация и сессия доступна
          resolve(response);                                                            // резолвим ответ          
        } else {
          reject(new Error(`***ERR TO AUTHORIZ***`));                                   // иначе ошибка авторизации
        }
      }, 2);	                                                                          // 2 - это передаваймый параметр, указывающий что нужен доступ к списку друзей
      
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {	                                          // тогда возвращаем новый промис
      VK.api('users.get', {v: '5.8', name_case: 'gen'}, (response) => {	                // указываем версию апи и передача имени в родительном падеже
        //console.log(response);
        if(response.error) {                                                            // если промис не разрешился
          reject(new Error(response.error.error_msg));                                  // реджектим
        } else {
          headerInfo.textContent = `Друзья ${response.response[0].first_name} ${response.response[0].last_name}`; // иначе в шапку формы загружаем имя, фамилию
          resolve(response);                                                            // резолвим ответ
        }
      });
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {                                            // возвращаем новый промис
      VK.api('friends.get', {v: '5.8', fields: 'photo_100'}, (response) => {             // передаём параметры для выгрузки фото 
        if(response.error) {                                                             // если ошибка ответа
          reject(new Error(response.error.error_msg));                                   // реджектим ответ  
        } else {
          resolve(response);                                                             // иначе респонсим ответ
        }
      });
    });
  })
  .then((response) => {                                                                  // читаем ответ    
    let friend = response.response.items;                                                // в переменную передаём объекты друзей                       
    let countId = 0;                                                                     // определяем счётчик id(нужен для работы скрипта saveLists.js)

    for(let key in friend) {                                                             // перебираем все объекты            
      let leftblockfriend = document.createElement('div');                               // создаём див для помещения туда инфы о друге            
      leftblockfriend.classList.add('ff__leftblockfriend');                              // добавляем класс этому диву для применение стилей
      leftblockfriend.setAttribute("id", countId++);                                     // каждому блоку добавляем id со значением id++
      pplleftblock.appendChild(leftblockfriend);                                         // добавляем данный див в левый блок с друзьями

      let frienddata = document.createElement('div');                                    // создаём див для картинки и фио друга            
      frienddata.classList.add('ff__frienddata');                                        // добавляем класс для применения стилей
      leftblockfriend.appendChild(frienddata);                                           // добавляем в блок leftblockfriend данный див с картинкой и фио друга
      
      let img = document.createElement('img');                                           // создаём img  
      img.src = friend[key].photo_100;                                                   // источнику присваиваем ссылку на картинку из вк
      img.style.height = '80%';                                                          // указываем высоту картинки
      img.style.marginLeft = '10px';                                                     // указываем отступ слева
      img.style.borderRadius = '50%';                                                    // указываем радиус закругления
      frienddata.appendChild(img);                                                       // добавляем в родительский блок данную картинку

      let spanFienddata = document.createElement('span');                                // создаём span
      frienddata.appendChild(spanFienddata);                                             // добавляем спан в блок
      spanFienddata.innerText = `${friend[key].first_name} ${friend[key].last_name}`;    // в спам добавляем имя, фамилию
      spanFienddata.style.marginLeft = '20px';                                           // добавляем спану отступ слева  

      let friendadd = document.createElement('div');                                     // создаём див который будет содержать символ "+"
      friendadd.classList.add('ff__friendadd');                                          // добавляем класс для применения стилей
      leftblockfriend.appendChild(friendadd);                                            // данный див вставляем в родительский блок
      
      let spanFriendadd = document.createElement('span');                                // создаём спан 
      friendadd.appendChild(spanFriendadd);                                              // добавляем спан в родительский блок
      spanFriendadd.innerText = '+';                                                     // вставляем текст "+"                       
            
      if(leftblockfriend) {                                                              // если создаётся див
        leftarr.push(leftblockfriend);                                                   // в массив leftarr пушим данный див с его содержимым
      }
    }
   
    
    for(let x = 0; x < leftarr.length; x++) {                                            // перебираем leftarr массив
      leftarr[x].lastElementChild.children[0].addEventListener('click', (e) => {         // вешаем событие клик по дочернему крестику блока                
        rightarr.push(leftarr[x]);                                                       // в массив rightarr пушим блок в котором произошло событие                       
        pplleftblock.removeChild(leftarr[x]);                                            // при клике на крестик полностью удаляем родительский блок из массива                        

        for(let z = 0; z < rightarr.length; z++) {                                       // перебираем правый массив rightarr
          rightarr[z].classList.remove('ff__leftblockfriend');                           // удаляем класс ff__leftblockfriend
          rightarr[z].classList.add('ff__rightblockfriend');                             // назначаем новый класс ff__rightblockfriend
          pplrightblock.appendChild(rightarr[z]);                                        // в правый блок добавляем z-й элемент из массива                              
        }                

      });      
      
    }         
    

  });