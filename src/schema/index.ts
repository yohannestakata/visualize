import * as z from "zod";

export const RegisterSchema = z.object({
  nickname: z.string().min(1, { message: "Please pick a nickname" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password needs to be atleast 8 characters" }),
  uniId: z.string().min(1, { message: "Please enter a valid University ID" }),
  department: z.string().min(1, { message: "Please select a department" }),
});

export const LoginSchema = z.object({
  uniId: z.string().min(1, { message: "Please enter a valid University ID" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

const ALLOWED_3D_EXTENSIONS = [".obj", ".stl", ".gltf", ".glb"];
const ALLOWED_MIME_TYPES = {
  ".pdf": "application/pdf",
  // Add mime types for 3D formats (optional, can be redundant)
};
const MAX_FILE_SIZE = 5;

export const UploadModelSchema = z.object({
  modelTitle: z
    .string({ required_error: "Please enter a model title" })
    .min(1, { message: "Please enter a title for the model" }),
  department: z.string({ required_error: "Please select a department" }),
  course: z.string({ required_error: "Please select a course" }),
  thumbnail: z
    .instanceof(File, { message: "Please select a file" })
    .refine((file) => file.size < 7 * 1000000, {
      message: "Thumbnail must be less than 7MB.",
    })
    .refine((file) => validateImageFileType(file), {
      message: "Invalid image format. Supported formats: jpeg, png, jpeg",
    }),
  model: z
    .instanceof(File)
    .refine((file) => file.size <= 20 * 1000000, {
      message: "The model must be less than 20MB.",
    })
    .refine((file) => validateModelFileType(file), {
      message: "Invalid 3D file format. Supported formats: glTF, glb, OBJ, fbx",
    }),
});

const validateModelFileType = (file: File) => {
  const allowedMimeTypes = ["obj", "gltf", "glb", "fbx"];
  return allowedMimeTypes.includes(file.name.split(".").at(-1));
};

const validateImageFileType = (file: File) => {
  const allowedMimeTypes = ["jpg", "png", "jpeg", "webp"];
  return allowedMimeTypes.includes(file.name.split(".").at(-1));
};
