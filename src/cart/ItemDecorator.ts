/**
 * ItemDecorator.ts
 * Abstract decorator: holds the cart being wrapped and the chosen quantity.
 * Each stationery class extends this and adds its own cost in getTotalCost().
 */
import type { CartComponent } from './CartComponent'

export abstract class ItemDecorator implements CartComponent {
  protected wrapped: CartComponent // the cart (or decorator) being wrapped
  protected quantity: number // quantity selected in the drop down

  constructor(wrapped: CartComponent, quantity: number) {
    this.wrapped = wrapped
    this.quantity = quantity
  }

  abstract getTotalCost(): number
}
