const baseUrl = "/api";

const apiService = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);
      return await response.json();
    } catch (error) {
      throw new Error("Network error");
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error("Network error");
    }
  },
};

export default apiService;
