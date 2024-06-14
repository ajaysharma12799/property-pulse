import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";

/**
 * Request: GET
 * Path: /api/properties
 */
export const GET = async (request: NextRequest) => {
  try {
    // DB Connection
    await connectDB();

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const pageLimit = searchParams.get("page_limit");
    const pageNumber = searchParams.get("page_number");

    const PAGE_LIMIT = parseInt(pageLimit) || 10;
    const PAGE_NUMBER = parseInt(pageNumber) || 1;

    // Get all Properties
    const properties = await Property.find({})
      .limit(PAGE_LIMIT)
      .sort({ createdAt: -1 });

    return Response.json(
      {
        status: true,
        data: properties,
        length: properties.length,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        status: false,
        error: "Something Went Wrong",
      },
      {
        status: 500,
      }
    );
  }
};
