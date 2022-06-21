const generator = (length: number) => {
  return [...new Array(length)].map((_, index) => ({
    id: index + 1,
    label: `Item №${index + 1}`,
  }));
};

export default generator;