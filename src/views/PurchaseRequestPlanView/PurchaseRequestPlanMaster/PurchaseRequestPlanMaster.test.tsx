import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchaseRequestPlanMaster from './PurchaseRequestPlanMaster';

describe('PurchaseRequestPlanMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchaseRequestPlanMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
