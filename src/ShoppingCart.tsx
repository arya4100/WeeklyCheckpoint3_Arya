/**
 * ShoppingCart.tsx
 * Task 04 - UI class. Shows each stationery item with a checkbox and a quantity
 * drop down. "Display Total Cost" shows the selected items and total; after that
 * the total is recalculated whenever the selection or a quantity changes.
 */
import { Component } from 'react'
import type { ChangeEvent } from 'react'
import type { CartComponent } from './cart/CartComponent'
import { BaseCart } from './cart/BaseCart'
import { ExerciseBooks } from './cart/ExerciseBooks'
import { Pens } from './cart/Pens'
import { Pencils } from './cart/Pencils'
import { Sharpener } from './cart/Sharpener'
import { GlueSticks } from './cart/GlueSticks'

/** Describes one shop item and how to wrap a cart with its decorator. */
interface ShopItem {
  id: string
  label: string
  icon: string
  price: number // unit price, read from the item's own class
  decorate: (cart: CartComponent, quantity: number) => CartComponent
}

const ITEMS: ShopItem[] = [
  { id: 'exerciseBooks', label: 'Exercise Book', icon: '📒', price: ExerciseBooks.PRICE, decorate: (c, q) => new ExerciseBooks(c, q) },
  { id: 'pens', label: 'Pens', icon: '🖊️', price: Pens.PRICE, decorate: (c, q) => new Pens(c, q) },
  { id: 'pencils', label: 'Pencils', icon: '✏️', price: Pencils.PRICE, decorate: (c, q) => new Pencils(c, q) },
  { id: 'sharpener', label: 'Sharpener', icon: '🔧', price: Sharpener.PRICE, decorate: (c, q) => new Sharpener(c, q) },
  { id: 'glueSticks', label: 'Glue Sticks', icon: '🧴', price: GlueSticks.PRICE, decorate: (c, q) => new GlueSticks(c, q) },
]

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

interface CartState {
  selected: Record<string, boolean> // checkbox state per item id
  quantities: Record<string, number> // chosen quantity per item id
  showTotal: boolean // true after the button has been clicked
  totalCost: number
}

export default class ShoppingCart extends Component<object, CartState> {
  state: CartState = {
    selected: {},
    quantities: Object.fromEntries(ITEMS.map((i) => [i.id, 1])),
    showTotal: false,
    totalCost: 0,
  }

  /** Lifecycle: runs once after the first render. */
  componentDidMount(): void {
    document.title = 'Shopping Cart Example'
  }

  /** Lifecycle: runs after every update; recalculates the total when the selection changes. */
  componentDidUpdate(_prevProps: object, prevState: CartState): void {
    const changed =
      prevState.selected !== this.state.selected ||
      prevState.quantities !== this.state.quantities ||
      prevState.showTotal !== this.state.showTotal

    if (this.state.showTotal && changed) {
      const total = this.calculateTotal()
      if (total !== this.state.totalCost) {
        this.setState({ totalCost: total })
      }
    }
  }

  /** Lifecycle: runs before the component is removed. */
  componentWillUnmount(): void {
    document.title = 'Vite App'
  }

  /** Builds the decorator chain for the selected items and returns its cost. */
  calculateTotal(): number {
    let cart: CartComponent = new BaseCart()
    for (const item of ITEMS) {
      if (this.state.selected[item.id]) {
        cart = item.decorate(cart, this.state.quantities[item.id])
      }
    }
    return cart.getTotalCost()
  }

  /** Cost of one line (price x quantity), calculated with that item's decorator. */
  lineCost(item: ShopItem): number {
    return item.decorate(new BaseCart(), this.state.quantities[item.id]).getTotalCost()
  }

  /** Resets every checkbox and quantity. componentDidUpdate then refreshes the total. */
  handleClear = (): void => {
    this.setState({
      selected: {},
      quantities: Object.fromEntries(ITEMS.map((i) => [i.id, 1])),
    })
  }

  handleCheck = (id: string, e: ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked
    this.setState((s) => ({ selected: { ...s.selected, [id]: checked } }))
  }

  handleQuantity = (id: string, e: ChangeEvent<HTMLSelectElement>): void => {
    const quantity = Number(e.target.value)
    this.setState((s) => ({ quantities: { ...s.quantities, [id]: quantity } }))
  }

  handleDisplay = (): void => {
    this.setState({ showTotal: true, totalCost: this.calculateTotal() })
  }

  render() {
    const { selected, quantities, showTotal, totalCost } = this.state
    const chosen = ITEMS.filter((i) => selected[i.id])
    const itemCount = chosen.reduce((n, i) => n + quantities[i.id], 0)

    return (
      <div className="cart">
        <h2>🛒 Shopping Cart Example</h2>
        <p className="subtitle">Stationery Shop – prices in NZD</p>

        <div className="actions">
          <button className="btn primary" onClick={this.handleDisplay}>
            Display Total Cost
          </button>
          <button className="btn" onClick={this.handleClear} disabled={chosen.length === 0}>
            Clear All
          </button>
        </div>
        <p className="counter">
          {chosen.length} item type(s) selected · {itemCount} item(s) in total
        </p>

        {ITEMS.map((item) => (
          <div className={selected[item.id] ? 'row active' : 'row'} key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              checked={!!selected[item.id]}
              onChange={(e) => this.handleCheck(item.id, e)}
            />
            <label htmlFor={item.id}>
              <span className="icon">{item.icon}</span> {item.label}
              <span className="price">${item.price} each</span>
            </label>
            <select
              value={quantities[item.id]}
              onChange={(e) => this.handleQuantity(item.id, e)}
            >
              {QUANTITIES.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            <span className="line">{selected[item.id] ? `$${this.lineCost(item)}` : ''}</span>
          </div>
        ))}

        {showTotal && (
          <div className="result">
            <h3>Selected Items:</h3>
            {chosen.length === 0 && <p className="empty">No items selected.</p>}
            {chosen.map((i) => (
              <p key={i.id}>
                {i.label} - Quantity: {quantities[i.id]}
                <span className="line-total"> (${this.lineCost(i)})</span>
              </p>
            ))}
            <p className="total">Total Cost is : {totalCost}</p>
          </div>
        )}
      </div>
    )
  }
}
