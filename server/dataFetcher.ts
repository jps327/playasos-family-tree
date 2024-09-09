import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

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

type Graph = {
  members: CampMember[];
  edges: Array<{ source: string; target: string }>;
};

const GOOGLE_SHEET: { doc: GoogleSpreadsheet | undefined } = {
  doc: undefined,
};

export function connectToGoogleSheets(): void {
  // Initialize auth
  const serviceAccountAuth = new JWT({
    email: process.env.SERVICE_ACCOUNT_EMAIL,
    key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  //Initialize the google spreadsheet
  const doc = new GoogleSpreadsheet(
    '1YBjxIiaeMb_mResgxJaLyuM1ENZoywDuVrSpKWyz2gg',
    serviceAccountAuth,
  );

  GOOGLE_SHEET.doc = doc;
}

export async function getAllData(): Promise<Graph> {
  const { doc } = GOOGLE_SHEET;

  if (doc) {
    const members = [];
    const edges = [];

    //populate members/edges const
    await doc.loadInfo(); // loads document properties and worksheets
    const rows = await doc.sheetsByIndex[0].getRows();

    for (const row of rows) {
      //Add member
      const name = row.get('fullName');
      const referrer = row.get('referrer');
      const newMember: CampMember = {
        fullName: name,
        referrer: referrer,
        playaName: row.get('playaName'),
        firstCampBurnYear: row.get('firstCampBurnYear'),
        location: row.get('location'),
        bio: row.get('bio'),
        secondaryConnections: row.get('secondaryConnections'),
        numberOfBurnsWithCamp: row.get('numBurnsWithCamp'),
        numberOfBurnsTotal: row.get('totalBurns'),
        imgUrl: row.get('imageUrl'),
      };
      members.push(newMember);
      // only add edge if we have referrer data
      if (referrer !== '' && referrer !== null) {
        edges.push({ source: referrer, target: name });
      }
    }

    console.log(members.map((member) => member.fullName));

    return { members: members, edges: edges };
  }

  return { members: [], edges: [] };
}
