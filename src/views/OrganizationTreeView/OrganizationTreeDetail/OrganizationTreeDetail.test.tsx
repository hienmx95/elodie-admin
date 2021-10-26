import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import OrganizationTreeDetail from './OrganizationTreeDetail';

describe('OrganizationTreeDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <OrganizationTreeDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
