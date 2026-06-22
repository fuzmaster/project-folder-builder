import { ProjectMetadata } from "@/types";

export type ValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof ProjectMetadata, string>>;
};

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

  return { valid: Object.keys(errors).length === 0, errors };
}
