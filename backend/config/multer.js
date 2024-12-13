import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
    { name: "carouselImage1", maxCount: 1 },
    { name: "carouselImage2", maxCount: 1 },
    { name: "carouselImage3", maxCount: 1 },
    { name: "memberImage", maxCount: 1 },
    { name: "eventsImage", maxCount: 1 }
]);

export default upload;
