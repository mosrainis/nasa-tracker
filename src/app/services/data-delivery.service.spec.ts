import { TestBed } from '@angular/core/testing';

import { DataDeliveryService } from './data-delivery.service';

describe('DataDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataDeliveryService = TestBed.get(DataDeliveryService);
    expect(service).toBeTruthy();
  });
});
