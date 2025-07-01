import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | DesaniXR-Admin React` : undefined}
      defaultTitle="DesaniXR-Admin React"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
