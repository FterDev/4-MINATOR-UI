import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";








const getProfilePicture = async (externalId: string) => {
    let error = false;

    let fileRef = await getDownloadURL(ref(storage, 'avatars/' + externalId + '.png')).catch((err) => {
        error = true;
    });

    if (!error) {
        return fileRef;
    }

    return await getDownloadURL(ref(storage, 'avatars/placeholder.webp'));
};







export { getProfilePicture };