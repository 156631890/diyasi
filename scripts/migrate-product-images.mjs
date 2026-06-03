import { mkdir, readFile, stat, writeFile } from "fs/promises";
import path from "path";

const root = process.cwd();
const dataPath = path.join(root, "data", "alibaba-products.json");
const publicProductsDir = path.join(root, "apps", "web", "public", "media", "products");
const publicPrefix = "/media/products";
const maxImagesPerProduct = Number(process.env.MAX_IMAGES_PER_PRODUCT || "4");
const concurrency = Number(process.env.IMAGE_DOWNLOAD_CONCURRENCY || "8");

function safeSegment(value) {
  return String(value || "product")
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "product";
}

function extensionFromContentType(contentType, url) {
  const lower = String(contentType || "").toLowerCase();
  if (lower.includes("png")) return ".png";
  if (lower.includes("webp")) return ".webp";
  if (lower.includes("gif")) return ".gif";
  const pathname = new URL(url).pathname.toLowerCase();
  const ext = path.extname(pathname);
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  return ".jpg";
}

async function exists(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile() && info.size > 0;
  } catch {
    return false;
  }
}

async function downloadImage(url, fileBasePath) {
  if (!/^https?:\/\//i.test(url)) {
    return null;
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType && !contentType.toLowerCase().includes("image")) {
    throw new Error(`Unexpected content type ${contentType}`);
  }

  const ext = extensionFromContentType(contentType, url);
  const targetPath = `${fileBasePath}${ext}`;
  if (await exists(targetPath)) {
    return targetPath;
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1024) {
    throw new Error("Downloaded file is too small");
  }
  await writeFile(targetPath, bytes);
  return targetPath;
}

async function worker(queue, results) {
  while (queue.length > 0) {
    const task = queue.shift();
    try {
      const targetPath = await downloadImage(task.url, task.fileBasePath);
      if (targetPath) {
        results.set(task.key, {
          localPath: `${publicPrefix}/${task.productDir}/${path.basename(targetPath)}`,
          sourceUrl: task.url
        });
      }
      process.stdout.write(".");
    } catch (error) {
      results.set(task.key, {
        localPath: null,
        sourceUrl: task.url,
        error: error instanceof Error ? error.message : String(error)
      });
      process.stdout.write("x");
    }
  }
}

const products = JSON.parse(await readFile(dataPath, "utf8"));
const tasks = [];

for (const product of products) {
  const productDir = safeSegment(product.product_id || product.model_number);
  const productPath = path.join(publicProductsDir, productDir);
  await mkdir(productPath, { recursive: true });

  const images = [
    product.image_url,
    ...(Array.isArray(product.gallery_images) ? product.gallery_images : [])
  ].filter(Boolean);
  const uniqueImages = [...new Set(images)].slice(0, maxImagesPerProduct);

  uniqueImages.forEach((url, index) => {
    tasks.push({
      key: `${product.product_id}:${index}`,
      productId: product.product_id,
      productDir,
      index,
      url,
      fileBasePath: path.join(productPath, `image-${index + 1}`)
    });
  });
}

const results = new Map();
const queue = [...tasks];
console.log(`Migrating ${tasks.length} images for ${products.length} products...`);
await Promise.all(Array.from({ length: concurrency }, () => worker(queue, results)));
console.log("");

let productsWithPrimary = 0;
let downloaded = 0;
let failed = 0;

for (const product of products) {
  const localImages = [];
  for (let index = 0; index < maxImagesPerProduct; index += 1) {
    const result = results.get(`${product.product_id}:${index}`);
    if (result?.localPath) {
      localImages.push(result.localPath);
      downloaded += 1;
    } else if (result?.error) {
      failed += 1;
    }
  }

  if (localImages.length > 0) {
    product.image_url = localImages[0];
    product.gallery_images = localImages;
    productsWithPrimary += 1;
  }
}

await writeFile(dataPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");

console.log(
  JSON.stringify(
    {
      products: products.length,
      tasks: tasks.length,
      downloaded,
      failed,
      productsWithPrimary,
      maxImagesPerProduct
    },
    null,
    2
  )
);
