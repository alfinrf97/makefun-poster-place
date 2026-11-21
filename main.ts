// AURELIA — City of Glass Tides
// Entry program for "The Poster for a Place That Isn't There".
// The poster artwork ships in this repository as entry.png. This program
// checks that the artwork meets the competition gate (a whole PNG, exactly
// 1024 by 1024 pixels, at most 1,048,576 bytes) and writes it to
// /output/entry.png. It performs no network access and no image editing:
// the file that is validated is the file that is copied, byte for byte.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

// The eight-byte PNG signature every valid PNG file starts with.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputPath = join("/output", "entry.png");

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const size = statSync(sourcePath).size;
if (size > MAX_BYTES) {
  fail(`entry.png is ${size} bytes, over the ${MAX_BYTES} byte limit`);
}

const bytes = readFileSync(sourcePath);
if (bytes.length < 33 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  fail("entry.png does not start with the PNG signature");
}

// The IHDR chunk follows the signature: 4 bytes length, 4 bytes "IHDR",
// then width and height as 4-byte big-endian integers.
if (bytes.toString("ascii", 12, 16) !== "IHDR") {
  fail("entry.png has no IHDR chunk where one is expected");
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  fail(`entry.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
}

// A whole PNG ends with the IEND chunk: 4 zero length bytes, the letters
// "IEND", and its CRC. Anything after it means the file is not one image.
const IEND_TAIL = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44]);
if (!bytes.subarray(bytes.length - 12, bytes.length - 4).equals(IEND_TAIL)) {
  fail("entry.png does not end with a complete IEND chunk");
}

const sha256 = createHash("sha256").update(bytes).digest("hex");

mkdirSync("/output", { recursive: true });
copyFileSync(sourcePath, outputPath);

console.log(`AURELIA: wrote ${outputPath} (${width}x${height}, ${size} bytes, sha256 ${sha256})`);
