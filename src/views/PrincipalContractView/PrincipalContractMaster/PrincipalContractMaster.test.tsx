import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PrincipalContractMaster from './PrincipalContractMaster';

describe('PrincipalContractMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PrincipalContractMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
