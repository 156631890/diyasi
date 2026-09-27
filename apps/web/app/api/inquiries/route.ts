import { proxyPublicPost } from "@/lib/public-api-proxy";
import { saveInquiry } from "@/lib/inquiry-store";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  if (process.env.BLOB_READ_WRITE_TOKEN) return saveInquiry(request);
  return proxyPublicPost(request, "/inquiries/");
}
