document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const folderPath = "/public/tokyo ghoul/chapters/7/chap/"; // Путь к папке с изображениями
    const totalImages = 18; // Общее количество изображений
  
    for (let i = 1; i <= totalImages; i++) {
      const imageName = i.toString().padStart(3, "0") + ".jpg"; // Форматирование 001, 002 и т.д.
      const img = document.createElement("img");
      img.src = folderPath + imageName;
      img.alt = `Image ${imageName}`;
      gallery.appendChild(img);
    }
  });
  