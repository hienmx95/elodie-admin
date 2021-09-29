import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CriterionMaster from './CriterionMaster';

describe('CriterionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <CriterionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
