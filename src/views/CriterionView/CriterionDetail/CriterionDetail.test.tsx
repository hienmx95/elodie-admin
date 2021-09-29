import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CriterionDetail from './CriterionDetail';

describe('CriterionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <CriterionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
