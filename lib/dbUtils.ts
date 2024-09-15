import { db } from './firebaseClient'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

// interface PlaylistType {
//   name: string
//   description: string
//   image: string | null
//   price: number
//   contents: playlistContentType[]
// }
// type PlaylistTypeWithId = PlaylistType & { id: string }

// interface OrderType {
//   paymentId: string
//   orderId: string
//   productId: string
//   price: number
// }
// // type OrderTypeWithId = OrderType & { id: string }

// interface playlistContentType {
//   name: string
//   artist: string
//   image: string
//   videoId: string
// }

async function getAllProducts() {
  const data: ProductTypeWithId[] = []
  const q = collection(db, 'Products')
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // console.log(data)
    data.push({ id: doc.id, ...doc.data() } as ProductTypeWithId)
  })
  return data
}

async function getProductById(id: string) {
  const data: ProductTypeWithId[] = []
  const q = doc(db, 'Products', id)
  const docSnap = await getDoc(q)
  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    return { id: docSnap.id, ...docSnap.data() } as ProductTypeWithId
  } else {
    return null
  }
}

async function createProduct(
  name: string,
  description: string,
  image: string,
  price: number
) {
  const newProductObject = {
    name: name,
    description: description,
    image: image,
    price: price,
  }
  const playlistDocRef = await addDoc(
    collection(db, 'Products'),
    newProductObject
  )
  return playlistDocRef.id
}

async function createOrderHistory(
  paymentId: string,
  orderId: string,
  productId: string,
  price: number
) {
  const newProductObject = {
    paymentId: paymentId,
    orderId: orderId,
    productId: productId,
    price: price,
  }
  await setDoc(doc(db, 'Orders', paymentId), newProductObject)
}

async function getAllOrderHistory() {
  const data: OrderType[] = []
  const q = collection(db, 'Orders')
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // console.log(data)
    data.push({ ...doc.data() } as OrderType)
  })
  return data
}

async function addToPlaylist(
  playlistId: string,
  whatToAdd: playlistContentType
) {
  const playlistDocRef = doc(db, 'playlists', playlistId)
  await updateDoc(playlistDocRef, {
    contents: arrayUnion(whatToAdd),
  })
}

async function removeFromPlaylist(
  playlistId: string,
  whatToRemove: playlistContentType
) {
  const playlistDocRef = doc(db, 'playlists', playlistId)
  await updateDoc(playlistDocRef, {
    contents: arrayRemove(whatToRemove),
  })
}

async function deletePlaylist(playlistId: string) {
  await deleteDoc(doc(db, 'playlists', playlistId))
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  createOrderHistory,
  getAllOrderHistory,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
}
