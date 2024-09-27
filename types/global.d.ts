declare interface Window {
  Razorpay: any
}

declare interface ProductType {
  name: string
  description: string
  image: string | null
  price: number
}
declare type ProductTypeWithId = ProductType & { id: string }

interface ShippingAddressType {
  fullName: string
  Contact: string
  addressLine1: string // House No.
  addressLine2: string // Road Name
  nearby: string // Nearby
  state: string
  city: string
  postalCode: string
}

type orderStatusType = 'New' | 'shipping' | 'completed' | 'cancelled'

declare interface OrderType {
  paymentId: string
  orderId: string
  productId: string
  productName: string
  shippingAddress: ShippingAddressType
  status: orderStatusType
  orderDate: firebase.firestore.Timestamp
  deliveryDate: null | firebase.firestore.Timestamp
  price: number
}
// type OrderTypeWithId = OrderType & { id: string }
