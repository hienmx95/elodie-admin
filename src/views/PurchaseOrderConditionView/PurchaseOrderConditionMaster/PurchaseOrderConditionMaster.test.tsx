import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchaseOrderConditionMaster from './PurchaseOrderConditionMaster';

describe('PurchaseOrderConditionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchaseOrderConditionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
