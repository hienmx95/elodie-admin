import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CurrencyMaster from './CurrencyMaster';

describe('CurrencyMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <CurrencyMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
