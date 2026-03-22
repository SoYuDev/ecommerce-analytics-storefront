// render allow us to bring the component to jsdom
// screen is an object which allow us to search for things inside that jsdom
import { render, screen } from '@testing-library/react';
import FlexibleImage from './FlexibleImage';

describe('Componente FlexibleImage', () => {
  test('Should show the skelleton loading initially', () => {
    // * 1. ARRANGE - Bring the component that we want to test.
    // render() returns an object witn multiple properties such as container(DOM node with html),
    // baseElement, debug(function to print HTML in the console) and a lot more
    render(
      <FlexibleImage
        src="/ruta-de-prueba.jpg"
        alt="Imagen de prueba"
        width={500}
        height={300}
      />
    );

    // * 2. ACT - Look for the element in the jsdom environment
    // we use screen functions to obtain the element that we want to test
    const skeleton = screen.getByTestId('image-skeleton');

    // * 3. ASSERT - Confirm that we have the expected result
    expect(skeleton).toBeInTheDocument();
  });
});
