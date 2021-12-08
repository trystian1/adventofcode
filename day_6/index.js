const days = 18;
const list = "2,4,1,5,1,3,1,1,5,2,2,5,4,2,1,2,5,3,2,4,1,3,5,3,1,3,1,3,5,4,1,1,1,1,5,1,2,5,5,5,2,3,4,1,1,1,2,1,4,1,3,2,1,4,3,1,4,1,5,4,5,1,4,1,2,2,3,1,1,1,2,5,1,1,1,2,1,1,2,2,1,4,3,3,1,1,1,2,1,2,5,4,1,4,3,1,5,5,1,3,1,5,1,5,2,4,5,1,2,1,1,5,4,1,1,4,5,3,1,4,5,1,3,2,2,1,1,1,4,5,2,2,5,1,4,5,2,1,1,5,3,1,1,1,3,1,2,3,3,1,4,3,1,2,3,1,4,2,1,2,5,4,2,5,4,1,1,2,1,2,4,3,3,1,1,5,1,1,1,1,1,3,1,4,1,4,1,2,3,5,1,2,5,4,5,4,1,3,1,4,3,1,2,2,2,1,5,1,1,1,3,2,1,3,5,2,1,1,4,4,3,5,3,5,1,4,3,1,3,5,1,3,4,1,2,5,2,1,5,4,3,4,1,3,3,5,1,1,3,5,3,3,4,3,5,5,1,4,1,1,3,5,5,1,5,4,4,1,3,1,1,1,1,3,2,1,2,3,1,5,1,1,1,4,3,1,1,1,1,1,1,1,1,1,2,1,1,2,5,3"
let fishies = list.split(',');
let objectFish = {};
let killed0s = 0;
const calculateNFish = () => {
  return Object.values(objectFish).reduce((accu, curr) => accu + curr);
}

const lifeCycle = () => {

  for(let i = 0; i < 9; i++) {
    objectFish[i] = 0;
  }

  fishies.forEach(fish => {
    objectFish[fish]++;
  })

  for(let i=1; i <= 256; i++) {
    fishies = fishiesLifecycle();
  }
  console.log(calculateNFish());
}

const fishiesLifecycle = () => {
  const zeros = objectFish['0'];
  for(let i = 0; i < 8; i++) {
    objectFish[i] = objectFish[i + 1];
  }
  objectFish['8'] = zeros;
  objectFish['6'] += zeros;

}


lifeCycle();