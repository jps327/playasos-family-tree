export type CampMember = {
  fullName: string;
  referrer?: string;
  playaName?: string;
  firstBurnYear?: number;
  location?: string;
  bio?: string;
  secondaryConnections?: string[];
  numberOfBurnsWithCamp?: number;
  numberOfBurnsTotal?: number;
};

export type CampGraph = {
  members: readonly CampMember[];
  edges: ReadonlyArray<{ source: string; target: string }>;
};
