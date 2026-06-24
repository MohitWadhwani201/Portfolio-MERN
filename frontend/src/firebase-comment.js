import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const commentsRef = collection(db, "comments");

// --------------------
// Cloudinary Upload
// --------------------
async function uploadImageToCloudinary(imageFile) {
  if (!imageFile) return null;

  const formData = new FormData();
  formData.append("file", imageFile);

  // replace these values
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();

  return data.secure_url;
}

// --------------------
// Add Comment
// --------------------
async function addComment(name, message, imageFile = null) {
  try {
    let profileImage = null;

    if (imageFile) {
      profileImage = await uploadImageToCloudinary(imageFile);
    }

    const docRef = await addDoc(commentsRef, {
      name,
      message,
      profileImage,
      createdAt: new Date(),
    });

    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
    throw e;
  }
}

// --------------------
// Fetch Comments
// --------------------
async function fetchComments() {
  try {
    const snapshot = await getDocs(commentsRef);

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        userName: data.name,
        content: data.message,
        profileImage: data.profileImage || null,
        createdAt: data.createdAt,
      };
    });
  } catch (e) {
    console.error("Error fetching comments:", e);
    return [];
  }
}

export { addComment, fetchComments };