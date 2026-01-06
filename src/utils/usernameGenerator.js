export const generateUsername = (name, id) => {
  const kebabName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${kebabName}-${id}`;
};

export const getIdFromUsername = (username) => {
  const parts = username.split("-");
  return parts[parts.length - 1];
};
