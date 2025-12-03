export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, () => {
    const random = Math.floor(Math.random() * 16);
    return random.toString(16);
  });
};
