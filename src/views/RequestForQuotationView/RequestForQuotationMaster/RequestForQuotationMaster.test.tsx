import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import RequestForQuotationMaster from './RequestForQuotationMaster';

describe('RequestForQuotationMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <RequestForQuotationMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
