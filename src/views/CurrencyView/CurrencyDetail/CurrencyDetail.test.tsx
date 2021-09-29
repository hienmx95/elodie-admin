import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CurrencyDetail from './CurrencyDetail';

describe('CurrencyDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <CurrencyDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
