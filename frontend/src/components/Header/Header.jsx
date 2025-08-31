import logo from '../../images/logo.png';
import menuIcon from '../../images/menu.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Header() {
  const {
    currentUser,
    setCurrentUser,
    setIsLoggedIn,
  } = useContext(CurrentUserContext);

  const [action, setAction] = useState('');
  const [menu, setMenu] = useState(false);
  const [menuWasOpened, setMenuWasOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/signin') setAction('Register');
    else if (location.pathname === '/signup') setAction('Log In');
    else setAction('Log Out');
  }, [location]);

  const handleAction = () => {
    if (action === 'Log Out') {
      localStorage.removeItem('jwt');
      setCurrentUser({});
      setMenu(false);
      setIsLoggedIn(false);
      navigate('/signin');
    }
    if (action === 'Register') navigate('/signup');
    if (action === 'Log In') navigate('/signin');
  };

  const handleMenuClick = () => {
    setMenuWasOpened(true);
    setMenu(!menu);
  };

  return (
    <>
      {currentUser.email && menuWasOpened && (
        <div
          className={`header__menu_adaptable ${
            menu ? 'header__menu_active' : 'header__menu_inactive'
          }`}
        >
          <span className="header__user">{currentUser.email}</span>
          <span className="header__action" onClick={handleAction}>
            {action}
          </span>
        </div>
      )}
      <header className="header">
        <div className="header__content">
          <img src={logo} alt="Around the U.S logo" className="header__logo" />
          {currentUser.email ? (
            <>
              <div className="header__menu header__menu_invisible">
                <span className="header__user">{currentUser.email}</span>
                <span className="header__action" onClick={handleAction}>
                  {action}
                </span>
              </div>
              <img
                className="header__menu-icon"
                src={menuIcon}
                alt="Menu"
                onClick={handleMenuClick}
                style={{ cursor: 'pointer' }}
              />
            </>
          ) : (
            <div className="header__menu">
              <span className="header__action" onClick={handleAction}>
                {action}
              </span>
            </div>
          )}
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
}