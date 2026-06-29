'use client';

import React, { useState } from 'react';
import FinancingSACCalculator from '@/components/calculators/financing-sac';
import FinancingPriceCalculator from '@/components/calculators/financing-price';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FinancingCalculator() {
  return (
    <div className="w-full">
      <Tabs defaultValue="sac" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
          <TabsTrigger value="sac">Sistema SAC</TabsTrigger>
          <TabsTrigger value="price">Tabela PRICE</TabsTrigger>
        </TabsList>
        <TabsContent value="sac" className="mt-0">
          <FinancingSACCalculator />
        </TabsContent>
        <TabsContent value="price" className="mt-0">
          <FinancingPriceCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
