let wdth = document.documentElement.clientWidth;                       // определяем ширину документа
let hght = document.documentElement.clientHeight;                      // определяем высоту документа
let snowblock = document.querySelector('.snowblock__wrap');            // выбор сеоектора wrap 


function snows() {                                                     // ф-ия снежинка
  let img = document.createElement('img');                             // создаём img 
  img.src = '../pict/snejinka.png';                                    // в src определяем картинку снежинки
  img.style.width = '25px';                                            // назначаем ширину картинки
  img.style.height = '25px';                                           // назначаем высоту картинки

  snowblock.appendChild(img);                                          // добавляем картинку в родителя .snowblock__wrap

  let startX = Math.floor(Math.random() * wdth);                       // генерим позицию Х от 0 до ширины документа
  let startY = Math.floor(Math.random() * hght);                       // генерим позицию Y от 0 до высоты документа

  img.style.position = 'absolute';                                     // назначаем позиционирование
  img.style.top = startX + 'px';                                       // присваиваем сгенерированное значение позоции относительно верхнего уровня документа
  img.style.left = startY + 'px';                                      // присваиваем сгенерированное значение позоции относительно левого уровня документа
  densitySnow = Math.floor((wdth + hght) / 100);                       // расчитываем плотность снежинок относительно размеров окна

  console.log(`document width - ${wdth}`);
  console.log(`document height - ${hght}`);
  console.log(`startX - ${startX}`);
  console.log(`startY - ${startY}`);
  console.log(`Density snow - ${densitySnow}`);

}

snows();




