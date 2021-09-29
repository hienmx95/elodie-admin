import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import WorkflowDefinitionMaster from './WorkflowDefinitionMaster';

describe('WorkflowDefinitionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <WorkflowDefinitionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
