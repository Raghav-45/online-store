import { db } from './firebaseClient'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

interface PlaylistType {
  name: string
  description: string
  image: string | null
  price: number
  contents: playlistContentType[]
}

type PlaylistTypeWithId = PlaylistType & { id: string }

interface playlistContentType {
  name: string
  artist: string
  image: string
  videoId: string
}

async function getAllProducts() {
  const data: PlaylistTypeWithId[] = []
  const q = collection(db, 'Products')
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    console.log(data)
    data.push({ id: doc.id, ...doc.data() } as PlaylistTypeWithId)
  })
  return data
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
  type PlaylistType,
  type PlaylistTypeWithId,
  type playlistContentType,
  getAllProducts,
  createProduct,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
}
