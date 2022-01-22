import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import Header_Wed from './Header_Wed';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  let isLogged = false;
  let token = 1;

  // Si el usuario no está autenticado, deberán mostrarse links públicos y el de iniciar sesion
  const userNotLogged = [
    'Inicio',
    'Nosotros',
    'Contacto',
    'Actividades',
    'Campaña Escolar',
    'Campaña de Juguetes',
    'Iniciar sesión',
  ];

  test('Si el usuario no está autenticado, deberán mostrarse links públicos, iniciar sesion', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Header_Wed isLogged={isLogged} />
      </MemoryRouter>,
    );

    userNotLogged.forEach((link) => {
      waitFor(() => expect(getAllByText(link)).toBeInTheDocument());
    });
  });

  //Si el usuario está autenticado y no es administrador, se deberán ocultar los links de login y registro, mostrar los items de navegación
  const userRegularLogged = ['Donaciones', 'Cerrar sesión'];
  const iniciarSesion = 'Iniciar sesión';

  test('Si el usuario está autenticado y no es administrador, se deberán ocultar los links de login y registro, mostrar los items de navegación', () => {
    isLogged = true;
    token = 1;

    const { getAllByText, container } = render(
      <MemoryRouter>
        <Header_Wed isLogged={isLogged} token={token} />
      </MemoryRouter>,
    );

    userRegularLogged.forEach((link) => {
      waitFor(() => expect(getAllByText(link)).toBeInTheDocument());
    });

    expect(container).not.toHaveTextContent(iniciarSesion);
  });

  // Si el usuario está autenticado y es administrador, se deberán ocultar los links de Iniciar sesión y Donación. También mostrar el ítem de navegación "Backoffice" y el link de "Cerrar sesión"
  const userAdminLogged = ['Backoffice', 'Cerrar sesión'];
  const shouldNotBeShown = ['Iniciar sesión', 'Donacion'];

  test('Si el usuario está autenticado y es administrador, se deberán ocultar los links de Iniciar sesión y Donación. También mostrar el ítem de navegación "Backoffice" y el link de "Cerrar sesión"', () => {
    isLogged = true;
    token = 2;

    const { getAllByText, container } = render(
      <MemoryRouter>
        <Header_Wed isLogged={isLogged} token={token} />
      </MemoryRouter>,
    );

    userAdminLogged.forEach((link) => {
      waitFor(() => expect(getAllByText(link)).toBeInTheDocument());
    });
    shouldNotBeShown.forEach((link) => {
      expect(container).not.toHaveTextContent(link);
    });
  });
});
