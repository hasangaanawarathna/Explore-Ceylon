"use client";

import { createClient } from "@/lib/supabase/client";

export const IMAGE_BUCKET = "destination-images";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function validateImageFile(file: Pick<File, "type" | "size">) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return "Choose a JPG, PNG, or WebP image.";
  }
  if (file.size > MAX_IMAGE_BYTES) return "The image must be 5 MB or smaller.";
  if (file.size === 0) return "The selected image is empty.";
  return null;
}

export function storagePathFromPublicUrl(url: string) {
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  try {
    const parsed = new URL(url);
    const index = parsed.pathname.indexOf(marker);
    return index >= 0 ? decodeURIComponent(parsed.pathname.slice(index + marker.length)) : null;
  } catch {
    return null;
  }
}

export async function uploadCatalogImage(file: File, kind: "destinations" | "packages", slug: string) {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (!safeSlug) throw new Error("Add a valid record slug before uploading an image.");
  const path = `${kind}/${safeSlug}/${crypto.randomUUID()}.${extension}`;
  const supabase = createClient();
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, { cacheControl: "31536000", contentType: file.type, upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export async function deleteManagedImage(url: string) {
  const path = storagePathFromPublicUrl(url);
  if (!path) return;
  const { error } = await createClient().storage.from(IMAGE_BUCKET).remove([path]);
  if (error) throw error;
}
