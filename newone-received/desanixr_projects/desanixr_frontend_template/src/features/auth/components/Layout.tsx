import * as React from 'react';

import logo from '@/assets/EoE.png';
import { DxrLink } from '@/components/Elements';
import { Head } from '@/components/Head';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mainlayout-content-body">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <DxrLink className="flex items-center text-white" to="/">
              <img className="h-24 w-auto" src={logo} alt="Workflow" />
            </DxrLink>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold">{title}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 drawer-background-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
