let btn = document.querySelector('.ff__saveblock').firstElementChild;                                   // доступ к кнопке "сохранить"
let lftblock = document.querySelector('.ff__pplleftblock');                                             // доступ к левому блоку
let rghtblock = document.querySelector('.ff__pplrightblock');                                           // доступ к правому блоку


window.addEventListener('load', () => {                                                                 // событие загрузки страницы  
  setTimeout(() => {                                                                                    // устанавливаем таймер на 3 сек
    for(let x = 0; x < lftblock.children.length; x++) {                                                 // перебираем левый блок
      let cookieValue = lftblock.children[x].getAttribute('id');                                        // в переменную cookieValue записываем значение id блока
      document.cookie = `LeftBlocks${cookieValue}=-1; path=/; expires=`;                                // в куки левого блока, если они были раньше пишем -1      

      if(rghtblock.children.length == 0) {                                                              // если rghtblock пуст
        document.cookie = `RightBlocks${cookieValue}=-1; path=/; expires=`;                             // в куки правого блока пишем -1
      }
    }
  
    for(let z = 0; z < rghtblock.children.length; z++) {                                                // перебираем правый блок
      let cookieValue = rghtblock.children[z].getAttribute('id');                                       // получаем значение id элемента 
      document.cookie = `RightBlocks${cookieValue}=-1; path=/; expires=`;                               // в куки правого блока пишем -1
    }    

  }, 3000);                                                                                             // делаем эту всю процедуру, чтобы старые куки
});                                                                                                     // перезаписывались -1 и было понятно какие куки старые а какие нет




btn.addEventListener('click', () => {                                                                   // событие по нажатию кнопки
  for(let x = 0; x < lftblock.children.length; x++) {                                                   // перебираем левый блок
    let cookieValue = lftblock.children[x].getAttribute('id');                                          // получаем значение id левого блока
    document.cookie = `LeftBlocks${cookieValue}=${cookieValue}; path=/; expires=` + setTimeLiveCookie();// в куки пишем значение LeftBlocksid=id чтобы знать к какому блоку она относится
  }                                                                                                     // и устанавливаем путь и время жизни из ф-ии setTimeLiveCookie();

  for(let z = 0; z < rghtblock.children.length; z++) {                                                  // перебираем правый блок
    let cookieValue = rghtblock.children[z].getAttribute('id');                                         // получаем значение id правого блока
    document.cookie = `RightBlocks${cookieValue}=${cookieValue}; path=/; expires=` + setTimeLiveCookie();// в куки пишем значение RightBlocksid=id чтобы знать к какому блоку она относится
  }                                                                                                     // и устанавливаем путь и время жизни из ф-ии setTimeLiveCookie();
});




function setTimeLiveCookie() {                                                                          // ф-ия устанавливающая время жизни для кук
  let tm = new Date();                                                                                  // определяем текущую дату и время
  let timeLive = tm.getTime() * 60 * 60 * 24 * 7 * 1000;                                                // получаем время * 60 сек * 60 мин * 24 часа * 7 дней * 1000мл/сек
  return timeLive;
}


