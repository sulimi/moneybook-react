let id = 0;

class Id {
  value: number;

  constructor() {
    id++;
    this.value = id;
  }
}

export {Id};