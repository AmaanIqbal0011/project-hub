"use server"
import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
export const createProject = async(state : any, form: FormData, details : string) => {
    const session = await auth();
    if(!session) return parseServerActionResponse({
        error : "Unauthorized", status : 'Error'
    });

    const {title , description, category, link,vercelLink} = Object.fromEntries(
        Array.from(form).filter(([key])=> key !== 'details')
    );


    const slug  = slugify(title as string, {lower : true, strict : true});

    try {
        const project = {
            title,
            description,
            vercelLink,
            category,
            image : link,
            slug : {
                _type : slug,
                current : slug
            },
            author : {
                _type : 'reference',
                _ref : session?.user?.id
            },
            details
        };

        const result = await writeClient.create({_type : 'project', ...project});

        return parseServerActionResponse({
            ...result,
            error : "",
            status : "Success"
        });


    } catch (error) {
        console.log(error);
        return parseServerActionResponse({error : JSON.stringify(error), status :'Error'});
    }
}