export function api_key() {
  return (req: any, res: any, next: any) => {
    const apiKey = req.get("API-Key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
      res.status(401).json({ error: "Unauthorized." });
    } else {
      next();
    }
  };
}
