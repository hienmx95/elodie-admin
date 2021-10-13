import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CustomerSalesOrderMaster from './CustomerSalesOrderMaster';

describe('CustomerSalesOrderMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <CustomerSalesOrderMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
