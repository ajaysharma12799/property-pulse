import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import cloudinary from "@/config/cloudinary";

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

/**
 * Request: POST
 * Path: /api/properties
 */
export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    // DB Connection
    await connectDB();

    const session = await getUserSession();

    if (!session || !session.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = session;

    const formData = await request.formData(); // If using Form-Data on frontend then use this format to access entire formData on Server

    // Access all values from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image: any) => image.name !== "");

    // Create Property Object
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // Upload Images to Cloudinary
    const imageUploadPromise = [];

    for (let image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageBuffer);

      // Convert Image Data to Base64
      const imageBase64 = imageData.toString("base64");

      // Upload Image to Cloudinary
      const results = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-pulse",
        }
      );

      imageUploadPromise.push(results.secure_url);

      // Wait for Images to Upload
      const uploadedImages = await Promise.all(imageUploadPromise);

      // Add Uploaded Images to Property Data
      propertyData.images = uploadedImages;
    }

    console.log("Data --> ", propertyData);

    // Save Property
    const property = await Property.create(propertyData);

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${property._id}`
    );
  } catch (error) {
    console.log("POST ERROR --> ", error);

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
