const http = require("http");

const server = http.createServer((req, res) => {
  // Set HTTP-only cookie
  res.setHeader("Set-Cookie", [
    "httpOnlyCookie=value1; HttpOnly",
    "secureHttpOnlyCookie=value2; HttpOnly; Secure",
  ]);

  // Parse incoming cookies
  const cookies = {};
  if (req.headers.cookie) {
    req.headers.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = value;
    });
  }

  // Create cookie data array
  const cookieData = Object.entries(cookies).map(([name, value]) => ({
    name,
    value,
    httpOnly: name === "httpOnlyCookie" || name === "secureHttpOnlyCookie",
    secure: name === "secureHttpOnlyCookie",
  }));

  // Set response headers
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // Send JSON response
  res.end(
    JSON.stringify(
      {
        hostname: req.headers.host,
        path: req.url,
        cookies: cookieData,
      },
      null,
      2
    )
  );
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}/ and http://truls.localhost:${PORT}/`
  );
});
