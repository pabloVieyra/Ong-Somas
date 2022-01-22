import { Route, useRouteMatch } from 'react-router-dom';
import ActivitiesForm from '../Components/Activities/ActivitiesForm';
import CategoriesForm from '../Components/Categories/CategoriesForm';
import SlidesForm from '../Components/Slides/SlidesForm';
import TestimonialForm from '../Components/Testimonials/TestimonialsForm';
import UserForm from '../Components/Users/UsersForm';
import UsersListTable from '../Components/Users/UsersListTable';
import BackofficeListActivities from '../Components/Activities/BackofficeListActivities';
import NewsCreateEdit from '../Components/News/NewsCreateEdit';
import MembersCreateEdit from '../Components/Members/MembersCreateEdit';
import ScreenMembersList from '../Components/Members/ScreenMembersList';
import BackofficeDashboard from '../Components/Backoffice/BackofficeDashboard';
import SlidesBackOffice from '../Components/Slides/SlidesBackOffice';
import ScreenOrganization from '../Components/Organization/ScreenOrganization';
import ScreenOrganizationEditForm from '../Components/Organization/ScreenOrganizationEditForm';
import Backoffice_ListCategories from '../Components/Categories/Backoffice_ListCategories';
import News from '../Components/News/News';
import BackofficeLayout from '../Components/Layouts/BackofficeLayout';
import TestimonialsListScreen from '../Components/Testimonials/TestimonialsListScreen';
import Error404 from '../Components/Error404/Error404';
import PrivateRoute from './PrivateRoutes/PrivateRoute';

const BackofficeRouter = () => {
  let { path } = useRouteMatch();

  return (
    <BackofficeLayout>
      <PrivateRoute exact component={BackofficeDashboard} path={`${path}`} />

      <PrivateRoute
        path={`${path}/activities/edit/:id`}
        render={() => <ActivitiesForm />}
      />
      <PrivateRoute
        component={ActivitiesForm}
        path={`${path}/activities/create`}
      />
      <PrivateRoute
        component={BackofficeListActivities}
        path={`${path}/activities`}
      />

      <PrivateRoute
        path={`${path}/categories/edit/:id`}
        render={() => <CategoriesForm />}
      />
      <PrivateRoute
        component={CategoriesForm}
        path={`${path}/categories/create`}
      />
      <PrivateRoute
        component={Backoffice_ListCategories}
        path={`${path}/categories`}
      />

      <PrivateRoute
        component={MembersCreateEdit}
        path={`${path}/members/edit/:id`}
      />
      <PrivateRoute
        component={MembersCreateEdit}
        path={`${path}/members/create`}
      />
      <PrivateRoute
        exact
        component={ScreenMembersList}
        path={`${path}/members`}
      />

      <PrivateRoute component={NewsCreateEdit} path={`${path}/news/edit/:id`} />
      <PrivateRoute component={NewsCreateEdit} path={`${path}/news/create`} />
      <PrivateRoute component={News} path={`${path}/news`} />

      <PrivateRoute
        component={ScreenOrganizationEditForm}
        path={`${path}/organization/edit`}
      />
      <PrivateRoute
        component={ScreenOrganization}
        path={`${path}/organization`}
      />

      <PrivateRoute
        exact
        component={SlidesForm}
        path={`${path}/slides/edit/:id`}
      />
      <PrivateRoute
        exact
        component={SlidesForm}
        path={`${path}/slides/create`}
      />
      <PrivateRoute component={SlidesBackOffice} path={`${path}/slides`} />

      <PrivateRoute
        component={TestimonialForm}
        path={`${path}/testimonials/edit/:id`}
      />
      <PrivateRoute
        component={TestimonialForm}
        path={`${path}/testimonials/create`}
      />
      <PrivateRoute
        component={TestimonialsListScreen}
        path={`${path}/testimonials`}
      />

      <PrivateRoute component={UserForm} path={`${path}/users/edit/:id`} />
      <PrivateRoute component={UserForm} path={`${path}/users/create`} />
      <PrivateRoute component={UsersListTable} path={`${path}/users`} />

      <PrivateRoute component={Error404} path="*" />
    </BackofficeLayout>
  );
};

export default BackofficeRouter;
