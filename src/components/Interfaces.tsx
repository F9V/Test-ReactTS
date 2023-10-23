import React from 'react';

export interface PageInfo {
    p_number: number;
    p_section: string;
    p_name: string;
    p_component: React.FC<{}>;
  }