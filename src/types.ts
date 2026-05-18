export type Tier = "free" | "premium";

export type ProjectMetadata = {
  projectName: string;
  clientName: string;
  clientId: string;
  projectDate: string;
  editorName: string;
};

export type FileSpec = {
  path: string;
  content: string;
};

export type TemplateSpec = {
  id: string;
  name: string;
  shortName: string;
  tier: Tier;
  category: string;
  description: string;
  idealFor: string;
  folders: string[];
  files: FileSpec[];
  includesNleFiles?: boolean;
};
