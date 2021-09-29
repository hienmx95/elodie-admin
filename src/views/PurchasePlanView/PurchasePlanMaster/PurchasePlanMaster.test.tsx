import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchasePlanMaster from './PurchasePlanMaster';

describe('PurchasePlanMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchasePlanMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
