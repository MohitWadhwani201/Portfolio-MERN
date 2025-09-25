import { db } from './firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; // <-- Add getDocs here

// Reference to the collection
const commentsRef = collection(db, 'comments');

async function addComment(name, message) {
  try {
    const docRef = await addDoc(commentsRef, {
      name,
      message,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Fetch all comments
async function fetchComments() {
  try {
    const snapshot = await getDocs(commentsRef);
    const comments = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userName: data.name,          // map to frontend key
        content: data.message,        // map to frontend key
        profileImage: data.profileImage || null,
        createdAt: data.createdAt
      };
    });
    return comments;
  } catch (e) {
    console.error("Error fetching comments: ", e);
  }
}


export { addComment, fetchComments };
