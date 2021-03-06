import '../assets/input-modal.scss';
import {useEffect, useRef} from 'react';
import {Slide} from "react-awesome-reveal";

const InputModal = (props) => {
  const ref = useRef(null);
  const onClickOutside = props['onClickOutside'];
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!props.show) {
    return null
  }

  return (
      <>
        <div ref={ref}>
          <Slide duration={500}
                 direction={screenWidth >= 1024 ? 'down' : 'up'}>
            <div className={'modal-background'}
                 style={{
                   backgroundColor: props.color,
                   height: props.height
                 }}>
              <div className={'modal-items'}>
                {props.children}
              </div>
            </div>
          </Slide>
        </div>
      </>
  );
};

export default InputModal;
