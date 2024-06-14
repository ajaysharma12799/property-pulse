import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";

/**
 * Request: GET
 * Path: /api/properties/:id
 */
export const GET = async (request: NextRequest, { params }: any) => {
  try {
    // DB Connection
    await connectDB();

    console.log("IDK Params --> ", params);

    const id = params.id;

    // Get all Properties
    const property = await Property.findById(id);

    console.log("Property Backend --> ", property);

    return Response.json(
      {
        status: true,
        data: property,
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
