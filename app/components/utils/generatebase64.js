export function generateBase64(imagePath) {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  });
  reader.readAsDataURL(imagePath);
  return promise;
}
