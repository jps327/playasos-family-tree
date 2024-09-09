import cytoscape from 'cytoscape';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CampGraph, CampMember } from './util/types';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MemberProfile } from './components/MemberProfile';
import { GraphLayout } from './components/GraphLayout';

function useData() {
  return useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: CampGraph = await response.json();
      console.log('backend data', data);
      return data;
    },
  });
}

export function App(): JSX.Element {
  const { data: campGraph } = useData();
  const [isDrawerOpened, drawerActions] = useDisclosure(false);
  const [selectedCampMember, setSelectedCampMember] = React.useState<
    CampMember | undefined
  >();

  const onCampMemberSelect = React.useCallback(
    (campMember: CampMember) => {
      setSelectedCampMember(campMember);
      drawerActions.open();
    },
    [drawerActions],
  );

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      {campGraph ? (
        <GraphLayout
          campGraph={campGraph}
          onCampMemberSelect={onCampMemberSelect}
        />
      ) : null}
      <Drawer
        opened={isDrawerOpened}
        onClose={drawerActions.close}
        trapFocus={false}
        closeOnClickOutside={false}
        withOverlay={false}
        position="right"
      >
        {selectedCampMember ? (
          <MemberProfile member={selectedCampMember} />
        ) : null}
      </Drawer>
    </div>
  );
}
