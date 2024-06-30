const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
     this.field = field;
     this.playerRow = 0;
     this.playerColumn = 0;
     this.field[0][0] = characterHomePosition;
  }

  playGame(){
    let playing = true;
    while (playing = true){
      this.print();
      this.askQuestion();

      if (!this.inBounds()){
      console.log("Out of bounds! Game Over.");
      playing = false;
      break;
    }else if(this.inHole()){
      console.log("You're down a hole! Game Over.");
      playing = false;
      break;
    }else if(this.isHat()){
      console.log("You found the hat! Well done, game won!");
      playing = false;
      break;
    }
    this.field[this.playerRow][this.playerColumn] = pathCharacter;
    }
  }


  askQuestion() {
    const answer = prompt('Which way? ').toUpperCase();
    switch (answer) {
      case 'N':
        this.locationY -= 1;
        break;
      case 'S':
        this.locationY += 1;
        break;
      case 'W':
        this.locationX -= 1;
        break;
      case 'E':
        this.locationX += 1;
        break;
      default:
        console.log('Enter N(North), S(South), E(East), W(West).');
        this.askQuestion();
        break;
    }
  }

  inBounds(){
    return (
      this.playerRow >= 0 &&
      this.playerColumn >= 0 &&
      this.playerRow < this.field.length &&
      this.playerColumn < this.field[0].length
    );
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  inHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  print() {
    for (let row of this._field){
      console.log(row.join(' '));
    }
  
  static generateField(height, width, percentage){
    let newField = [];
    for (let i=0; i<height; i++){
      newField.push([]);
      for (let j=0, j<width; j++){
        newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    //Hat location:

    let hatRow = Math.floor(Math.random() * width);
    let hatColumn = Math.floor(Math.random() * height);
    //Randomise Hat starting location:
    while (hatRow === 0 && hatColumn === 0) {
      hatRow = Math.floor(Math.random() * width);
      hatColumn = Math.floor(Math.random() * height);
    }
    newField[hatColumn][hatRow] = hat;
    return newField; 
    }
  }
}
