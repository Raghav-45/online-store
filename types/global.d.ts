declare interface Window {
  Razorpay: any
}


declare interface PlaylistType {
  name: string
  description: string
  image: string | null
  price: number
  contents: playlistContentType[]
}
declare type PlaylistTypeWithId = PlaylistType & { id: string }

declare interface OrderType {
  paymentId: string
  orderId: string
  productId: string
  price: number
}
// type OrderTypeWithId = OrderType & { id: string }

declare interface playlistContentType {
  name: string
  artist: string
  image: string
  videoId: string
}