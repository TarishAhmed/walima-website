import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config.js';

export async function submitRSVP({ name, attending, guests }) {
  const docRef = await addDoc(collection(db, 'rsvps'), {
    name,
    attending,
    guests: attending ? guests : 0,
    timestamp: serverTimestamp(),
  });
  return docRef.id;
}
