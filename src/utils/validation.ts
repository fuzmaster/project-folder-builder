import { ProjectMetadata } from "@/types";

export type ValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof ProjectMetadata, string>>;
};

const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;

export function validateMetadata(metadata: ProjectMetadata): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!metadata.projectName.trim()) {
    errors.projectName = "Project name is required.";
  }

  if (!metadata.clientName.trim()) {
    errors.clientName = "Client name is required.";
  }

  if (!metadata.projectDate.trim()) {
    errors.projectDate = "Project date is required.";
  } else if (Number.isNaN(new Date(metadata.projectDate + "T00:00:00").getTime())) {
    errors.projectDate = "Use a valid project date.";
  }

  for (const key of ["projectName", "clientName", "clientId", "editorName"] as const) {
    if (metadata[key] && invalidChars.test(metadata[key])) {
      errors[key] = "Invalid file-name characters will be cleaned automatically.";
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
