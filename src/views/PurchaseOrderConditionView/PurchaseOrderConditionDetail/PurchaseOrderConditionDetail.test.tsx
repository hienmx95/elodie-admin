import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchaseOrderConditionDetail from './PurchaseOrderConditionDetail';

describe('PurchaseOrderConditionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchaseOrderConditionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
