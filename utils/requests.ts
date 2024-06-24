type FetchProperties = {
  page_limit: number;
  page_number: number;
};

type FetchPropertyById = {
  id: string;
};

async function fetchProperties({ page_limit }: FetchProperties) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties?page_limit=${page_limit}`,
      {
        cache: "no-store",
      }
    );
    const properties = await response.json();

    if (!response.ok) {
      throw new Error("Failed to Fetch Data");
    }
    return properties;
  } catch (error) {
    console.log("Fetch Properties Error --> ", error);
  }
}

async function fetchPropertyById({ id }: FetchPropertyById) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`
    );
    const property = await response.json();

    if (!response.ok) {
      throw new Error("Failed to Fetch Data");
    }
    return property;
  } catch (error) {
    console.log("Fetch Property By ID Error --> ", error);
  }
}

export { fetchProperties, fetchPropertyById };
