import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

interface Location {
  name: string;
  category: string;
  description: string;
  price: number;
  climate: {
    bestTimeToVisit: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
}

const COLLECTION_NAME = "locations";
async function uploadImage(image: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("image", image);
  
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=3698a6f0074d84b56dd2635664233172`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error?.message || "Failed to upload image");
      }
  
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
  

export async function addLocation(locationData: Omit<Location, "images">, images: File[]): Promise<string> {
  try {
    const imageUrls = await Promise.all(images.map(uploadImage));
    const location = { ...locationData, images: imageUrls };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), location);
    return docRef.id;
  } catch (error) {
    console.error("Error adding location:", error);
    throw error;
  }
}

export async function updateLocation(
  id: string,
  locationData: Partial<Omit<Location, "images">>,
  newImages?: File[]
): Promise<void> {
  try {
    const locationRef = doc(db, COLLECTION_NAME, id);
    const locationDoc = await getDoc(locationRef);

    if (!locationDoc.exists()) {
      throw new Error("Location not found");
    }

    const updateData: Partial<Location> = { ...locationData };

    if (newImages && newImages.length > 0) {
      const newImageUrls = await Promise.all(newImages.map(uploadImage));
      updateData.images = [...locationDoc.data().images, ...newImageUrls];
    }

    await updateDoc(locationRef, updateData);
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
}

export async function deleteLocation(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting location:", error);
    throw error;
  }
}

export async function getLocation(id: string): Promise<Location & { id: string }> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Location not found");
    }

    return { id: docSnap.id, ...docSnap.data() } as Location & { id: string };
  } catch (error) {
    console.error("Error getting location:", error);
    throw error;
  }
}

export async function getAllLocations(): Promise<Array<Location & { id: string }>> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<Location & { id: string }>;
  } catch (error) {
    console.error("Error getting all locations:", error);
    throw error;
  }
}