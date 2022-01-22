import React, { Suspense, lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import LoaderSpinner from '../Components/CommonComponents/LoaderSpinner';
const FormContact = lazy(() => import('../Components/Contact/FormContact'));
const Seccion_Novedades = lazy(() =>
  import('../Components/News/Seccion_Novedades'),
);
const Activities = lazy(() => import('../Components/Activities/Activities'));
const Contact = lazy(() => import('../Components/Contact/Contact'));
const NewsDetail = lazy(() => import('../Components/News/Detail/NewsDetail'));
const ActivityDetail = lazy(() =>
  import('../Components/Activities/Detail/ActivityDetail'),
);
const About = lazy(() => import('../Components/About/About'));
const Donations = lazy(() => import('../Components/Donations/Donations'));
const Thanks = lazy(() => import('../Components/Donations/Thanks'));
const Error404 = lazy(() => import('../Components/Error404/Error404'));
const HomeScreen = lazy(() => import('../Components/Home'));
const PublicLayout = lazy(() => import('../Components/Layouts/PublicLayout'));

const PublicRouter = () => {
  let { path } = useRouteMatch();

  return (
    <Suspense fallback={<LoaderSpinner full />}>
      <PublicLayout>
        <Switch>
          <Route exact component={HomeScreen} path={`${path}`} />
          <Route
            path={`${path}news/:id`}
            render={() => <NewsDetail newsTitle="Titulo de la noticia" />}
          />
          <Route component={ActivityDetail} path={`${path}activities/:id`} />
          <Route component={About} path={`${path}aboutus`} />
          <Route component={Contact} path={`${path}contact`} />
          <Route component={FormContact} path={`${path}form-contact`} />
          <Route component={Seccion_Novedades} path={`${path}news`} />
          <Route component={Activities} path={`${path}activities`} />
          <Route
            path={`${path}donations`}
            render={() => (
              <Donations
                donationsSubtitle="¡Ayúdanos a crecer!"
                donationsTitle="Donaciones"
              />
            )}
          />
          <Route component={Thanks} path={`${path}thanks`} />
          <Route component={Error404} path="*" />
        </Switch>
      </PublicLayout>
    </Suspense>
  );
};

export default PublicRouter;
