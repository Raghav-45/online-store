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
  addressLine1: string
  city: string
  postalCode: string
  country: string
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
