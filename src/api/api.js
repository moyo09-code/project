export async function getProperties() {
  try {
    const res = await fetch("/data/properties.json");
    if (!res.ok) throw new Error("Failed to fetch properties");
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("API Error:", error);
    return { status: "error", data: [] };
  }
}

export async function getPropertyById(id) {
  try {
    const res = await fetch("/data/properties.json");
    if (!res.ok) throw new Error("Failed to fetch properties");
    const json = await res.json();
    const property = json.data.find((p) => p.id === id);
    if (!property) throw new Error("Property not found");
    return property;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}
