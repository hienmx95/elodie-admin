import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchaseRequestPlanDetail from './PurchaseRequestPlanDetail';

describe('PurchaseRequestPlanDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchaseRequestPlanDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
