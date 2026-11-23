// Gera os ícones PNG do app (PWA + Android) a partir de assets/icon.svg.
// Uso: npm run icons
import sharp from "sharp";

const svg = "assets/icon.svg";
await sharp(svg).resize(192, 192).png().toFile("public/icons/icon-192.png");
await sharp(svg).resize(512, 512).png().toFile("public/icons/icon-512.png");
await sharp(svg).resize(1024, 1024).png().toFile("assets/icon-only.png");
console.log("Ícones gerados.");
