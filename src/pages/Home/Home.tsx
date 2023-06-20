import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'config/strings';
import { PagePaper } from 'components/PagePaper';

export function Home(): JSX.Element {
  return (
    <Fragment>
      <Helmet>
        <title>{APP_NAME}</title>
      </Helmet>

      <Fragment>
        <PagePaper centered flexible role="main">
          Hello world
        </PagePaper>
      </Fragment>
    </Fragment>
  );
}
