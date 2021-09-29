import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchasePlanCriterionScoreMaster from './PurchasePlanCriterionScoreMaster';

describe('PurchasePlanCriterionScoreMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchasePlanCriterionScoreMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
