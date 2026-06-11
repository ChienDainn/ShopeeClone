export class Product {
  constructor(name, price) {
    this.name = name
    this.price = price
  }

  getLabel() {
    return `${this.name}: ${this.price.toLocaleString('vi-VN')}đ`
  }
}
