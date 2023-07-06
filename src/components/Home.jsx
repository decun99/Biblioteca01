import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://w0.peakpx.com/wallpaper/526/8/HD-wallpaper-man-made-library-bookshelf-book.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Sean bienvenidos a LECTURE LOCKER</h1>
            <p>El repositorio de telemática por excelencia!!!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://png.pngtree.com/thumb_back/fh260/background/20230526/pngtree-an-old-bookcase-in-a-library-image_2642908.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h1>Siéntete invitado a revisar material sobre todos tus ramos de carrera!</h1>
            <p>Estudia, navega, custimoza y disfruta de una experiencia de estudio pesonalizada.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1082069478/es/foto/estantes-en-la-biblioteca-con-libros-viejos-3d-render.jpg?s=170667a&w=0&k=20&c=idYRmYVmv-rHq8W5BFuJaB2AK_v37WvblUYRvioDxXM="
            alt="Third slide"
          />

          <Carousel.Caption>
            <h1>Inicia sesión para construir tu propio semestre!!</h1>
            <p>Más y mejores funcionalidades en camino...</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;