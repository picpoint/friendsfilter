let findleft = document.querySelector('.ff__findleft').lastElementChild;
let leftblock = document.querySelector('.ff__pplleftblock');

console.log(findleft);
console.log(leftblock);

findleft.addEventListener('input', () => {
  console.log(findleft.value);  

  for(let i = 0; i < leftblock.children.length; i++) {
    console.log(leftblock.children[i]);
    if(leftblock.children[i].firstElementChild.lastElementChild.innerText != findleft.value) {
      leftblock.children[i].style = 'display: none';
    } else {
      leftblock.children[i].style = 'display: flex';
    }
  }
  

});