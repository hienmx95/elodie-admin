import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import WorkflowDefinitionDetail from './WorkflowDefinitionDetail';

describe('WorkflowDefinitionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <WorkflowDefinitionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
