import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchaseOrderDetail from './PurchaseOrderDetail';

describe('PurchaseOrderDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchaseOrderDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
