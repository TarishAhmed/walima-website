import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './config.js';

export async function fetchGalleryImages() {
  const galleryRef = ref(storage, 'gallery/');
  const result = await listAll(galleryRef);
  const urls = await Promise.all(
    result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { name: itemRef.name, url };
    })
  );
  return urls;
}
