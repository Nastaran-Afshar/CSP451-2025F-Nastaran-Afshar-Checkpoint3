const { add } = require("../src/math.js");

test("math works", () => {
  expect(add(2, 3)).toBe(5);
});