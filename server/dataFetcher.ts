type CampMember = {
  fullName: string;
  referrer: string;
  playaName?: string;
  firstBurnYear?: number;
  location?: string;
  bio?: string;
  secondaryConnections?: string[];
  numberOfBurnsWithCamp?: number;
  numberOfBurnsTotal?: number;
  imgUrl?: string;
};

const MEMBERS = [
  { fullName: 'Brandon Burr', referrer: 'FOUNDER_NO_REFER' },
  { fullName: 'Juan Pablo Sarmiento', referrer: 'Brandon Burr' },
  { fullName: 'Kristi Sun', referrer: 'Juan Pablo Sarmiento' },
];

const EDGES = [
  { source: 'Brandon Burr', target: 'Juan Pablo Sarmiento' },
  { source: 'Juan Pablo Sarmiento', target: 'Kristi Sun' },
];

type Graph = {
  members: CampMember[];
  edges: Array<{ source: string; target: string }>;
};

export function getAllData(): Graph {
  return { members: MEMBERS, edges: EDGES };
}
