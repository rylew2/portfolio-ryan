import FontFaceObserver from 'fontfaceobserver';

//load fonts after page is loaded (load client side)
const Fonts = () => {
  const montserrat = new FontFaceObserver('Montserrat');

  montserrat.load().then(() => {
    document.documentElement.classList.add('montserrat-loaded');
  });
}

export default Fonts;
