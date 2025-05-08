const { test, expect } = require("@playwright/test");

test("cookies are set and persisted on localhost", async ({ page }) => {
  // First request - should set cookies
  const response = await page.goto("http://localhost:3000");
  const data = await response.json();

  // Verify response data
  expect(data.hostname).toBe("localhost:3000");
  expect(data.path).toBe("/");
  expect(data.cookies).toEqual([]); // No cookies on first request

  // Get cookies after first request
  const cookies = await page.context().cookies();
  const cookieNames = cookies.map((cookie) => cookie.name);

  // Verify both cookies are set
  expect(cookieNames).toContain("httpOnlyCookie");
  expect(cookieNames).toContain("secureHttpOnlyCookie");

  // Verify cookie attributes
  const httpOnlyCookie = cookies.find((c) => c.name === "httpOnlyCookie");
  const secureHttpOnlyCookie = cookies.find(
    (c) => c.name === "secureHttpOnlyCookie"
  );

  expect(httpOnlyCookie.httpOnly).toBe(true);
  expect(secureHttpOnlyCookie.httpOnly).toBe(true);
  expect(secureHttpOnlyCookie.secure).toBe(true);

  // Second request - cookies should be sent
  const secondResponse = await page.goto("http://localhost:3000");
  const secondData = await secondResponse.json();

  // Verify response data
  expect(secondData.hostname).toBe("localhost:3000");
  expect(secondData.path).toBe("/");
  expect(secondData.cookies).toHaveLength(2);
  expect(secondData.cookies).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "httpOnlyCookie",
        value: "value1",
        httpOnly: true,
        secure: false,
      }),
      expect.objectContaining({
        name: "secureHttpOnlyCookie",
        value: "value2",
        httpOnly: true,
        secure: true,
      }),
    ])
  );
});

test("cookies are set and persisted on subdomain.localhost", async ({
  page,
}) => {
  // First request - should set cookies
  const response = await page.goto("http://subdomain.localhost:3000");
  const data = await response.json();

  // Verify response data
  expect(data.hostname).toBe("subdomain.localhost:3000");
  expect(data.path).toBe("/");
  expect(data.cookies).toEqual([]); // No cookies on first request

  // Get cookies after first request
  const cookies = await page.context().cookies();
  const cookieNames = cookies.map((cookie) => cookie.name);

  // Verify both cookies are set
  expect(cookieNames).toContain("httpOnlyCookie");
  expect(cookieNames).toContain("secureHttpOnlyCookie");

  // Verify cookie attributes
  const httpOnlyCookie = cookies.find((c) => c.name === "httpOnlyCookie");
  const secureHttpOnlyCookie = cookies.find(
    (c) => c.name === "secureHttpOnlyCookie"
  );

  expect(httpOnlyCookie.httpOnly).toBe(true);
  expect(secureHttpOnlyCookie.httpOnly).toBe(true);
  expect(secureHttpOnlyCookie.secure).toBe(true);

  // Second request - cookies should be sent
  const secondResponse = await page.goto("http://subdomain.localhost:3000");
  const secondData = await secondResponse.json();

  // Verify response data
  expect(secondData.hostname).toBe("subdomain.localhost:3000");
  expect(secondData.path).toBe("/");
  expect(secondData.cookies).toHaveLength(2);
  expect(secondData.cookies).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "httpOnlyCookie",
        value: "value1",
        httpOnly: true,
        secure: false,
      }),
      expect.objectContaining({
        name: "secureHttpOnlyCookie",
        value: "value2",
        httpOnly: true,
        secure: true,
      }),
    ])
  );
});

test("cookies are set and persisted on localhost using request API", async ({
  request,
}) => {
  // First request - should set cookies
  const response = await request.get("http://localhost:3000");
  const data = await response.json();

  // Verify response data
  expect(data.hostname).toBe("localhost:3000");
  expect(data.path).toBe("/");
  expect(data.cookies).toEqual([]); // No cookies on first request

  // Second request - cookies should be sent
  const secondResponse = await request.get("http://localhost:3000");
  const secondData = await secondResponse.json();

  // Verify response data
  expect(secondData.hostname).toBe("localhost:3000");
  expect(secondData.path).toBe("/");
  expect(secondData.cookies).toHaveLength(2);
  expect(secondData.cookies).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "httpOnlyCookie",
        value: "value1",
        httpOnly: true,
        secure: false,
      }),
      expect.objectContaining({
        name: "secureHttpOnlyCookie",
        value: "value2",
        httpOnly: true,
        secure: true,
      }),
    ])
  );
});

test("cookies are set and persisted on subdomain.localhost using request API", async ({
  request,
}) => {
  // First request - should set cookies
  const response = await request.get("http://subdomain.localhost:3000");
  const data = await response.json();

  // Verify response data
  expect(data.hostname).toBe("subdomain.localhost:3000");
  expect(data.path).toBe("/");
  expect(data.cookies).toEqual([]); // No cookies on first request

  const secondResponse = await request.get("http://subdomain.localhost:3000");
  const secondData = await secondResponse.json();

  // Verify response data
  expect(secondData.hostname).toBe("subdomain.localhost:3000");
  expect(secondData.path).toBe("/");
  expect(secondData.cookies).toHaveLength(2);
  expect(secondData.cookies).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "httpOnlyCookie",
        value: "value1",
        httpOnly: true,
        secure: false,
      }),
      expect.objectContaining({
        name: "secureHttpOnlyCookie",
        value: "value2",
        httpOnly: true,
        secure: true,
      }),
    ])
  );
});
