import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PrincipalContractDetail from './PrincipalContractDetail';

describe('PrincipalContractDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PrincipalContractDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
