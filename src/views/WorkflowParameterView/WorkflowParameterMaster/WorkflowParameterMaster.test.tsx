import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import WorkflowParameterMaster from './WorkflowParameterMaster';

describe('WorkflowParameterMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <WorkflowParameterMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
