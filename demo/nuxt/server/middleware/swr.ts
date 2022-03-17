import type { IncomingMessage, ServerResponse } from "http"

export default (_req: IncomingMessage, res: ServerResponse, next: () => void) => {
  // cache for 2 mins (120 seconds)
  res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate")
  next()
}
