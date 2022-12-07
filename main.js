// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
};

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memorey-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
//Add order Css property to Game block
blocks.forEach((block, index) => {
  // add css order porpety
  block.style.order = orderRange[index];
  // add event  click
  block.addEventListener("click", function () {
    //triggering the flipp  block
    flipBlock(block);
  });
});

//flip blpck function

function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");

  //collect all flipped cards

  let allFlippedBlocks = blocks.filter((flippedBlocks) =>
    flippedBlocks.classList.contains("is-flipped")
  );
  // if  thers two selected blocks
  if (allFlippedBlocks.length === 2) {
    //stp clicking function
    stopClicking();
    // check matched block
    checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
  }
}

//a function to add class no-clicking
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  // remove class no clicking after one secod
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    if(triesElement.innerHTML >= 10){

      alert(`sorry you do 10 wrong tries try again later`)
      location.reload();

    }

      setTimeout(() => {
        
    firstBlock.classList.remove("is-flipped")
    secondBlock.classList.remove("is-flipped")
      }, duration);

  }
}

//shuffling function

function shuffle(array) {
  //seting variables
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    //get rondom number
    random = Math.floor(Math.random() * current);
    //decrease lenth by one
    current--;

    //[1] save current element in stash
    temp = array[current];
    //[2] current element = rondom element
    array[current] = array[random];
    //[3] random element = elemnt in stash
    array[random] = temp;
  }
  return array;
}
