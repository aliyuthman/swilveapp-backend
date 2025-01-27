// src/identity/identity.service.ts
import { Injectable } from '@nestjs/common';
import { FlutterwaveService } from '../flutterwave/flutterwave.service';

@Injectable()
export class IdentityService {
  constructor(private flw: FlutterwaveService) {}
  
  async verifyBVN(bvn: string) {
    const response = await this.flw.Misc.verify_bvn({ bvn });
    
    if (response.status !== 'success') {
      throw new Error('BVN verification failed');
    }
    
    return response.data;
  }
}