const input = `##..####
.###....
#.###.##
#....#..
...#..#.
#.#...##
..#.#.#.
.##...#.`;



const smallSample = `.#.
..#
###`;

const small3d = [smallSample.split('\n').map(row => row.split(''))];
console.log(small3d);

function createInitial2dSlice(dimension) {
  const array = [];
  for (let i = 0; i < dimension; i++) {
    const innerArray = [];
    for (let j = 0; j < dimension; j++) {
      innerArray.push('.');
    }
    array.push(innerArray);
  }
  return array;
}

function addInitial2dSlices(matrix) {
  
}

small3d.unshift(createInitial2dSlice(3));
small3d.push(createInitial2dSlice(3));
console.log(small3d);

function countActiveNeighbors(x, y, z, matrix) {
  let counter = 0;
  for (let i = x-1; i < x+2; i++) {
    for (let j = y-1; j < y+2; j++) {
      for (let k = z-1; k < z+2; k++) {
        // console.log("i", i, "j", j, "k", k);
        if (i === x && j === y && k === z) {
          continue;
        }
        if (matrix[k] && matrix[k][j] && matrix[k][j][i] === '#') {
          console.log("i", i, "j", j, "k", k);
          counter++;
        }
      }
    }
  }
  return counter;
}

console.log(countActiveNeighbors(2, 2, 2, small3d));