import sharp from "sharp";
import fs from "node:fs";

const avatar = "public/profile/avatar.png";
const jobs = [
  [avatar, "src/app/apple-icon.png", 180],
  [avatar, "public/icons/icon-192.png", 192],
  [avatar, "public/icons/icon-512.png", 512],
];

fs.mkdirSync("public/icons", { recursive: true });
for (const [src, dest, size] of jobs) {
  await sharp(src).resize(size, size, { fit: "cover" }).png().toFile(dest);
  console.log("wrote", dest);
}
const png = await sharp(avatar).resize(256, 256, { fit: "cover" }).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(0, 0);
entry.writeUInt8(0, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png.length, 8);
entry.writeUInt32LE(22, 12);
fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, entry, png]));
console.log("wrote src/app/favicon.ico");
