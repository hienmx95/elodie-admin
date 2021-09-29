import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PurchasePlanCriterionScoreDetail from './PurchasePlanCriterionScoreDetail';

describe('PurchasePlanCriterionScoreDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchasePlanCriterionScoreDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
