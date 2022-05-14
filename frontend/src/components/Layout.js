import Background from './Background';
import NameLogo from "./NameLogo";
import Logo from "./Logo";
import '../assets/layout.scss';

const Layout = (props) => {
  return (
      <>
        <Background zIndex={-2}/>
        <div className={'layout-container'}>
          <div className={'layout'}>
            <div className={'name-logo'}>
              <NameLogo/>
            </div>
            <div className={'logo'}>
              <Logo/>
            </div>
          </div>
          {props.children}
        </div>
      </>
  );
};

export default Layout;
