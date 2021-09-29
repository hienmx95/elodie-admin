import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import TradeConditionDetail from './TradeConditionDetail';

describe('TradeConditionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <TradeConditionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
