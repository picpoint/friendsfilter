let btn = document.querySelector('.ff__saveblock').firstElementChild;
let lftblock = document.querySelector('.ff__pplleftblock');
let rghtblock = document.querySelector('.ff__pplrightblock');


window.addEventListener('load', () => {  
  console.log('event load is completed');

  setTimeout(() => {
    for(let x = 0; x < lftblock.children.length; x++) {    
      let cookieValue = lftblock.children[x].getAttribute('id');        
      document.cookie = `LeftBlocks${cookieValue}=-1; path=/; expires=`;         
    }
  
    for(let z = 0; z < rghtblock.children.length; z++) {
      let cookieValue = rghtblock.children[z].getAttribute('id');        
      document.cookie = `RightBlocks${cookieValue}=-1; path=/; expires=`;         
    }
  }, 3000);  
  
});



btn.addEventListener('click', () => {  
  console.log(lftblock);
  console.log(rghtblock);
  console.log('------------');

  for(let x = 0; x < lftblock.children.length; x++) {    
    let cookieValue = lftblock.children[x].getAttribute('id');        
    document.cookie = `LeftBlocks${cookieValue}=${cookieValue}; path=/; expires=`;         
  }

  for(let z = 0; z < rghtblock.children.length; z++) {
    let cookieValue = rghtblock.children[z].getAttribute('id');        
    document.cookie = `RightBlocks${cookieValue}=${cookieValue}; path=/; expires=`;         
  }
  
});


// дописать ф-ию определяющую время жизни кук
function endLiveTime() {
  return -1;
}

// console.log(endLiveTime());