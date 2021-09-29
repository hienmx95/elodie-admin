import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import RequestForQuotationDetail from './RequestForQuotationDetail';

describe('RequestForQuotationDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <RequestForQuotationDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
