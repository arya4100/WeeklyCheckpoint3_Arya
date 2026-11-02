/**
 * CartComponent.ts
 * Task 02 - Common interface for every class in the decorator chain.
 * Both the base cart and every stationery item (decorator) implement it,
 * so they can be wrapped inside each other and treated in the same way.
 */
export interface CartComponent {
  /** Returns the total cost (in NZD) of this component plus everything it wraps. */
  getTotalCost(): number
}
