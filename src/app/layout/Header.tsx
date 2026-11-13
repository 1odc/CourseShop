import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/features/auth";
import { usePurchases } from "@/features/purchases";

export default function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: purchases = [] } = usePurchases(user?.id);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          CourseShop
        </Link>

        <nav className="header__nav">
          <NavLink to="/" className="header__link">
            Курси
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className="header__link">
              Додати курс
            </NavLink>
          )}
        </nav>

        <div className="header__right">
          {user ? (
            <>
              <Link to="/profile" className="header__profile">
                <div className="header__avatar">{user.name[0]}</div>
                <span className="header__username">{user.name}</span>
                {user.role === "student" && (
                  <span className="header__count">{purchases.length}</span>
                )}
              </Link>
              <button className="header__logout" onClick={handleLogout}>
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__link">
                Увійти
              </Link>
              <Link to="/register" className="header__link">
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}