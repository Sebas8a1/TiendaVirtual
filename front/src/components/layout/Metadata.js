import React from 'react';
import { Helmet } from 'react-helmet';

export const Metadata = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title}-SuperMasters`}</title>
    </Helmet>
  );
}
export default Metadata