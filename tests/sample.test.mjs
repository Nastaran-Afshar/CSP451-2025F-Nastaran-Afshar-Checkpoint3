function add(a, b) {
  return a + b;
}

test('math works', () => {
  expect(add(2, 3)).toBe(5);
});
