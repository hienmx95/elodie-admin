import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchaseOrderMaster from './PurchaseOrderMaster';

describe('PurchaseOrderMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchaseOrderMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
