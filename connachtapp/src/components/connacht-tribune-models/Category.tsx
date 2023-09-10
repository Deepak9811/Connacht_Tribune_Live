export class Category {
  id: number;
  name: string;

  constructor(json) {
    this.id = json.id;
    this.name = json.name;
  }
}
