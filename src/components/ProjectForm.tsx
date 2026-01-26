"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { formSchema } from '@/lib/validation'
import { createProject } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { z } from "zod";
import { toast } from "sonner"
import { Send } from 'lucide-react'

const ProjectForm = () => {
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
  title: formData.get("title") as string,
  description: formData.get("description") as string,
  category: formData.get("category") as string,
  link: formData.get("link") as string,
  vercelLink: formData.get("vercelLink") as string,
  details
};

      await formSchema.parseAsync(formValues);
      const result = await createProject(prevState, formData, details);

      if (result.status === 'Success') {
        toast("Success", {
          description: "🎉 Your project has been published successfully!"
        });
        router.push(`/project/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as any);
        toast("Error", {
          description: "❌ Please fill all fields correctly"
        });
        return { ...prevState, status: "Error" };
      }

      toast("Error", {
        description: "❌ Something went wrong!"
      });
      return { ...prevState, status: "Error" };
    }
  };

  const [state, formAction, isPending] =
    useActionState(handleFormSubmit, { error: "", status: "INITIAL" });

  return (
    <section className="mx-auto max-w-3xl px-4 pb-20">
      <form
        action={formAction}
        className="space-y-8 rounded-3xl border border-black/10 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-black"
      >

        {/* Title */}
        <div className="space-y-2">
          <label className="form-label">Project Title</label>
          <Input
            name="title"
            placeholder="Awesome Next.js App"
            className="form-input"
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="form-label">Short Description</label>
          <Textarea
            name="description"
            placeholder="Briefly describe your project"
            className="form-textarea"
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="form-label">Category</label>
          <Input
            name="category"
            placeholder="Next.js, AI, Blockchain"
            className="form-input"
          />
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="form-label">Thumbnail Image URL</label>
          <Input
            name="link"
            placeholder="https://image-url.com/project.png"
            className="form-input"
          />
          {errors.link && <p className="form-error">{errors.link}</p>}
        </div>
        <div className="space-y-2">
  <label className="form-label">Vercel Deployment Link (optional)</label>
  <Input
    name="vercelLink"
    placeholder="https://your-project.vercel.app"
    className="form-input"
  />
  {errors.vercelLink && (
    <p className="form-error">{errors.vercelLink}</p>
  )}
</div>

        {/* Markdown Editor */}
        <div className="space-y-2" data-color-mode="light">
          <label className="form-label">Project Details</label>
          <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
            <MDEditor
              value={details}
              onChange={(v) => setDetails(v as string)}
              height={300}
              preview="edit"
              textareaProps={{ placeholder: "Explain your project in detail…" }}
            />
          </div>
          {errors.details && <p className="form-error">{errors.details}</p>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl py-6 text-lg font-semibold bg-black text-white"
        >
          {isPending ? "Submitting..." : "Publish Project"}
          <Send className="ml-2 size-5" />
        </Button>
      </form>
    </section>
  );
};

export default ProjectForm;
