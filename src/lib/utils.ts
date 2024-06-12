// Use on the frontend (React components) to get domain
export const getDomainFromWindow = () => {
  // First, check if this function is being called on the frontend. If so, get domain from windown
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return null;
};

export const getSubdomainFromWindow = () => {
  if (typeof window !== "undefined") return window.location.host.split(".")[0];

  return null;
};
