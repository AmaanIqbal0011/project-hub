"use server"
import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createProject = async (state: any, form: FormData, details: string) => {
  const session = await auth();
  if (!session) 
    return parseServerActionResponse({ error: "Unauthorized", status: 'Error' });

  const { title, description, category, vercelLink } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'details' && key !== 'image')
  );

  const imageFile = form.get('image') as File | null; // Get the uploaded file

  if (!imageFile) 
    return parseServerActionResponse({ error: "Image is required", status: 'Error' });

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // Upload image to Sanity
    const uploadedImage = await writeClient.assets.upload('image', imageFile, {
      filename: imageFile.name
    });

    const project = {
      title,
      description,
      vercelLink,
      category,
      image: uploadedImage._id ? { _type: 'image', asset: { _ref: uploadedImage._id } } : uploadedImage.url,
      slug: {
        _type: 'slug',
        current: slug
      },
      author: {
        _type: 'reference',
        _ref: session?.user?.id
      },
      details
    };

    const result = await writeClient.create({ _type: 'project', ...project });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "Success"
    });

  } catch (error) {
    console.log(error);
    return parseServerActionResponse({ error: JSON.stringify(error), status: 'Error' });
  }
};
