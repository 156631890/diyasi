import { proxyPublicPost } from "@/lib/public-api-proxy";
export async function POST(request: Request) {
  return proxyPublicPost(request, "/analytics/events");
}
