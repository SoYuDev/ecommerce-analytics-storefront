// render allow us to bring the component to jsdom
// screen is an object which allow us to search for things inside that jsdom
import { render, screen } from '@testing-library/react';
// fireEvent allow us to fire events manually such as clicks, user writting or load events
import { fireEvent } from '@testing-library/react';
import FlexibleImage from './FlexibleImage';

// Mock for the Image component in Next.js
// When the component tries to use next/image change it for a img tag
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, sizes, ...rest }: any) => {
    // Al desestructurar aquí, 'rest' queda limpio de esas props de Next.js
    return <img {...rest} />;
  },
}));

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

  // In this second test we show another way to obtain the element without a testid
  test('Should hide the skelleton and show the Image when the load event is completed', () => {
    // * 1. ARRANGE
    // render() returns an object witn multiple properties such as container(DOM node with html),
    // baseElement, debug(function to print HTML in the console) and a lot more
    const { container } = render(
      <FlexibleImage
        src="/ruta.jpg"
        alt="Imagen de prueba"
        width={500}
        height={300}
      />
    );

    // Get the image using the 'alt' property that we defined above
    const imagen = screen.getByAltText('Imagen de prueba');

    // Check if image has 0 opacity
    expect(imagen).toHaveClass('opacity-0');

    // * 2. ACT
    // Executes the onLoad={() => setIsLoading(false)} function inside our component
    fireEvent.load(imagen);

    // Look for the skeleton AFTER the image is loaded
    const skeleton = container.querySelector('.animate-pulse');

    // * 3. ASSERT
    // skeleton should not be in the document after the image is loaded
    expect(skeleton).not.toBeInTheDocument();

    // The image should have opacity-100 class and should not have opacity-0 class
    expect(imagen).toHaveClass('opacity-100');
    expect(imagen).not.toHaveClass('opacity-0');
  });

  test('Should render correctly with the fill property and handle load event', () => {
    // * 1. ARRANGE
    // Whenever we used fill property, defining height and width is no longer necessary
    render(
      <FlexibleImage src="/ruta-fill.jpg" alt="Imagen con fill" fill={true} />
    );

    const imagen = screen.getByAltText('Imagen con fill');

    // Check if the skelleton exists initially
    expect(screen.getByTestId('image-skeleton')).toBeInTheDocument();

    // * 2. ACT - Trigger onLoad() event
    fireEvent.load(imagen);

    // * 3. ASSERT
    expect(screen.queryByTestId('image-skeleton')).not.toBeInTheDocument();

    // Verify that the image is visible
    expect(imagen).toHaveClass('opacity-100');
  });
});
