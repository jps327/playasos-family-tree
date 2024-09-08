import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Initialize auth 
const serviceAccountAuth = new JWT({
  email: "",
  key: "",
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

//Initialize the google spreadsheet
const doc = new GoogleSpreadsheet('1YBjxIiaeMb_mResgxJaLyuM1ENZoywDuVrSpKWyz2gg', serviceAccountAuth);

//Initialize CampMember Type
type CampMember = {
  fullName: string;
  referrer: string;
  playaName?: string;
  firstCampBurnYear?: number;
  location?: string;
  bio?: string;
  secondaryConnections?: string[];
  numberOfBurnsWithCamp?: number;
  numberOfBurnsTotal?: number;
  imgUrl?: string;
};
/*
var MEMBERS = [
  { fullName: 'Brandon Burr', referrer: 'FOUNDER_NO_REFER' },
  { fullName: 'Juan Pablo Sarmiento', referrer: 'Brandon Burr' },
  { fullName: 'Kristi Sun', referrer: 'Juan Pablo Sarmiento' },
];

var EDGES = [
  { source: 'Brandon Burr', target: 'Juan Pablo Sarmiento' },
  { source: 'Juan Pablo Sarmiento', target: 'Kristi Sun' },
]; */

type Graph = {
  members: CampMember[];
  edges: Array<{ source: string; target: string }>;
};

export async function getAllData(): Graph {
  var members = [];
  var edges = [];
  //populate members/edges const
  await doc.loadInfo(); // loads document properties and worksheets
  const rows = await doc.sheetsByIndex[0].getRows();
  for (const row of rows) {
    const newMember = {
      fullName: row.get('fullName'),
      referrer?: row.get('referrer'),
      playaName?: row.get('playaName'),
      firstCampBurnYear?: row.get('firstCampBurnYear'),
      location?: row.get('location'),
      bio?: row.get('bio'),
      secondaryConnections?: row.get('secondaryConnections'),
      numberOfBurnsWithCamp?: row.get('numberOfBurnsWithCamp'),
      numberOfBurnsTotal?: row.get('numberOfBurnsTotal'),
      imgUrl?: row.get('imgUrl'),
    };
    members.push[newMember];
  const referringEdge = {
      source: row.get(referrer),
      target: row.get('fullName')
    };
    edges.push[];
  }
  return { members: members, edges: edges};
}
