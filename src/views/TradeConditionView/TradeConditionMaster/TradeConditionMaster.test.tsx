import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import TradeConditionMaster from './TradeConditionMaster';

describe('TradeConditionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <TradeConditionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
