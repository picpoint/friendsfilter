let findleft = document.querySelector('.ff__findleft').lastElementChild;                            // левое поле поиска
let findright = document.querySelector('.ff__findright').lastElementChild;                          // правое поле поиска
let leftblock = document.querySelector('.ff__pplleftblock');                                        // левый блок в котором осуществляется поиск
let rightblock = document.querySelector('.ff__pplrightblock');                                      // правый блок в котором осуществляется поиск


findleft.addEventListener('input', () => {                                                          // вешаем событие input на левое поле при вводе текста
  let findtext = findleft.value.toLowerCase();                                                      // переменной findtext присваиваем значение поля в нижнем регистре
  
  for(let i = 0; i < leftblock.children.length; i++) {                                              // пробегаемся по всем дочерним элементам блока
    let strName = leftblock.children[i].firstElementChild.lastChild.innerText.toLowerCase();        // в переменную strName присваиваем текст i-го элемента в нижнем регистре

    if(findtext == strName.substr(0, findtext.length)) {                                            // если введённый текст == подстроке блока с ФИО с 0 позиции до длинны вводимого текста
      leftblock.children[i].style = 'display: flex'                                                 // i-му дочернему блоку присваиваем 'display: flex'
    } else {
      leftblock.children[i].style = 'display: none'                                                 // все остальные блоки скрываем
    }
  }  

});


findright.addEventListener('input', () => {                                                         // аналогичные операции по поиску проделываем для правого поля 
  let findtext = findright.value.toLowerCase();
  
  for(let i = 0; i < rightblock.children.length; i++) {
    let strName = rightblock.children[i].firstElementChild.lastChild.innerText.toLowerCase();    

    if(findtext == strName.substr(0, findtext.length)) {
      rightblock.children[i].style = 'display: flex'
    } else {
      rightblock.children[i].style = 'display: none'
    }
  } 

});