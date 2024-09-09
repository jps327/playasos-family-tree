import * as React from 'react';
import { CampMember } from '../../util/types';
import { Text, Card, Stack, Group, Title, Divider } from '@mantine/core';

type Props = {
  member: CampMember;
};

const FOUNDER_VALUE = 'FOUNDER';

const CARD_METADATA: ReadonlyArray<{ key: keyof CampMember; label: string }> = [
  { key: 'playaName', label: 'Playa Name' },
  { key: 'location', label: 'Location' },
  { key: 'referrer', label: 'Brought into the camp by' },
  { key: 'firstBurnYear', label: 'Year they first burned with Playasos' },
  { key: 'secondaryConnections', label: 'Other connections' },
  { key: 'numberOfBurnsWithCamp', label: 'Number of burns with camp' },
  { key: 'numberOfBurnsTotal', label: 'Number of burns' },
];

function renderMemberValue(
  value: string | string[] | number | undefined,
): string {
  if (value === undefined || value === '') {
    return 'n/a';
  }

  if (typeof value === 'string') {
    if (value === FOUNDER_VALUE) {
      return 'No one! Snail OG Camp Founder';
    }
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return 'Data type not supported';
}

export function MemberProfile({ member }: Props): JSX.Element {
  return (
    <div className="space-y-2">
      <Title order={2}>{member.fullName}</Title>

      {member.bio ? (
        <Card shadow="sm" padding="lg" radius="md">
          <Text>{member.bio}</Text>
        </Card>
      ) : null}

      <Card padding="lg" radius="md">
        <Stack>
          {CARD_METADATA.map(({ key, label }) => (
            <React.Fragment key={key}>
              <Group>
                <Text className="font-bold">{label}:</Text>
                <Text>{renderMemberValue(member[key])}</Text>
              </Group>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
      </Card>
    </div>
  );
}
